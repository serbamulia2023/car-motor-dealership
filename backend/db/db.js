// backend/db.js
const { Pool } = require('pg');
require('dotenv').config(); // ✅ Load from .env

// ✅ Create a new PostgreSQL connection pool using .env values
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

// ✅ Optional: test the connection at startup
pool.connect()
  .then((client) => {
    console.log('✅ PostgreSQL connected successfully!');
    client.release();
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
  });

module.exports = pool;
