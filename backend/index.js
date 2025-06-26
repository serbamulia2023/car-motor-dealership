const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const pool = require('./db/db');
const seedUserData = require('./seeds/seedUserData');

const app = express();
const PORT = 5050;

// ✅ Ensure uploads & brand folder exists
const uploadDir = path.join(__dirname, 'uploads');
const brandDir = path.join(__dirname, 'public/brands');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir);

// ✅ Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(uploadDir));
app.use('/brands', express.static(brandDir)); // Serves static logos

// ✅ Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ✅ Dummy job list (can be replaced with DB later)
const jobList = [
  {
    id: 1,
    title: 'Sales Executive',
    location: 'Jakarta',
    type: 'Full-time',
    brand: 'daihatsu.png',
    description: 'Engage with walk-in customers and close deals.'
  },
  {
    id: 2,
    title: 'Marketing Specialist',
    location: 'Surabaya',
    type: 'Contract',
    brand: 'isuzu.png',
    description: 'Develop local campaigns and manage digital marketing efforts.'
  },
  {
    id: 3,
    title: 'Service Advisor',
    location: 'Bandung',
    type: 'Full-time',
    brand: 'daihatsu.png',
    description: 'Coordinate vehicle servicing and advise customers.'
  },
  {
    id: 4,
    title: 'Finance Admin',
    location: 'Remote',
    type: 'Part-time',
    brand: 'isuzu.png',
    description: 'Manage daily accounting and cashflow records remotely.'
  },
  {
    id: 5,
    title: 'Graphic Designer',
    location: 'Yogyakarta',
    type: 'Internship',
    brand: 'daihatsu.png',
    description: 'Design visual content for internal and external communications.'
  }
];

// ✅ Health check endpoints
app.get('/', (req, res) => res.send('✅ Backend is up and running!'));
app.get('/ping', (req, res) => res.json({ message: 'pong' }));

// ✅ GET all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobList);
});

// ✅ POST new job (future HR panel)
app.post('/api/jobs', (req, res) => {
  const { title, location, type, brand, description } = req.body;

  if (!title || !location || !type || !brand || !description) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const newJob = {
    id: jobList.length + 1,
    title,
    location,
    type,
    brand,
    description
  };

  jobList.push(newJob);
  res.status(201).json({ message: '✅ Job posted successfully', job: newJob });
});

// ✅ Signup with password hashing and seeding
app.post('/api/signup', async (req, res) => {
  const client = await pool.connect();
  try {
    const { name, email, password } = req.body;

    const existing = await client.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const userInsert = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashed]
    );

    const userId = userInsert.rows[0].id;
    await seedUserData(userId);

    res.status(201).json({ status: 'success', userId });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: 'Signup failed' });
  } finally {
    client.release();
  }
});

