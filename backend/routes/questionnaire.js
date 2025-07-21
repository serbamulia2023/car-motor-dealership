// ------------------ IMPORTS ------------------
const path = require('path');
const fs = require('fs');
const multer = require('multer');

module.exports = (app, pool) => {
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      const folder = path.join(__dirname, '../public/uploads');
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (_, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
      const allowed = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx'];
      const ext = path.extname(file.originalname).toLowerCase();
      if (!allowed.includes(ext)) return cb(new Error('Invalid file type'));
      cb(null, true);
    },
  });

  const sanitize = (v) => {
    if (typeof v === 'string') {
      if (v.trim() === '') return null;
      if (/^\d{4}-\d{2}$/.test(v)) return `${v}-01`;
    }
    return v;
  };

  const cleanArray = (arr, requiredKeys) =>
    Array.isArray(arr)
      ? arr.filter(row => requiredKeys.every(k => row?.[k] !== undefined && row?.[k] !== null && row?.[k] !== ''))
      : [];

  const bulkInsert = async (client, table, items, columns, profileId) => {
    if (!Array.isArray(items) || items.length === 0) return;
    await client.query(`DELETE FROM ${table} WHERE profile_id = $1`, [profileId]);
    for (const item of items) {
      const values = columns.map(col => sanitize(item[col]));
      const placeholders = values.map((_, i) => `$${i + 2}`).join(', ');
      await client.query(
        `INSERT INTO ${table} (profile_id, ${columns.join(', ')}) VALUES ($1, ${placeholders})`,
        [profileId, ...values]
      );
    }
  };

  app.post('/api/questionnaire', upload.fields([{ name: 'photo' }, { name: 'cv' }]), async (req, res) => {
    console.log('🔐 Incoming request to /api/questionnaire');
    const user = req.session?.user;
    console.log('🧾 Session user:', user);

    const userId = user?.userId;
    if (!userId) {
      console.warn('⛔ Missing user ID in session');
      return res.status(401).json({ message: 'Unauthorized: user ID missing' });
    }

    const parseBody = (obj) =>
      Object.fromEntries(Object.entries(obj).map(([k, v]) => {
        try { return [k, JSON.parse(v)]; }
        catch { return [k, v]; }
      }));

    try {
      const parsed = parseBody(req.body);
      const {
        personalInfo = {}, education = [], kursus = [], bahasa = [], kegiatan = [],
        workExperience = {}, questionnaire = [], reference = [],
        pdaAccepted = {}, family = { rows: [], partnerWork: [] }, leisure = {}
      } = parsed;

      const familyRows = family.rows || [];
      const partnerWork = family.partnerWork || [];
      const work = workExperience.workExperience || [];
      const usaha = workExperience.businesses || [];

      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        let profileRes = await client.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
        let profile = profileRes.rowCount > 0 ? profileRes.rows[0] : null;

        if (!profile) {
          const newProfile = await client.query(
            'INSERT INTO profiles (user_id, email) VALUES ($1, $2) RETURNING *',
            [userId, personalInfo.email ?? user.email]
          );
          profile = newProfile.rows[0];
        }

        const profileId = profile.id;
        const safe = (v) => sanitize(v);

        const photo = req.files?.photo?.[0]?.filename ? `/uploads/${req.files.photo[0].filename}` : profile.photo;
        const cv = req.files?.cv?.[0]?.filename ? `/uploads/${req.files.cv[0].filename}` : profile.cv;

        await client.query(`UPDATE profiles SET
          full_name = $1, gender = $2, birth_place = $3, birth_date = $4,
          blood_type = $5, religion = $6, nationality = $7, marital_status = $8,
          address = $9, phone = $10, telepon_rumah = $11, email = $12,
          nik = $13, npwp = $14, no_bpjs = $15,
          sim_a = $16, sim_c = $17, passport_number = $18,
          kendaraan_jenis = $19, kendaraan_jenis_lainnya = $20,
          kendaraan_detail = $21, kendaraan_status = $22,
          pda_accepted_1 = $23, pda_accepted_2 = $24,
          photo = $25, cv = $26
          WHERE id = $27`, [
          safe(personalInfo.full_name ?? profile.full_name),
          safe(personalInfo.gender ?? profile.gender),
          safe(personalInfo.birth_place ?? profile.birth_place),
          safe(personalInfo.birth_date ?? profile.birth_date),
          safe(personalInfo.blood_type ?? profile.blood_type),
          safe(personalInfo.religion ?? profile.religion),
          safe(personalInfo.nationality ?? profile.nationality),
          safe(personalInfo.marital_status ?? profile.marital_status),
          safe(personalInfo.address ?? profile.address),
          safe(personalInfo.phone ?? profile.phone),
          safe(personalInfo.telepon_rumah ?? profile.telepon_rumah),
          safe(personalInfo.email ?? profile.email),
          safe(personalInfo.nik ?? profile.nik),
          safe(personalInfo.npwp ?? profile.npwp),
          safe(personalInfo.no_bpjs ?? profile.no_bpjs),
          safe(personalInfo.sim_a ?? profile.sim_a),
          safe(personalInfo.sim_c ?? profile.sim_c),
          safe(personalInfo.passport_number ?? profile.passport_number),
          safe(personalInfo.kendaraan_jenis ?? profile.kendaraan_jenis),
          safe(personalInfo.kendaraan_jenis_lainnya ?? profile.kendaraan_jenis_lainnya),
          safe(personalInfo.kendaraan_detail ?? profile.kendaraan_detail),
          safe(personalInfo.kendaraan_status ?? profile.kendaraan_status),
          safe(pdaAccepted.first ?? profile.pda_accepted_1),
          safe(pdaAccepted.second ?? profile.pda_accepted_2),
          photo,
          cv,
          profileId
        ]);

        await bulkInsert(client, 'educations', education, ['jenjang', 'sekolah', 'kota', 'jurusan', 'tahun_masuk', 'tahun_lulus'], profileId);
        await bulkInsert(client, 'kursus', kursus, ['bidang', 'penyelenggara', 'kota', 'lama', 'tahun', 'dibiayai_oleh', 'lulus'], profileId);
        await bulkInsert(client, 'bahasa', bahasa, ['nama', 'bicara', 'menulis', 'membaca'], profileId);
        await bulkInsert(client, 'kegiatan_sosial', kegiatan, ['nama_organisasi', 'macam_kegiatan', 'tahun', 'jabatan'], profileId);
        await bulkInsert(client, 'work_experience', work, ['dari', 'sampai', 'masih_bekerja', 'nama_perusahaan', 'jenis_usaha', 'jabatan_awal', 'jabatan_akhir', 'deskripsi_pekerjaan', 'jumlah_karyawan', 'alasan_berhenti', 'atasan_langsung', 'nama_direktur'], profileId);
        await bulkInsert(client, 'usaha_sendiri', usaha, ['nama_perusahaan', 'alamat', 'no_telp', 'tahun_berdiri', 'status_kepemilikan', 'jenis_usaha', 'jumlah_karyawan', 'pendapatan_bulanan'], profileId);
        await bulkInsert(client, 'partner_work', partnerWork, ['nama_perusahaan', 'alamat', 'telepon', 'jenis_usaha', 'jabatan', 'masa_kerja'], profileId);
        await bulkInsert(client, 'family', familyRows, ['hubungan', 'nama', 'gender', 'usia', 'pendidikan', 'pekerjaan', 'no_hp', 'keterangan'], profileId);

        const normalizeReference = (r) => ({
          nama: sanitize(r.nama ?? r.name),
          hubungan: sanitize(r.hubungan ?? r.relationship),
          perusahaan_or_alamat: sanitize(r.perusahaan_or_alamat ?? r.perusahaan ?? r.alamat),
          jabatan: sanitize(r.jabatan ?? r.position),
          no_hp: sanitize(r.no_hp ?? r.noHp ?? r.phone),
          tipe: sanitize(r.tipe)
        });

        const references = [
          ...(reference.references || []).map(r => ({ ...r, tipe: 'referrer' })),
          ...(reference.emergencyContacts || []).map(r => ({ ...r, tipe: 'emergency' }))
        ].map(normalizeReference);

        await bulkInsert(client, 'reference', cleanArray(references, ['nama', 'hubungan', 'perusahaan_or_alamat', 'jabatan', 'no_hp', 'tipe']), ['nama', 'hubungan', 'perusahaan_or_alamat', 'jabatan', 'no_hp', 'tipe'], profileId);

        await bulkInsert(client, 'questionnaire', cleanArray(questionnaire.map(q => ({ ...q, explanation: q.explanation ?? null })), ['question', 'answer']), ['question', 'answer', 'explanation'], profileId);

        await client.query('DELETE FROM leisure WHERE profile_id = $1', [profileId]);
        const jenisBacaan = Array.isArray(leisure.jenis_bacaan)
          ? leisure.jenis_bacaan.filter(Boolean).join(', ')
          : typeof leisure.jenis_bacaan === 'string'
            ? leisure.jenis_bacaan
            : leisure.bacaan_dibaca || null;

        await client.query(`INSERT INTO leisure (profile_id, frekuensi_membaca, topik_dibaca, jenis_bacaan, hobi)
          VALUES ($1, $2, $3, $4, $5)`, [
          profileId,
          sanitize(leisure.frekuensi_membaca),
          Array.isArray(leisure.topik_dibaca)
            ? leisure.topik_dibaca.filter(Boolean).join(', ')
            : typeof leisure.topik_dibaca === 'string'
              ? leisure.topik_dibaca
              : null,
          sanitize(jenisBacaan),
          sanitize(leisure.hobi),
        ]);

        await client.query('COMMIT');
        res.status(200).json({ success: true });
      } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ POST /api/questionnaire transaction error:', err);
        res.status(500).json({ error: 'Failed to submit questionnaire' });
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('❌ POST /api/questionnaire parse error:', err);
      res.status(400).json({ error: 'Invalid input format' });
    }
  });
};
