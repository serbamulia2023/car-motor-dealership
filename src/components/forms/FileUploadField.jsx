import React from 'react';

const FileUploadField = ({ label, name, required, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        required={required}
        onChange={onChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:rounded-md hover:file:bg-gray-800"
      />
    </div>
  );
};

export default FileUploadField;
