module.exports = (app, pool, seedJobs) => {
  // GET all jobs (with fallback to seed)
  app.get('/api/jobs', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM jobs');
      if (result.rows.length === 0) {
        // Seed if empty
        await seedJobs(pool);
        const seeded = await pool.query('SELECT * FROM jobs');
        return res.json(seeded.rows);
      }
      res.json(result.rows);
    } catch (err) {
      console.error('❌ Failed to fetch jobs:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // GET job by ID
  app.get('/api/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ message: 'Job not found' });
      res.json(result.rows[0]);
    } catch (err) {
      console.error('❌ Failed to fetch job:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // POST apply to job
  app.post('/api/apply', async (req, res) => {
    const { userId, jobId } = req.body;
    if (!userId || !jobId) return res.status(400).json({ message: 'Missing userId or jobId' });

    try {
      // Prevent duplicate applications
      const check = await pool.query(
        'SELECT id FROM applications WHERE user_id = $1 AND job_id = $2',
        [userId, jobId]
      );
      if (check.rows.length > 0) {
        return res.status(409).json({ message: 'Already applied to this job' });
      }

      await pool.query(
        'INSERT INTO applications (user_id, job_id) VALUES ($1, $2)',
        [userId, jobId]
      );

      res.status(201).json({ message: '✅ Application submitted successfully' });
    } catch (err) {
      console.error('❌ Application error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // GET applied jobs by userId
  app.get('/api/applied-jobs/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const result = await pool.query(
        `SELECT jobs.* FROM jobs
         JOIN applications ON jobs.id = applications.job_id
         WHERE applications.user_id = $1`,
        [userId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error('❌ Failed to fetch applied jobs:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};
