import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['title', 'location', 'type', 'description'],
  threshold: 0.4,
};

const VALID_BRANDS = ['daihatsu', 'yamaha', 'castrol'];

const Career = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError('Gagal memuat daftar pekerjaan.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const fuse = new Fuse(jobs, fuseOptions);
  const results =
    searchTerm.trim() === ''
      ? jobs
      : fuse.search(searchTerm).map((res) => res.item);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const renderBrandLogo = (brand) => {
    const brandName = brand?.toLowerCase().replace('.png', '');
    if (!VALID_BRANDS.includes(brandName)) return null;

    return (
      <img
        src={`http://localhost:5050/brands/${brandName}.png`}
        alt={`${brandName} logo`}
        className="object-contain h-full max-w-[100px]"
        onError={(e) => (e.target.style.display = 'none')}
      />
    );
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
            onClick={() => {}}
          >
            Search
          </button>
        </div>

        {/* 🔄 Loading */}
        {loading && <p className="text-gray-500">Loading jobs...</p>}

        {/* ⚠️ Error */}
        {!loading && error && <p className="text-red-500">{error}</p>}

        {/* 📄 Job Cards */}
        {!loading && !error && results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.map((job) => (
              <div
                key={job.id}
                className="relative border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-200 p-6 text-left bg-white"
              >
                {/* 🖼 Brand Logo */}
                <div className="flex items-center h-10 mb-4">
                  {job.brand ? (
                    renderBrandLogo(job.brand)
                  ) : (
                    <span className="text-sm text-gray-400 italic">No brand</span>
                  )}
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h2>
                <div className="text-sm text-gray-500 mb-3">
                  📍 {job.location || '-'} • 🕒 {job.type || 'Full-time'}
                </div>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {job.description || 'No description available.'}
                </p>
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
          !loading &&
          !error && (
            <p className="text-gray-500 text-md">No jobs found matching your search.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Career;
