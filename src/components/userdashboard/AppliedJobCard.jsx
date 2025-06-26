import React from 'react';

const AppliedJobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-green-50 border-green-200">
      <h3 className="text-lg font-semibold mb-1 text-green-800">{job.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{job.location}</p>
      <p className="text-sm text-gray-800">{job.description}</p>
      <p className="text-xs text-green-600 mt-2">Status: Applied</p>
    </div>
  );
};

export default AppliedJobCard;
