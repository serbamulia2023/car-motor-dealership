// backend/routes/profile.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

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
      const allowedTypes = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx'];
      const ext = path.extname(file.originalname).toLowerCase();
      if (!allowedTypes.includes(ext)) return cb(new Error('Invalid file type'));
      cb(null, true);
    },
  });

  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

  app.get('/api/me', async (req, res) => {
    const user = req.session?.user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const client = await pool.connect();
    try {
      const userRes = await client.query('SELECT * FROM users WHERE id = $1', [user.id]);
      const profileRes = await client.query('SELECT * FROM profiles WHERE user_id = $1', [user.id]);
      if (profileRes.rowCount === 0) return res.json({ hasProfile: false, ...userRes.rows[0] });

      const profile = profileRes.rows[0];
      const profileId = profile.id;
      const fetchTable = async (table) => (await client.query(`SELECT * FROM ${table} WHERE profile_id = $1`, [profileId])).rows;

      const [education, kursus, bahasa, kegiatan, work, usaha, partnerWork, family, referensi, questionnaire] =
        await Promise.all([
          fetchTable('educations'),
          fetchTable('kursus'),
          fetchTable('bahasa'),
          fetchTable('kegiatan_sosial'),
          fetchTable('work_experience'),
          fetchTable('usaha_sendiri'),
          fetchTable('partner_work'),
          fetchTable('family'),
          fetchTable('reference'),
          fetchTable('questionnaire'),
        ]);

      res.json({
        hasProfile: true,
        email: userRes.rows[0].email,
        personalInfo: {
          fullName: profile.full_name,
          email: profile.email,
          gender: profile.gender,
          tempatLahir: profile.birth_place,
          tanggalLahir: profile.birth_date,
          golonganDarah: profile.blood_type,
          religion: profile.religion,
          nationality: profile.nationality,
          maritalStatus: profile.marital_status,
          alamat: profile.address,
          noHp: profile.phone,
          teleponRumah: profile.telepon_rumah,
          kendaraanJenis: profile.kendaraan_jenis,
          kendaraanJenisLainnya: profile.kendaraan_jenis_lainnya,
          kendaraanDetail: profile.kendaraan_detail,
          kendaraanStatus: profile.kendaraan_status,
          photo: profile.photo ? `/uploads/${path.basename(profile.photo)}` : null,
          cv: profile.cv ? `/uploads/${path.basename(profile.cv)}` : null,
        },
        identification: {
          nik: profile.nik,
          npwp: profile.npwp,
          no_bpjs: profile.no_bpjs,
          simA: profile.sim_a,
          simC: profile.sim_c,
          noPaspor: profile.passport_number,
        },
        pdaAccepted: {
          first: profile.pda_accepted_1,
          second: profile.pda_accepted_2,
        },
        education,
        kursus,
        bahasa,
        kegiatan,
        workExperience: work,
        businesses: usaha,
        partnerWork,
        family,
        reference: referensi,
        questionnaire,
      });
    } catch (err) {
      console.error('❌ GET /api/me error:', err);
      res.status(500).json({ error: 'Failed to fetch profile' });
    } finally {
      client.release();
    }
  });

  app.put('/api/profiles/:email', upload.fields([{ name: 'photo' }, { name: 'cv' }]), async (req, res) => {
    const { email } = req.params;
    try {
      const parsed = Object.fromEntries(
        Object.entries(req.body).map(([k, v]) => {
          try {
            return [k, JSON.parse(v)];
          } catch {
            return [k, v];
          }
        })
      );

      const {
        personalInfo = {}, identification = {}, education = [], kursus = [],
        bahasa = [], kegiatan = [], workExperience = [], businesses = [],
        partnerWork = [], questionnaire = [], family = [], reference = [],
        pdaAccepted = {}
      } = parsed;

      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const profileRes = await client.query('SELECT * FROM profiles WHERE email = $1', [email]);
        if (profileRes.rowCount === 0) throw new Error('Profile not found');

        const profileId = profileRes.rows[0].id;
        const currentProfile = profileRes.rows[0];
        const safe = (val, fallback) => val !== undefined ? val : fallback;

        const photo = req.files?.photo?.[0]?.filename || currentProfile.photo;
        const cv = req.files?.cv?.[0]?.filename || currentProfile.cv;

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
          safe(personalInfo.fullName, currentProfile.full_name),
          safe(personalInfo.gender, currentProfile.gender),
          safe(personalInfo.tempatLahir, currentProfile.birth_place),
          safe(personalInfo.tanggalLahir, currentProfile.birth_date),
          safe(personalInfo.golonganDarah, currentProfile.blood_type),
          safe(personalInfo.religion, currentProfile.religion),
          safe(personalInfo.nationality, currentProfile.nationality),
          safe(personalInfo.maritalStatus, currentProfile.marital_status),
          safe(personalInfo.alamat, currentProfile.address),
          safe(personalInfo.noHp, currentProfile.phone),
          safe(personalInfo.teleponRumah, currentProfile.telepon_rumah),
          safe(personalInfo.email, currentProfile.email),
          safe(identification.nik, currentProfile.nik),
          safe(identification.npwp, currentProfile.npwp),
          safe(identification.no_bpjs, currentProfile.no_bpjs),
          safe(identification.simA, currentProfile.sim_a),
          safe(identification.simC, currentProfile.sim_c),
          safe(identification.noPaspor, currentProfile.passport_number),
          safe(personalInfo.kendaraanJenis, currentProfile.kendaraan_jenis),
          safe(personalInfo.kendaraanJenisLainnya, currentProfile.kendaraan_jenis_lainnya),
          safe(personalInfo.kendaraanDetail, currentProfile.kendaraan_detail),
          safe(personalInfo.kendaraanStatus, currentProfile.kendaraan_status),
          safe(pdaAccepted.first, currentProfile.pda_accepted_1),
          safe(pdaAccepted.second, currentProfile.pda_accepted_2),
          photo,
          cv,
          profileId
        ]);

        const bulkInsert = async (table, items, columns) => {
          if (!Array.isArray(items)) return;
          await client.query(`DELETE FROM ${table} WHERE profile_id = $1`, [profileId]);
          for (const item of items) {
            const values = columns.map(col => item[col] ?? null);
            const placeholders = values.map((_, i) => `$${i + 2}`).join(', ');
            await client.query(`INSERT INTO ${table} (profile_id, ${columns.join(', ')}) VALUES ($1, ${placeholders})`, [profileId, ...values]);
          }
        };

        await bulkInsert('educations', education, ['jenjang', 'nama_sekolah', 'jurusan', 'tahun_masuk', 'tahun_lulus', 'nilai']);
        await bulkInsert('kursus', kursus, ['bidang', 'penyelenggara', 'kota', 'lama', 'tahun', 'dibiayai_oleh', 'lulus']);
        await bulkInsert('bahasa', bahasa, ['nama', 'bicara', 'menulis', 'membaca']);
        await bulkInsert('kegiatan_sosial', kegiatan, ['nama_organisasi', 'macam_kegiatan', 'tahun', 'jabatan']);
        await bulkInsert('work_experience', workExperience, ['dari', 'sampai', 'masih_bekerja', 'nama_perusahaan', 'jenis_usaha', 'jabatan_awal', 'jabatan_akhir', 'deskripsi_pekerjaan', 'jumlah_karyawan', 'alasan_berhenti', 'atasan_langsung', 'nama_direktur']);
        await bulkInsert('usaha_sendiri', businesses, ['nama_perusahaan', 'alamat', 'no_telp', 'tahun_berdiri', 'status_kepemilikan', 'jenis_usaha', 'jumlah_karyawan', 'pendapatan_bulanan']);
        await bulkInsert('partner_work', partnerWork, ['nama_perusahaan', 'alamat', 'telepon', 'jenis_usaha', 'jabatan', 'masa_kerja']);
        await bulkInsert('family', family, ['hubungan', 'nama', 'gender', 'usia', 'pendidikan', 'pekerjaan', 'no_hp', 'keterangan']);
        await bulkInsert('reference', reference, ['nama', 'hubungan', 'perusahaan_or_alamat', 'jabatan', 'no_hp', 'tipe']);
        await bulkInsert('questionnaire', questionnaire, ['question', 'answer', 'explanation']);

        await client.query('COMMIT');
        res.status(200).json({ success: true });
      } catch (err) {
        await client.query('ROLLBACK');
        console.error('❌ PUT /api/profiles/:email transaction error:', err);
        res.status(500).json({ error: 'Failed to update profile' });
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('❌ PUT /api/profiles/:email parse error:', err);
      res.status(400).json({ error: 'Invalid input format' });
    }
  });
};
