const pool = require('../db/db');
const bcrypt = require('bcrypt');

async function seedUserData(userId = null, name = 'John Doe', email = 'john@example.com') {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 🔹 If userId not given, create a dummy user
    if (!userId) {
      const hashed = await bcrypt.hash('password123', 10);
      const userRes = await client.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
        [name, email, hashed]
      );
      userId = userRes.rows[0].id;
      console.log(`🧪 Dummy user created: ${email} (ID: ${userId})`);
    }

    // 🔹 Prevent duplicate profiles
    const exists = await client.query('SELECT id FROM profiles WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      console.log(`⚠️  Profile with email ${email} already exists. Skipping profile seeding.`);
      await client.query('ROLLBACK');
      return;
    }

    // 🔹 Insert profile
    const profileRes = await client.query(
      `INSERT INTO profiles (
        user_id, name, email, nationality, gender, birth_place, birth_date,
        address, phone, religion, marital_status,
        photo_path, cv_path,
        ktp, sim_a, sim_c, npwp, jamsostek,
        kendaraan_jenis, kendaraan_jenis_lainnya, kendaraan_detail, kendaraan_status
      ) VALUES (
        $1, $2, $3, 'Indonesia', 'Laki-laki', 'Jakarta', '1990-01-01',
        'Jl. Merdeka 123', '081234567890', 'Islam', 'Belum Menikah',
        'uploads/photo.jpg', 'uploads/cv.pdf',
        '1234567890123456', '1234567890', '0987654321', '9876543210', '123456789',
        'Motor', 'N/A', 'Honda Vario 2022', 'Milik Sendiri'
      ) RETURNING id`,
      [userId, name, email]
    );
    const profileId = profileRes.rows[0].id;

    // 🔹 Related sections
    await client.query(`
      INSERT INTO educations (profile_id, jenjang, sekolah, kota, jurusan, tahun_masuk, tahun_lulus)
      VALUES 
        ($1, 'SMA', 'SMA Negeri 1 Jakarta', 'Jakarta', 'IPA', 2006, 2009),
        ($1, 'S1', 'Universitas Indonesia', 'Depok', 'Teknik Informatika', 2009, 2013)
    `, [profileId]);

    await client.query(`
      INSERT INTO kursus (profile_id, penyelenggara, kota, lama, tahun, dibiayai_oleh, lulus_tidak)
      VALUES ($1, 'Dicoding', 'Online', '3 Bulan', 2022, 'Pribadi', 'Ya')
    `, [profileId]);

    await client.query(`
      INSERT INTO bahasa (profile_id, bahasa, mendengar, membaca, berbicara, menulis)
      VALUES ($1, 'Inggris', 'Baik', 'Baik', 'Cukup', 'Baik')
    `, [profileId]);

    await client.query(`
      INSERT INTO kegiatan_sosial (profile_id, nama_organisasi, macam_kegiatan, tahun, jabatan)
      VALUES ($1, 'Karang Taruna', 'Bakti Sosial', 2021, 'Anggota')
    `, [profileId]);

    await client.query(`
      INSERT INTO work_experience (
        profile_id, dari, sampai, masih_bekerja,
        nama_perusahaan, jenis_usaha,
        jabatan_awal, jabatan_akhir,
        deskripsi_pekerjaan, jumlah_karyawan,
        alasan_berhenti, atasan_langsung, nama_direktur
      ) VALUES (
        $1, '2015-06-01', '2020-12-31', false,
        'PT Maju Terus', 'Teknologi',
        'Programmer', 'Senior Developer',
        'Membuat dan memelihara aplikasi web', 100,
        'Ingin tantangan baru', 'Budi Santoso', 'Agus Wijaya'
      )
    `, [profileId]);

    await client.query(`
      INSERT INTO usaha_sendiri (
        profile_id, nama_perusahaan, alamat, no_telp, tahun_berdiri,
        status_kepemilikan, jenis_usaha, jumlah_karyawan, pendapatan_bulanan
      ) VALUES (
        $1, 'Startup Sendiri', 'Bandung', '085670901234', 2021,
        '100%', 'Digital Marketing', 5, '20000000'
      )
    `, [profileId]);

    await client.query('COMMIT');
    console.log(`✅ Seed complete: profile for user ID ${userId} (${email})`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = seedUserData;

// CLI support: node seeds/seedUserData.js "Vincent" "vincent@example.com"
if (require.main === module) {
  const name = process.argv[2] || 'CLI User';
  const email = process.argv[3] || `cliuser${Date.now()}@example.com`;

  seedUserData(null, name, email)
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
