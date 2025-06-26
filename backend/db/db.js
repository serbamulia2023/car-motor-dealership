// backend/db.js (or wherever you place it)
const { Pool } = require('pg');

// Create a new PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'car_motor_db', // ✅ Make sure this matches your actual DB name
  password: 'postgres',     // ✅ Only use 'postgres' as password if you set it that way
  port: 5432,               // ✅ Default PostgreSQL port
});

// Optional: test the connection on startup
pool.connect()
  .then((client) => {
    console.log('✅ PostgreSQL connected successfully!');
    client.release();
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
  });

module.exports = pool;
