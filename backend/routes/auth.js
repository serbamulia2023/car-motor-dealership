// ------------------ IMPORTS ------------------
const bcrypt = require('bcrypt');

module.exports = (app, pool) => {
  // ------------------ REGISTER ------------------
  app.post('/api/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ message: 'Email already registered.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email',
        [name, email, hashedPassword]
      );

      const { id: userId, email: registeredEmail } = result.rows[0];

      // ✅ Set session
      req.session.user = { userId, email: registeredEmail };

      res.status(201).json({
        message: 'User registered successfully',
        userId,
        email: registeredEmail,
      });
    } catch (error) {
      console.error('❌ Registration Error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  });

  // ------------------ LOGIN ------------------
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      const result = await pool.query(
        'SELECT id, email, password FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      const user = result.rows[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // ✅ Set session
      req.session.user = { userId: user.id, email: user.email };

      res.status(200).json({
        message: 'Login successful',
        userId: user.id,
        email: user.email,
      });
    } catch (error) {
      console.error('❌ Login Error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  });

  // ------------------ LOGOUT ------------------
  app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('❌ Logout Error:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });

  // ------------------ GET CURRENT USER SESSION ------------------
  app.get('/api/me', async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const result = await pool.query(
        'SELECT id, name, email FROM users WHERE id = $1',
        [req.session.user.userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = result.rows[0];
      res.status(200).json(user);
    } catch (err) {
      console.error('❌ /api/me Error:', err);
      res.status(500).json({ message: 'Server error during session check' });
    }
  });
};