// ✅ Questionnaire form + file uploads
app.post('/api/questionnaire', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]), async (req, res) => {
  const formData = req.body;
  const files = req.files;
  const client = await pool.connect();

  const photoPath = files?.photo?.[0]?.path || null;
  const cvPath = files?.cv?.[0]?.path || null;

  try {
    await client.query('BEGIN');

    const profileInsert = await client.query(`
      INSERT INTO profiles (
        name, email, nationality, gender, birth_place, birth_date,
        address, phone, religion, marital_status,
        photo_path, cv_path,
        ktp, sim_a, sim_c, npwp, jamsostek,
        kendaraan_jenis, kendaraan_jenis_lainnya, kendaraan_detail, kendaraan_status
      ) VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,
        $11,$12,
        $13,$14,$15,$16,$17,
        $18,$19,$20,$21
      ) RETURNING id
    `, [
      formData.nama_lengkap,
      formData.email,
      formData.nationality,
      formData.gender,
      formData.birth_place,
      formData.birth_date,
      formData.address,
      formData.phone,
      formData.religion,
      formData.marital_status,
      photoPath,
      cvPath,
      formData.ktp,
      formData.simA,
      formData.simC,
      formData.npwp,
      formData.jamsostek,
      formData.kendaraanJenis,
      formData.kendaraanJenisLainnya,
      formData.kendaraanDetail,
      formData.kendaraanStatus
    ]);

    const profileId = profileInsert.rows[0].id;

    const baseEdu = JSON.parse(formData.education_base || '[]');
    const universities = JSON.parse(formData.education_universities || '[]');
    const kursusList = JSON.parse(formData.education_kursus || '[]');
    const bahasaList = JSON.parse(formData.education_bahasa || '[]');
    const kegiatanList = JSON.parse(formData.education_kegiatan || '[]');
    const workExpList = JSON.parse(formData.workExperience || '[]');
    const bisnisList = JSON.parse(formData.businesses || '[]');

    for (const edu of [...baseEdu, ...universities]) {
      await client.query(`
        INSERT INTO educations (profile_id, jenjang, sekolah, kota, jurusan, tahun_masuk, tahun_lulus)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
      `, [profileId, edu.jenjang, edu.sekolah, edu.kota, edu.jurusan, edu.tahunMasuk, edu.tahunLulus]);
    }

    for (const kursus of kursusList) {
      await client.query(`
        INSERT INTO kursus (profile_id, penyelenggara, kota, lama, tahun, dibiayai_oleh, lulus_tidak)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
      `, [profileId, kursus.penyelenggara, kursus.kota, kursus.lama, kursus.tahun, kursus.dibiayaiOleh, kursus.lulusTidak]);
    }

    for (const bahasa of bahasaList) {
      await client.query(`
        INSERT INTO bahasa (profile_id, bahasa, mendengar, membaca, berbicara, menulis)
        VALUES ($1,$2,$3,$4,$5,$6)
      `, [profileId, bahasa.bahasa, bahasa.mendengar, bahasa.membaca, bahasa.berbicara, bahasa.menulis]);
    }

    for (const kegiatan of kegiatanList) {
      await client.query(`
        INSERT INTO kegiatan_sosial (profile_id, nama_organisasi, macam_kegiatan, tahun, jabatan)
        VALUES ($1,$2,$3,$4,$5)
      `, [profileId, kegiatan.namaOrganisasi, kegiatan.macamKegiatan, kegiatan.tahun, kegiatan.jabatan]);
    }

    for (const work of workExpList) {
      await client.query(`
        INSERT INTO work_experience (
          profile_id, dari, sampai, masih_bekerja,
          nama_perusahaan, jenis_usaha,
          jabatan_awal, jabatan_akhir,
          deskripsi_pekerjaan, jumlah_karyawan,
          alasan_berhenti, atasan_langsung, nama_direktur
        ) VALUES (
          $1,$2,$3,$4,
          $5,$6,$7,$8,
          $9,$10,$11,$12,$13
        )
      `, [
        profileId, work.dari, work.sampai, work.masihBekerja,
        work.namaPerusahaan, work.jenisUsaha,
        work.jabatanAwal, work.jabatanAkhir,
        work.deskripsiPekerjaan, work.jumlahKaryawan,
        work.alasanBerhenti, work.atasanLangsung, work.namaDirektur
      ]);
    }

    for (const bisnis of bisnisList) {
      await client.query(`
        INSERT INTO usaha_sendiri (
          profile_id, nama_perusahaan, alamat, no_telp, tahun_berdiri,
          status_kepemilikan, jenis_usaha, jumlah_karyawan, pendapatan_bulanan
        ) VALUES (
          $1,$2,$3,$4,$5,
          $6,$7,$8,$9
        )
      `, [
        profileId, bisnis.namaPerusahaan, bisnis.alamat, bisnis.noTelp,
        bisnis.tahunBerdiri, bisnis.statusKepemilikan, bisnis.jenisUsaha,
        bisnis.jumlahKaryawan, bisnis.pendapatanBulanan
      ]);
    }

    await client.query('COMMIT');
    res.json({ status: 'success', message: '✅ All data saved to database' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Backend error:', err);
    res.status(500).json({ error: '❌ Failed to save data to database' });
  } finally {
    client.release();
  }
});

// ✅ Launch server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
