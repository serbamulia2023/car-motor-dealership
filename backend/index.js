// ------------------ IMPORTS ------------------
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = require('./db/db');
const seedJobs = require('./seeds/seedJobs');

const app = express();
const PORT = process.env.PORT || 5050;
const SESSION_SECRET = process.env.SESSION_SECRET || 'serbaMuliaSecret$123';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ------------------ MIDDLEWARE ------------------
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

// ------------------ STATIC FILES ------------------
const publicPath = path.join(__dirname, 'public');
app.use('/uploads', express.static(path.join(publicPath, 'uploads')));
app.use('/brands', express.static(path.join(__dirname, 'brands')));

// ------------------ FILE UPLOAD CONFIG ------------------
const uploadDir = path.join(publicPath, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const fileFilter = (_, file, cb) => {
  const allowed = [
    'image/jpeg', 'image/png', 'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  cb(null, allowed.includes(file.mimetype));
};
const upload = multer({ storage, fileFilter });

// ------------------ AUTH ROUTES ------------------
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email, and password are required' });

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0)
      return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [name, email, hashed]
    );

    const userId = result.rows[0].id;

    await pool.query(
      'INSERT INTO profiles (user_id, email, full_name, created_at) VALUES ($1, $2, $3, NOW())',
      [userId, email, name]
    );

    req.session.user = { userId, email };
    res.status(201).json({ message: 'User registered successfully', userId, email });
  } catch (err) {
    console.error('❌ Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = { userId: user.id, email: user.email };
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/me', async (req, res) => {
  const user = req.session?.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [user.userId]);
    if (result.rows.length === 0)
      return res.status(200).json({ hasProfile: false, userId: user.userId });

    const profile = result.rows[0];
    const profileId = profile.id;

    const fetchTable = async (table) =>
      (await pool.query(`SELECT * FROM ${table} WHERE profile_id = $1`, [profileId])).rows;

    const [
      education, kursus, bahasa, kegiatan, workExperience, businesses,
      partnerWork, family, referensi, questionnaire
    ] = await Promise.all([
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

    res.status(200).json({
      hasProfile: true,
      userId: user.userId,
      photo: profile.photo,
      cv: profile.cv,
      personalInfo: {
        email: profile.email, // ✅ Moved here
        full_name: profile.full_name,
        gender: profile.gender,
        nationality: profile.nationality,
        birth_place: profile.birth_place,
        birth_date: profile.birth_date,
        address: profile.address,
        phone: profile.phone,
        telepon_rumah: profile.telepon_rumah,
        religion: profile.religion,
        blood_type: profile.blood_type,
        marital_status: profile.marital_status,
        nik: profile.nik,
        npwp: profile.npwp,
        no_bpjs: profile.no_bpjs,
        sim_a: profile.sim_a,
        sim_c: profile.sim_c,
        passport_number: profile.passport_number,
        kendaraan_jenis: profile.kendaraan_jenis,
        kendaraan_jenis_lainnya: profile.kendaraan_jenis_lainnya,
        kendaraan_detail: profile.kendaraan_detail,
        kendaraan_status: profile.kendaraan_status,
      },
      education,
      kursus,
      bahasa,
      kegiatan,
      workExperience,
      businesses,
      partnerWork: profile.marital_status?.toLowerCase() === 'menikah' ? partnerWork : [],
      family,
      referensi,
      questionnaire,
      pdaAccepted: {
        first: profile.pda_accepted_1,
        second: profile.pda_accepted_2,
      },
    });
  } catch (err) {
    console.error('❌ /api/me error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ------------------ CUSTOM ROUTES ------------------
require('./routes/questionnaire')(app, pool, upload);
require('./routes/profile')(app, pool, upload);
require('./routes/jobs')(app, pool, seedJobs);

// ------------------ ERROR HANDLER ------------------
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
