import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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
];

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find((job) => job.id === parseInt(id));

  if (!job) {
    return <div className="text-center mt-20 text-gray-500">Job not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex-grow px-4 sm:px-6 md:px-8 py-6 max-w-6xl w-full mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 transition"
          >
            ← Back
          </button>
        </div>

        {/* Job Header */}
        <div className="max-w-3xl mx-auto text-center">
          <img
            src={`/brands/${job.brand}`}
            alt="Brand Logo"
            className="mx-auto mb-6 h-28 sm:h-36 md:h-44 object-contain"
          />
          <h1 className="-mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            {job.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            📍 {job.location} • 🕒 {job.type}
          </p>

          <div className="text-left space-y-8 border-t border-gray-200 pt-6">
            <div>
              <h2 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Job Description</h2>
              <p className="text-gray-600 text-sm sm:text-base">{job.description}</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base space-y-1">
                <li>Engage customers in-person and online</li>
                <li>Meet monthly sales targets</li>
                <li>Coordinate with the dealership team</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Qualifications</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base space-y-1">
                <li>Excellent communication skills</li>
                <li>Experience in sales is a plus</li>
                <li>Familiarity with automotive products</li>
              </ul>
            </div>

            {/* Apply Link */}
            <div className="text-center mt-6 mb-4 sm:mb-6">
              <Link
                to="/login"
                className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black text-white text-center text-sm px-4 py-6 sm:py-8">
        © {new Date().getFullYear()} Serba Mulia Auto. All rights reserved.
      </footer>
    </div>
  );
};

export default JobDetail;
