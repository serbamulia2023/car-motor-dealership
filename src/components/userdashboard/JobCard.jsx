import React from 'react';

const VALID_BRANDS = ['daihatsu', 'yamaha', 'castrol'];

const JobCard = ({ job, onApply }) => {
  /**
   * Renders a brand logo based on the given brand name.
   * @param {string} brand The brand name, which will be converted to lowercase and checked against the `VALID_BRANDS` array.
   * @returns {ReactElement} The rendered brand logo, or null if the brand is invalid.
   */
  const renderBrandLogo = (brand) => {
    if (!brand) return null;

    const clean = brand.toLowerCase();
    if (!VALID_BRANDS.includes(clean)) return null;

    const logoPath = `/brands/${clean}.png`;

    return (
      <img
        src={logoPath}
        alt={`${clean} logo`}
        className="object-contain h-10 w-auto mx-auto mb-4"
        onError={(e) => {
          console.error(`Logo failed to load: ${logoPath}`);
          e.target.style.display = 'none';
        }}
      />
    );
  };

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm bg-white flex flex-col justify-between h-full p-6 hover:shadow-md transition">
      <div>
        {renderBrandLogo(job.brand)}
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">
          {job.title}
        </h3>
        <p className="text-sm text-center text-gray-500 mb-3">
          📍 {job.location || '-'} • 🕒 {job.type || '-'}
        </p>
        <p className="text-gray-600 text-center text-sm mb-6 line-clamp-3">
          {job.description || 'No description provided.'}
        </p>
      </div>

      <div className="flex justify-center mt-auto">
        <button
          onClick={onApply}
          className="bg-black text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
