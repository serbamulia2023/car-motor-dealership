import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const jobs = [
  {
    id: 1,
    title: 'Sales Executive',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
    brand: 'daihatsu.png',
    description: 'Drive vehicle sales by engaging with walk-in and online customers.',
  },
  {
    id: 2,
    title: 'Marketing Specialist',
    location: 'Surabaya, Indonesia',
    type: 'Contract',
    brand: 'yamaha.png',
    description: 'Create and execute marketing campaigns.',
  },
  {
    id: 3,
    title: 'Service Advisor',
    location: 'Bandung, Indonesia',
    type: 'Full-time',
    brand: 'castrol.png',
    description: 'Act as a bridge between customers and service technicians.',
  },
  {
    id: 4,
    title: 'Finance Admin',
    location: 'Remote',
    type: 'Part-time',
    brand: 'daihatsu.png',
    description: 'Handle invoicing, payment tracking, and reporting.',
  },
  {
    id: 5,
    title: 'Graphic Designer',
    location: 'Yogyakarta, Indonesia',
    type: 'Internship',
    brand: 'yamaha.png',
    description: 'Design marketing assets and promotional materials.',
  },
];

const fuseOptions = {
  keys: ['title', 'location', 'type', 'description'],
  threshold: 0.4,
};

const Career = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fuse = new Fuse(jobs, fuseOptions);
  const results = searchTerm.trim() === '' ? jobs : fuse.search(searchTerm).map((res) => res.item);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // optional: add further search logic or analytics
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Explore open positions and grow your career with Serba Mulia Auto.
        </p>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by title, location, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            className="bg-black text-white px-5 rounded-r-lg hover:bg-blue-600 transition"
            onClick={() => setSearchTerm(searchTerm)}
          >
            Search
          </button>
        </div>

        {/* 📄 Job Cards */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-200 p-6 text-left bg-white"
              >
                {/* 🖼 Brand Logo with Daihatsu-specific scaling */}
                <div className="flex items-center h-8 mb-4">
                  <img
                    src={`/brands/${job.brand}`}
                    alt={`${job.title} logo`}
                    className={`object-contain max-w-[100px] ${
                      job.brand === 'daihatsu.png' ? 'h-10' : 'h-full'
                    }`}
                  />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                <div className="text-sm text-gray-500 mb-3">
                  📍 {job.location} • 🕒 {job.type}
                </div>
                <p className="text-gray-600 mb-6">{job.description}</p>
                <button
                  onClick={() => navigate(`/careers/${job.id}`)}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-md">No jobs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Career;
