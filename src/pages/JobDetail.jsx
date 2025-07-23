import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const VALID_BRANDS = ['daihatsu', 'yamaha', 'castrol'];

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/jobs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch job details');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error('❌ Fetch job detail error:', err);
        setError('Failed to load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const renderBrandLogo = (brand) => {
    if (!brand) return null;
    const clean = brand.toLowerCase().trim();
    if (!VALID_BRANDS.includes(clean)) return null;

    return (
      <img
        src={`/brands/${clean}.png`}
        alt={`${clean} logo`}
        className="mx-auto mb-6 h-24 sm:h-32 md:h-40 object-contain"
        onError={(e) => (e.target.style.display = 'none')}
      />
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) return <div className="text-center mt-20 text-gray-500">Loading job...</div>;
  if (error || !job) return <div className="text-center mt-20 text-red-500">{error || 'Job not found.'}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow px-4 sm:px-6 md:px-8 py-6 max-w-5xl w-full mx-auto">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 transition"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 text-center border border-gray-200">
          {renderBrandLogo(job.brand)}

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-sm text-gray-500 mb-6">Posted on: {formatDate(job.created_at)}</p>

          <div className="text-left space-y-6 text-gray-700">
            <p><strong>Business Unit:</strong> {job.company}</p>
            <p><strong>Lokasi:</strong> {job.location}</p>
            <div>
              <strong>Deskripsi:</strong>
              <p className="whitespace-pre-line mt-1">{job.description}</p>
            </div>

            {job.responsibilities?.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-1">Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {job.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                </ul>
              </div>
            )}

            {job.qualifications?.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-800 mb-1">Qualifications</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {job.qualifications.map((q, idx) => <li key={idx}>{q}</li>)}
                </ul>
              </div>
            )}

            <div className="text-center pt-6">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
              >
                Login to Apply
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-black text-white text-center text-sm px-4 py-6 sm:py-8 mt-10">
        © {new Date().getFullYear()} Serba Mulia Auto. All rights reserved.
      </footer>
    </div>
  );
};

export default JobDetail;
