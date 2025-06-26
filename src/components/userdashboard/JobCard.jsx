import React from 'react';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="border rounded-md p-4 bg-white shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-600">{job.company} — {job.location}</p>
      </div>
      <button
        onClick={onApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
};

export default JobCard;
