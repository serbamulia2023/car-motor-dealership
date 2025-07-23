// routes/testDrive.js
const express = require('express');
const nodemailer = require('nodemailer');

module.exports = (pool) => {
  const router = express.Router();

  // Mailtrap transporter setup
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // POST /api/book-test-drive/:brand
  router.post('/book-test-drive/:brand', async (req, res) => {
    const { fullName, email, phone, model, location } = req.body;
    const { brand } = req.params;

    if (!fullName || !email || !phone || !model || !location || !brand) {
      return res.status(400).json({ error: 'All fields including brand are required.' });
    }

    try {
      const result = await pool.query(
        `INSERT INTO test_drive_bookings (full_name, email, phone, model, location, brand)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [fullName, email, phone, model, location, brand]
      );

      const booking = result.rows[0];

      // Send email to admin
      await transporter.sendMail({
        from: `"Serba Mulia Auto" <${process.env.FROM_EMAIL}>`,
        to: process.env.ADMIN_EMAIL || 'admin@example.com',
        subject: `🚗 New ${brand.charAt(0).toUpperCase() + brand.slice(1)} Test Drive Booking`,
        html: `
          <h2>New ${brand.charAt(0).toUpperCase() + brand.slice(1)} Test Drive Booking</h2>
          <ul>
            <li><strong>Name:</strong> ${booking.full_name}</li>
            <li><strong>Email:</strong> ${booking.email}</li>
            <li><strong>Phone:</strong> ${booking.phone}</li>
            <li><strong>Model:</strong> ${booking.model}</li>
            <li><strong>Location:</strong> ${booking.location}</li>
            <li><strong>Brand:</strong> ${booking.brand}</li>
          </ul>
        `,
      });

      res.status(200).json({ message: 'Booking saved and email sent.' });
    } catch (err) {
      console.error('❌ Error booking test drive:', err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

  return router;
};
