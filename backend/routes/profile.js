const express = require('express');
const path = require('path');
const fs = require('fs');
const format = require('pg-format');

const safe = (value) => {
  if (value === '' || value === 'null' || value === 'undefined' || value === undefined) return null;
  return value;
};

module.exports = (app, pool, upload) => {
  // ------------------ GET /api/me ------------------
  app.get('/api/me', async (req, res) => {
    if (!req.session.user || !req.session.user.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = req.session.user.userId;
    const client = await pool.connect();

    try {
      const userRes = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
      const userEmail = userRes.rows?.[0]?.email ?? null;
      const profileRes = await client.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);

      if (profileRes.rowCount === 0) {
        return res.json({ hasProfile: false, userId, email: userEmail, personalInfo: { email: userEmail } });
      }

      const profile = profileRes.rows[0];
      const profileId = profile.id;
      const host = `${req.protocol}://${req.get('host')}/`;

      const fetchTable = async (table) => {
        const result = await client.query(`SELECT * FROM ${table} WHERE profile_id = $1`, [profileId]);
        return result.rows;
      };

      const [education, kursus, bahasa, kegiatan, work, usaha, partnerWork, familyRows, referensi, questionnaire, leisureRaw] = await Promise.all([
        fetchTable('educations'),
        fetchTable('kursus'),
        fetchTable('bahasa'),
        fetchTable('kegiatan_sosial'),
        fetchTable('work_experience'),
        fetchTable('usaha_sendiri'),
        fetchTable('partner_work'),
        fetchTable('family'),
        fetchTable('reference'),
        fetchTable('questionnaire'),
        fetchTable('leisure')
      ]);

      const leisure = leisureRaw.length > 0 ? {
        frekuensi_membaca: leisureRaw[0].frekuensi_membaca,
        topik_dibaca: leisureRaw[0].topik_dibaca?.split(',').map(s => s.trim()) || [],
        jenis_bacaan: leisureRaw[0].jenis_bacaan?.split(',').map(s => s.trim()) || [],
        hobi: leisureRaw[0].hobi
      } : {};

      res.json({
        hasProfile: true,
        userId,
        email: userEmail,
        personalInfo: {
          full_name: profile.full_name ?? '',
          email: profile.email ?? '',
          gender: profile.gender ?? '',
          birth_place: profile.birth_place ?? '',
          birth_date: profile.birth_date ?? '',
          blood_type: profile.blood_type ?? '',
          religion: profile.religion ?? '',
          nationality: profile.nationality ?? '',
          marital_status: profile.marital_status ?? '',
          address: profile.address ?? '',
          phone: profile.phone ?? '',
          telepon_rumah: profile.telepon_rumah ?? '',
          nik: profile.nik ?? '',
          npwp: profile.npwp ?? '',
          no_bpjs: profile.no_bpjs ?? '',
          sim_a: profile.sim_a ?? '',
          sim_c: profile.sim_c ?? '',
          passportNumber: profile.passport_number ?? '',
          kendaraan: {
            jenis: profile.kendaraan_jenis ?? '',
            lainnya: profile.kendaraan_jenis_lainnya ?? '',
            detail: profile.kendaraan_detail ?? '',
            status: profile.kendaraan_status ?? ''
          },
          photo: profile.photo ? `${host}uploads/${profile.photo}` : null,
          cv: profile.cv ? `${host}uploads/${profile.cv}` : null
        },
        pdaAccepted: {
          first: profile.pda_accepted_1 ?? false,
          second: profile.pda_accepted_2 ?? false
        },
        education,
        kursus,
        bahasa,
        kegiatan,
        workExperience: work,
        businesses: usaha,
        family: { rows: familyRows, partnerWork },
        reference: {
          references: referensi.filter(r => r.tipe === 'referrer'),
          emergencyContacts: referensi.filter(r => r.tipe === 'emergency')
        },
        questionnaire,
        leisure
      });
    } catch (err) {
      console.error('❌ GET /api/me error:', err);
      res.status(500).json({ error: 'Failed to fetch profile' });
    } finally {
      client.release();
    }
  });


  // ------------------ PUT /api/profiles/:email ------------------
  app.put('/api/profiles/:email', upload.fields([{ name: 'photo' }, { name: 'cv' }]), async (req, res) => {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const email = req.params.email;
      const userRes = await client.query('SELECT id FROM users WHERE email = $1', [email]);
      if (userRes.rowCount === 0) return res.status(404).json({ error: 'User not found' });

      const userId = userRes.rows[0].id;

      // Ensure profile exists
      const profileRes = await client.query('SELECT id FROM profiles WHERE user_id = $1', [userId]);
      if (profileRes.rowCount === 0) {
        await client.query('INSERT INTO profiles (user_id, email) VALUES ($1, $2)', [userId, email]);
      }

      const profileId = (await client.query('SELECT id FROM profiles WHERE user_id = $1', [userId])).rows[0].id;

      const files = req.files || {};
      const photo = files?.photo?.[0]?.filename || null;
      const cv = files?.cv?.[0]?.filename || null;

      const parseJSON = (field) => {
        try {
          return JSON.parse(req.body[field]);
        } catch {
          return null;
        }
      };

      const personalInfo = parseJSON('personalInfo') || {};
      const education = parseJSON('education') || [];
      const kursus = parseJSON('kursus') || [];
      const bahasa = parseJSON('bahasa') || [];
      const kegiatan = parseJSON('kegiatan') || [];
      const workExperience = parseJSON('workExperience') || [];
      const businesses = parseJSON('businesses') || [];
      const rawFamily = parseJSON('family') || {};
      const family = {
        rows: Array.isArray(rawFamily.rows) ? rawFamily.rows : [],
        partnerWork: Array.isArray(rawFamily.partnerWork) ? rawFamily.partnerWork : []
      };
      const rawReference = parseJSON('reference') || {};
      const reference = {
        references: Array.isArray(rawReference.references) ? rawReference.references : [],
        emergencyContacts: Array.isArray(rawReference.emergencyContacts) ? rawReference.emergencyContacts : []
      };
      const questionnaire = parseJSON('questionnaire') || [];
      const leisure = parseJSON('leisure') || {};
      const pdaAccepted = parseJSON('pdaAccepted') || {};

      const current = await client.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
      const merged = {
        ...current.rows[0],
        ...personalInfo,
        kendaraan_jenis: personalInfo.kendaraan?.jenis ?? current.rows[0].kendaraan_jenis,
        kendaraan_jenis_lainnya: personalInfo.kendaraan?.lainnya ?? current.rows[0].kendaraan_jenis_lainnya,
        kendaraan_detail: personalInfo.kendaraan?.detail ?? current.rows[0].kendaraan_detail,
        kendaraan_status: personalInfo.kendaraan?.status ?? current.rows[0].kendaraan_status,
        photo: photo || current.rows[0].photo,
        cv: cv || current.rows[0].cv,
        pda_accepted_1: !!pdaAccepted.first,
        pda_accepted_2: !!pdaAccepted.second
      };

      await client.query(
        `UPDATE profiles SET
          full_name = $1, gender = $2, birth_place = $3, birth_date = $4, blood_type = $5, religion = $6, nationality = $7,
          marital_status = $8, nik = $9, no_bpjs = $10, npwp = $11, sim_a = $12, sim_c = $13, passport_number = $14,
          phone = $15, telepon_rumah = $16, email = $17, address = $18,
          kendaraan_jenis = $19, kendaraan_jenis_lainnya = $20, kendaraan_detail = $21, kendaraan_status = $22,
          photo = $23, cv = $24,
          pda_accepted_1 = $25, pda_accepted_2 = $26
        WHERE user_id = $27`,
        [
          merged.full_name,
          merged.gender,
          merged.birth_place,
          merged.birth_date,
          merged.blood_type,
          merged.religion,
          merged.nationality,
          merged.marital_status,
          merged.nik,
          merged.no_bpjs,
          merged.npwp,
          merged.sim_a,
          merged.sim_c,
          merged.passport_number,
          merged.phone,
          merged.telepon_rumah,
          merged.email,
          merged.address,
          merged.kendaraan_jenis,
          merged.kendaraan_jenis_lainnya,
          merged.kendaraan_detail,
          merged.kendaraan_status,
          merged.photo,
          merged.cv,
          merged.pda_accepted_1,
          merged.pda_accepted_2,
          userId
        ]
      );

      // ✅ Bulletproof bulkInsert
      const bulkInsert = async (table, rows, columns) => {
        if (!Array.isArray(rows) || !rows.length || !columns.length) return;
        await client.query(`DELETE FROM ${table} WHERE profile_id = $1`, [profileId]);

        const values = rows.map((r) => [
          profileId,
          ...columns.map((c) => {
            const val = r[c];
            if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : null;
            return safe(val);
          })
        ]);

        const query = format(
          `INSERT INTO %I (%I${columns.map(() => ', %I').join('')}) VALUES %L`,
          table,
          'profile_id',
          ...columns,
          values
        );

        await client.query(query);
      };

      await bulkInsert('educations', education, ['jenjang', 'sekolah', 'kota', 'jurusan', 'tahun_masuk', 'tahun_lulus']);
      await bulkInsert('kursus', kursus, ['bidang', 'penyelenggara', 'kota', 'lama', 'tahun', 'dibiayai_oleh', 'lulus']);
      await bulkInsert('bahasa', bahasa, ['nama', 'bicara', 'menulis', 'membaca']);
      await bulkInsert('kegiatan_sosial', kegiatan, ['nama_organisasi', 'macam_kegiatan', 'tahun', 'jabatan']);
      await bulkInsert('work_experience', workExperience, ['dari', 'sampai', 'masih_bekerja', 'nama_perusahaan', 'jenis_usaha', 'jabatan_awal', 'jabatan_akhir', 'deskripsi_pekerjaan', 'jumlah_karyawan', 'alasan_berhenti', 'atasan_langsung', 'nama_direktur']);
      await bulkInsert('usaha_sendiri', businesses, ['nama_perusahaan', 'alamat', 'no_telp', 'tahun_berdiri', 'status_kepemilikan', 'jenis_usaha', 'jumlah_karyawan', 'pendapatan_bulanan']);
      await bulkInsert('partner_work', family.partnerWork, ['nama_perusahaan', 'alamat', 'telepon', 'jenis_usaha', 'jabatan', 'masa_kerja']);
      await bulkInsert('family', family.rows, ['hubungan', 'nama', 'gender', 'usia', 'pendidikan', 'pekerjaan', 'no_hp', 'keterangan']);
      await bulkInsert('reference', [...reference.references, ...reference.emergencyContacts], ['nama', 'hubungan', 'perusahaan_or_alamat', 'jabatan', 'no_hp', 'tipe']);
      await bulkInsert('questionnaire', questionnaire, ['question', 'answer', 'explanation']);
      await bulkInsert('leisure', [leisure || {}], ['frekuensi_membaca', 'topik_dibaca', 'jenis_bacaan', 'hobi']);

      await client.query('COMMIT');
      res.json({ success: true });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('❌ Error in PUT /api/profiles:', err);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      client.release();
    }
  });

};
