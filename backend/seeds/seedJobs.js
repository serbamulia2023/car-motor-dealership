// seeds/seedJobs.js

async function seedJobs(pool) {
  const jobs = [
    {
      title: 'Sales Executive',
      description: 'Manage showroom sales and assist customers with high-value vehicles.',
      location: 'Jakarta',
      company: 'AutoMaju Motors',
      logo: 'daihatsu.png',
      type: 'Full-time',
      responsibilities: [
        'Handle showroom inquiries and walk-in customers',
        'Present product features and pricing',
        'Achieve monthly sales targets',
        'Coordinate with finance and insurance team'
      ],
      qualifications: [
        'Minimum D3 in Marketing or related field',
        'Good communication and negotiation skills',
        'Fresh graduates are welcome'
      ]
    },
    {
      title: 'Marketing Specialist',
      description: 'Plan and execute digital campaigns and event activations.',
      location: 'Bandung',
      company: 'DriveMore Indonesia',
      logo: 'castrol.png',
      type: 'Full-time',
      responsibilities: [
        'Run Facebook and Instagram campaigns',
        'Coordinate with design and event vendors',
        'Manage marketing budget'
      ],
      qualifications: [
        'Bachelor’s degree in Marketing or Communications',
        '1+ years of experience in digital marketing',
        'Strong organizational skills'
      ]
    },
    {
      title: 'Finance Analyst',
      description: 'Prepare monthly financial reports and assist with budgeting processes.',
      location: 'Surabaya',
      company: 'MajuBersama Auto',
      logo: 'yamaha.png',
      type: 'Contract',
      responsibilities: [
        'Analyze dealership financial data',
        'Prepare P&L and forecast reports',
        'Ensure audit compliance'
      ],
      qualifications: [
        'Degree in Finance or Accounting',
        'Proficiency in Excel and Power BI',
        'Detail-oriented and analytical'
      ]
    }
  ];

  try {
    // Step 1: Truncate dependent table first to avoid FK violation
    await pool.query('TRUNCATE TABLE applications RESTART IDENTITY CASCADE');

    // Step 2: Truncate jobs safely
    await pool.query('TRUNCATE TABLE jobs RESTART IDENTITY CASCADE');

    // Step 3: Insert each job
    for (const job of jobs) {
      await pool.query(
        `INSERT INTO jobs 
          (title, description, location, company, brand, type, responsibilities, requirements, created_at)
         VALUES 
          ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [
          job.title,
          job.description,
          job.location,
          job.company,
          job.logo, // stored under `brand` column
          job.type,
          JSON.stringify(job.responsibilities),
          JSON.stringify(job.qualifications)
        ]
      );
    }

    console.log('✅ Jobs seeded successfully');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    console.error(err.stack);
  }
}

module.exports = seedJobs;
