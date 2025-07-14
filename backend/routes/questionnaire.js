// ------------------ IMPORTS ------------------
const fs = require('fs');
const path = require('path');

// 🔧 Helper to sanitize integers
const sanitizeInt = (val) => {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? null : parsed;
};

module.exports = (app, pool, upload) => {
  app.post('/api/questionnaire', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
  ]), async (req, res) => {
    const user = req.session?.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    let client;
    try {
      const data = JSON.parse(req.body.data || '{}');
      console.log("📅 Incoming Full Questionnaire Data:", data);

      const {
        personalInfo = {},
        family = {},
        education = {},
        kursus = [],
        bahasa = [],
        kegiatan = [],
        workExperience = {},
        businesses = [],
        questionnaire = [],
        referensi = {},
        pdaAccepted = {},
        leisure = {},
      } = data;

      personalInfo.full_name = personalInfo.full_name || user.name || '';
      const familyRows = Array.isArray(family?.rows) ? family.rows : [];
      const partnerWork = Array.isArray(family?.partnerWork) ? family.partnerWork : [];
      const workExperienceRows = Array.isArray(workExperience?.workExperience) ? workExperience.workExperience : [];

      const references = [
        ...(referensi.references || []).map(r => ({ ...r, tipe: 'referrer' })),
        ...(referensi.emergencyContacts || []).map(e => ({ ...e, tipe: 'emergency' }))
      ].map(ref => ({
        nama: ref.nama || ref.name || null,
        hubungan: ref.hubungan || ref.relationship || null,
        perusahaan_or_alamat: ref.perusahaan_or_alamat || ref.perusahaan || ref.alamat || null,
        jabatan: ref.jabatan || ref.position || null,
        no_hp: ref.no_hp || ref.noHp || ref.phone || null,
        tipe: ref.tipe || null,
      }));

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads`;

      const photo = req.files?.photo?.[0]?.filename 
        ? `${baseUrl}/${req.files.photo[0].filename}` 
        : null;

      const cv = req.files?.cv?.[0]?.filename 
        ? `${baseUrl}/${req.files.cv[0].filename}` 
        : null;

      client = await pool.connect();
      await client.query('BEGIN');

      const profileRes = await client.query('SELECT * FROM profiles WHERE user_id = $1', [user.userId]);
      if (profileRes.rows.length === 0) {
        return res.status(400).json({ message: 'Profile not found' });
      }
      const profileId = profileRes.rows[0].id;

      // ----------- UPDATE PROFILES --------------
      const profileFields = [
        'full_name', 'email', 'gender', 'birth_place', 'birth_date',
        'blood_type', 'religion', 'nationality', 'marital_status',
        'address', 'phone', 'telepon_rumah', 'nik', 'npwp', 'no_bpjs',
        'sim_a', 'sim_c', 'passport_number', 'kendaraan_jenis',
        'kendaraan_jenis_lainnya', 'kendaraan_detail', 'kendaraan_status',
        'pda_accepted_1', 'pda_accepted_2', 'photo', 'cv'
      ];

      const profileValues = [
        personalInfo.full_name, personalInfo.email, personalInfo.gender, personalInfo.birth_place, personalInfo.birth_date,
        personalInfo.blood_type, personalInfo.religion, personalInfo.nationality, personalInfo.marital_status,
        personalInfo.address, personalInfo.phone, personalInfo.telepon_rumah, personalInfo.nik, personalInfo.npwp, personalInfo.no_bpjs,
        personalInfo.sim_a, personalInfo.sim_c, personalInfo.passport_number, personalInfo.kendaraan_jenis,
        personalInfo.kendaraan_jenis_lainnya, personalInfo.kendaraan_detail, personalInfo.kendaraan_status,
        pdaAccepted.first || false, pdaAccepted.second || false, photo, cv
      ];

      await client.query(
        `UPDATE profiles SET ${profileFields.map((f, i) => `${f} = $${i + 1}`).join(', ')} WHERE id = $${profileFields.length + 1}`,
        [...profileValues, profileId]
      );

      // ----------- CLEAR OLD DATA --------------
      const relatedTables = [
        'educations', 'kursus', 'bahasa', 'kegiatan_sosial',
        'work_experience', 'usaha_sendiri', 'family',
        'reference', 'partner_work', 'questionnaire'
      ];
      for (const table of relatedTables) {
        await client.query(`DELETE FROM ${table} WHERE profile_id = $1`, [profileId]);
      }

      // ----------- INSERT HELPER --------------
      const insertAll = async (table, columns, rows) => {
        if (!Array.isArray(rows) || rows.length === 0) return;
        for (const row of rows) {
          const values = columns.map(col => row[col] === '' ? null : row[col]);
          await client.query(
            `INSERT INTO ${table} (profile_id, ${columns.join(', ')}) VALUES ($1, ${columns.map((_, i) => `$${i + 2}`).join(', ')})`,
            [profileId, ...values]
          );
        }
      };

      // ----------- INSERT EDUCATION --------------
      const eduRows = [
        ...(education.base || []),
        ...(education.universities || [])
      ].map(e => ({
        jenjang: e.jenjang || null,
        nama_sekolah: e.sekolah || null,
        jurusan: e.jurusan || null,
        tahun_masuk: sanitizeInt(e.tahunMasuk),
        tahun_lulus: sanitizeInt(e.tahunLulus),
        nilai: null,
      }));
      await insertAll('educations', ['jenjang', 'nama_sekolah', 'jurusan', 'tahun_masuk', 'tahun_lulus', 'nilai'], eduRows);

      await insertAll('kursus', ['bidang', 'penyelenggara', 'kota', 'lama', 'tahun', 'dibiayai_oleh', 'lulus'], kursus.map(k => ({
        bidang: k.bidang || null,
        penyelenggara: k.penyelenggara || null,
        kota: k.kota || null,
        lama: k.lama || null,
        tahun: sanitizeInt(k.tahun),
        dibiayai_oleh: k.dibiayaiOleh || null,
        lulus: k.lulus || null
      })));

      await insertAll('bahasa', ['nama', 'bicara', 'menulis', 'membaca'], bahasa);

      await insertAll('kegiatan_sosial', ['nama_organisasi', 'macam_kegiatan', 'tahun', 'jabatan'], kegiatan.map(k => ({
        nama_organisasi: k.nama_organisasi || k.nama || null,
        macam_kegiatan: k.macam_kegiatan || k.kegiatan || null,
        tahun: sanitizeInt(k.tahun),
        jabatan: k.jabatan || null
      })));

      await insertAll('work_experience', [
        'dari', 'sampai', 'masih_bekerja', 'nama_perusahaan', 'jenis_usaha',
        'jabatan_awal', 'jabatan_akhir', 'deskripsi_pekerjaan',
        'jumlah_karyawan', 'alasan_berhenti', 'atasan_langsung', 'nama_direktur'
      ], workExperienceRows.map(w => ({
        ...w,
        jumlah_karyawan: sanitizeInt(w.jumlah_karyawan)
      })));

      await insertAll('usaha_sendiri', [
        'nama_perusahaan', 'alamat', 'no_telp', 'tahun_berdiri',
        'status_kepemilikan', 'jenis_usaha', 'jumlah_karyawan', 'pendapatan_bulanan'
      ], businesses.map(b => ({
        ...b,
        tahun_berdiri: sanitizeInt(b.tahun_berdiri),
        jumlah_karyawan: sanitizeInt(b.jumlah_karyawan),
      })));

      await insertAll('reference', ['nama', 'hubungan', 'perusahaan_or_alamat', 'jabatan', 'no_hp', 'tipe'], references);

      await insertAll('questionnaire', ['question', 'answer', 'explanation'], questionnaire);

      await insertAll('family', ['hubungan', 'nama', 'gender', 'usia', 'pendidikan', 'pekerjaan', 'no_hp', 'keterangan'], familyRows.map(f => ({
        hubungan: f.hubungan || null,
        nama: f.nama || null,
        gender: f.gender || null,
        usia: sanitizeInt(f.usia),
        pendidikan: f.pendidikan || null,
        pekerjaan: f.pekerjaan || null,
        no_hp: f.noHp || f.no_hp || null,
        keterangan: f.keterangan || null,
      })));

      await insertAll('partner_work', ['nama_perusahaan', 'alamat', 'telepon', 'jenis_usaha', 'jabatan', 'masa_kerja'], partnerWork);
      // ----------- INSERT LEISURE --------------
      if (leisure && Object.keys(leisure).length > 0) {
        await client.query(
          `INSERT INTO leisure (profile_id, kegiatan, frekuensi_membaca, topik_dibaca, jenis_bacaan)
          VALUES ($1, $2, $3, $4, $5)`,
          [
            profileId,
            leisure.hobi || null,
            leisure.frekuensi_membaca || null,
            JSON.stringify(leisure.topik_dibaca || []),
            leisure.bacaan_dibaca || null
          ]
        );
      }
      
      await client.query('COMMIT');
      console.log(`✅ Questionnaire submitted successfully for profile ID: ${profileId}`);
      res.status(200).json({ message: 'Questionnaire submitted successfully' });

    } catch (err) {
      if (client) await client.query('ROLLBACK');
      console.error('❌ Error in questionnaire submission:', err);
      res.status(500).json({ message: 'Failed to process questionnaire' });
    } finally {
      if (client) client.release();
    }
  });
};
