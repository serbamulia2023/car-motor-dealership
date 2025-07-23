// routes/contactInquiry.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // POST /api/contact-inquiry
  router.post('/contact-inquiry', async (req, res) => {
    const { name, email, inquiry, location, message } = req.body;

    try {
      await pool.query(
        `INSERT INTO contact_inquiries (name, email, inquiry, location, message, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [name, email, inquiry, location, message]
      );

      res.status(201).json({ success: true });
    } catch (err) {
      console.error('❌ Failed to save inquiry:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PUT /api/contact-inquiry/:id
  router.put('/contact-inquiry/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, inquiry, location, message } = req.body;

    try {
      await pool.query(
        `UPDATE contact_inquiries
         SET name = $1, email = $2, inquiry = $3, location = $4, message = $5, updated_at = NOW()
         WHERE id = $6`,
        [name, email, inquiry, location, message, id]
      );

      res.status(200).json({ success: true });
    } catch (err) {
      console.error('❌ Failed to update inquiry:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Optional: GET /api/contact-inquiry/:id (for editing support)
  router.get('/contact-inquiry/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        `SELECT * FROM contact_inquiries WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error('❌ Failed to fetch inquiry:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
