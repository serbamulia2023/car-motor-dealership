const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = (app, pool) => {
  // ------------------ SMTP CONFIG (Mailtrap) ------------------
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // ------------------ REGISTER ------------------
  app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email, and password are required.' });

    try {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0)
        return res.status(400).json({ message: 'Email already registered.' });

      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email',
        [name, email, hashed]
      );

      const user = result.rows[0];

      // ✅ INSERT INTO profiles
      await pool.query(
        'INSERT INTO profiles (user_id, full_name, email) VALUES ($1, $2, $3)',
        [user.id, name, email]
      );

      req.session.user = { userId: user.id, email: user.email };
      res.status(201).json({ message: 'Registrasi berhasil.', userId: user.id, email: user.email });
    } catch (err) {
      console.error('❌ Registration Error:', err);
      res.status(500).json({ message: 'Server error during registration.' });
    }
  });

  // ------------------ LOGIN ------------------
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT id, email, password FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0)
        return res.status(400).json({ message: 'Email atau password salah.' });

      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: 'Email atau password salah.' });

      req.session.user = { userId: user.id, email: user.email };
      res.status(200).json({ message: 'Login berhasil.', userId: user.id, email: user.email });
    } catch (err) {
      console.error('❌ Login Error:', err);
      res.status(500).json({ message: 'Server error during login.' });
    }
  });

  // ------------------ LOGOUT ------------------
  app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ message: 'Gagal logout.' });
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout berhasil.' });
    });
  });

  // ------------------ FORGOT PASSWORD ------------------
  app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email wajib diisi.' });

    try {
      const result = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0)
        return res.status(404).json({ error: 'Email tidak ditemukan.' });

      const token = crypto.randomBytes(32).toString('hex');
      const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

      await pool.query(
        `UPDATE users
         SET reset_token = $1,
             reset_token_expires = NOW() + INTERVAL '1 hour'
         WHERE email = $2`,
        [token, email]
      );

      await transport.sendMail({
        from: `"Serba Mulia Auto" <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: 'Permintaan Reset Password',
        html: `
          <div style="font-family: sans-serif;">
            <p>Halo,</p>
            <p>Anda menerima email ini karena ada permintaan untuk mengatur ulang password akun Anda.</p>
            <p>Silakan klik link berikut (berlaku selama 1 jam):</p>
            <a href="${link}">${link}</a>
            <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
          </div>
        `,
      });

      console.log(`✅ Email reset terkirim ke ${email}`);
      res.sendStatus(200);
    } catch (err) {
      console.error('❌ Forgot password error:', err);
      res.status(500).json({ error: 'Gagal mengirim email. Cek konfigurasi SMTP Anda.' });
    }
  });

  // ------------------ VALIDATE RESET TOKEN ------------------
  app.get('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
      const result = await pool.query(
        'SELECT email, reset_token_expires FROM users WHERE reset_token = $1',
        [token]
      );

      if (result.rows.length === 0)
        return res.status(400).json({ message: 'Token tidak valid.' });

      const { email, reset_token_expires } = result.rows[0];
      if (new Date(reset_token_expires) < new Date())
        return res.status(400).json({ message: 'Token sudah kadaluarsa.' });

      res.status(200).json({ email });
    } catch (err) {
      console.error('❌ Token validation error:', err);
      res.status(500).json({ message: 'Gagal memvalidasi token.' });
    }
  });

  // ------------------ RESET PASSWORD ------------------
  app.post('/api/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter.' });
    }

    try {
      const result = await pool.query(
        `SELECT id, reset_token_expires
        FROM users
        WHERE reset_token = $1`,
        [token]
      );

      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Token tidak valid atau sudah kadaluarsa.' });
      }

      const { id, reset_token_expires } = result.rows[0];
      if (!reset_token_expires || new Date(reset_token_expires) < new Date()) {
        return res.status(400).json({ message: 'Token sudah kadaluarsa.' });
      }

      const hashed = await bcrypt.hash(newPassword, 10);

      await pool.query(
        `UPDATE users
        SET password = $1, reset_token = NULL, reset_token_expires = NULL
        WHERE id = $2`,
        [hashed, id]
      );

      res.status(200).json({ message: 'Password berhasil diperbarui.' });
    } catch (err) {
      console.error('❌ Reset Password Error:', err);
      res.status(500).json({ message: 'Gagal memperbarui password.' });
    }
  });
};
