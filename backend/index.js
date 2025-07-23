// ------------------ IMPORTS ------------------
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pool = require('./db/db');
const seedJobs = require('./seeds/seedJobs');

// ------------------ APP CONFIG ------------------
const app = express();
const PORT = process.env.PORT || 5050;
const SESSION_SECRET = process.env.SESSION_SECRET || 'serbaMuliaSecret$123';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ------------------ MIDDLEWARE ------------------
app.set('trust proxy', 1);

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'sma.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

app.use((req, res, next) => {
  try {
    console.log(`[Session Check] sessionID: ${req.sessionID}`);
    console.log(`[Session Check] session user:`, req.session?.user || null);
  } catch (e) {
    console.warn('⚠️ Session debug failed:', e);
  }
  next();
});

// ------------------ STATIC FILES ------------------
const publicPath = path.join(__dirname, 'public');
const uploadDir = path.join(publicPath, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use('/uploads', express.static(uploadDir));
app.use('/brands', express.static(path.join(__dirname, 'brands')));

// ------------------ FILE UPLOAD CONFIG ------------------
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

// ------------------ ROUTES ------------------
try {
  require('./routes/auth')(app, pool);
  require('./routes/profile')(app, pool, upload);
  require('./routes/questionnaire')(app, pool, upload);
  require('./routes/jobs')(app, pool, seedJobs);
  app.use('/api', require('./routes/testDrive')(pool));
} catch (err) {
  console.error('❌ Route registration failed:', err);
}

// ------------------ HEALTH CHECK ------------------
app.get('/', (_, res) => {
  res.send('🚀 Serba Mulia Backend is running');
});

// ------------------ GLOBAL ERROR HANDLER ------------------
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
