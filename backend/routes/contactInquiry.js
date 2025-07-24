const express = require('express');
const nodemailer = require('nodemailer');

module.exports = (pool) => {
  const router = express.Router();

  // ✉️ Setup Mailtrap transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  /**
   * POST /api/contact-inquiry
   */
  router.post('/contact-inquiry', async (req, res) => {
    const { name, email, inquiry, location, message } = req.body;

    if (!name || !email || !inquiry || !location || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // 1. Save to DB
      await pool.query(
        `INSERT INTO contact_inquiries (name, email, inquiry, location, message, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [name, email, inquiry, location, message]
      );

      // 2. Send email to admin via Mailtrap
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <div style="max-width:600px; margin:auto; font-family:sans-serif; padding:24px; border:1px solid #eee; border-radius:8px; background-color:#f9f9f9;">

            <h2 style="color:#111; margin-bottom:20px;">📩 New Contact Inquiry</h2>

            <table style="width:100%; font-size:15px; color:#333; line-height:1.6;">
              <tr>
                <td style="width:140px; font-weight:bold;">Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Email:</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Inquiry:</td>
                <td>${inquiry}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Location:</td>
                <td>${location}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Message:</td>
                <td style="white-space:pre-wrap;">${message}</td>
              </tr>
            </table>

            <p style="margin-top:30px; font-size:14px; color:#777;">
              Pesan ini dikirim dari formulir kontak <strong>Serba Mulia Auto</strong>. 
              Mohon ditindaklanjuti sesuai inquiry yang diterima.
            </p>

            <hr style="margin:32px 0; border-color:#eee;" />

            <p style="text-align:center; color:#aaa; font-size:12px;">
              © ${new Date().getFullYear()} Serba Mulia Auto. All rights reserved.
            </p>
          </div>
        `,
      });

      return res.status(201).json({ success: true });
    } catch (err) {
      console.error('❌ Failed to save or email inquiry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  /**
   * PUT /api/contact-inquiry/:id
   */
  router.put('/contact-inquiry/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, inquiry, location, message } = req.body;

    if (!name || !email || !inquiry || !location || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      const result = await pool.query(
        `UPDATE contact_inquiries
         SET name = $1, email = $2, inquiry = $3, location = $4, message = $5, updated_at = NOW()
         WHERE id = $6`,
        [name, email, inquiry, location, message, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('❌ Failed to update inquiry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  /**
   * GET /api/contact-inquiry/:id
   */
  router.get('/contact-inquiry/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        `SELECT * FROM contact_inquiries WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Inquiry not found.' });
      }

      return res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('❌ Failed to fetch inquiry:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
