const express = require('express');
const nodemailer = require('nodemailer');

module.exports = (pool) => {
  const router = express.Router();

  // Setup Mailtrap transporter
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
        `INSERT INTO test_drive_bookings 
         (full_name, email, phone, model, location, brand, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
         RETURNING *`,
        [fullName, email, phone, model, location, brand]
      );

      const booking = result.rows[0];

      // Send styled HTML email
      await transporter.sendMail({
        from: `"Serba Mulia Auto" <${process.env.FROM_EMAIL}>`,
        to: process.env.ADMIN_EMAIL || 'admin@example.com',
        subject: `🚗 New ${brand.charAt(0).toUpperCase() + brand.slice(1)} Test Drive Booking`,
        html: `
          <div style="max-width:600px; margin:auto; font-family:sans-serif; padding:24px; border:1px solid #eee; border-radius:8px; background-color:#f9f9f9;">
            <h2 style="color:#111; margin-bottom:20px;">🚗 New Test Drive Booking (${brand})</h2>

            <table style="width:100%; font-size:15px; color:#333; line-height:1.6;">
              <tr>
                <td style="width:140px; font-weight:bold;">Name:</td>
                <td>${booking.full_name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Email:</td>
                <td>${booking.email}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Phone:</td>
                <td>${booking.phone}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Model:</td>
                <td>${booking.model}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Location:</td>
                <td>${booking.location}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Brand:</td>
                <td>${booking.brand}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Submitted At:</td>
                <td>${new Date(booking.created_at).toLocaleString()}</td>
              </tr>
            </table>

            <p style="margin-top:30px; font-size:14px; color:#777;">
              Booking submitted from the <strong>Serba Mulia Auto</strong> website.
              Please follow up accordingly.
            </p>

            <hr style="margin:32px 0; border-color:#eee;" />

            <p style="text-align:center; color:#aaa; font-size:12px;">
              © ${new Date().getFullYear()} Serba Mulia Auto. All rights reserved.
            </p>
          </div>
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
