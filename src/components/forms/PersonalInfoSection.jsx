import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Fuse from 'fuse.js';
import IdentificationSection from './IdentificationSection';

const PersonalInfoSection = ({ data, setData }) => {
  const [showIdentification, setShowIdentification] = useState(false);
  const [emailLoaded, setEmailLoaded] = useState(false);
  const [nationalityInput, setNationalityInput] = useState(data?.nationality || '');

  const genderOptions = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
  ];

  const religionOptions = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Kristen', label: 'Kristen' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ];

  const bloodOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' },
    { value: 'NA', label: 'NA' },
  ];

  const fuse = new Fuse(['indonesia', 'indonesian', 'wni', 'indo'], {
    includeScore: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (!emailLoaded) {
      const stored = JSON.parse(localStorage.getItem('signupCredentials'));
      if (stored?.email) {
        setData(prev => ({
          ...prev,
          email: stored.email,
        }));
        setEmailLoaded(true);
      }
    }
  }, [emailLoaded, setData]);

  useEffect(() => {
    const isIndonesian = fuse.search(nationalityInput.toLowerCase()).length > 0;
    setShowIdentification(isIndonesian);
    setData(prev => ({
      ...prev,
      nationality: nationalityInput,
    }));
  }, [nationalityInput, setData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setData(prev => ({
      ...prev,
      [fieldName]: selectedOption?.value || '',
    }));
  };

  return (
    <div className="p-4 border rounded-md bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Informasi Pribadi</h2>

      <div className="mb-4">
        <label className="block mb-1">Nama Lengkap</label>
        <input
          type="text"
          name="fullName"
          value={data.fullName || ''}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={data.email || ''}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Jenis Kelamin *</label>
        <Select
          options={genderOptions}
          value={genderOptions.find(opt => opt.value === data.gender)}
          onChange={(opt) => handleSelectChange(opt, 'gender')}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Kewarganegaraan *</label>
        <input
          type="text"
          name="nationality"
          value={nationalityInput}
          onChange={(e) => setNationalityInput(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g., Indonesia"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Agama *</label>
        <Select
          options={religionOptions}
          value={religionOptions.find(opt => opt.value === data.religion)}
          onChange={(opt) => handleSelectChange(opt, 'religion')}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Golongan Darah</label>
        <Select
          options={bloodOptions}
          value={bloodOptions.find(opt => opt.value === data.bloodType)}
          onChange={(opt) => handleSelectChange(opt, 'bloodType')}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Alamat *</label>
        <textarea
          name="address"
          value={data.address || ''}
          onChange={handleChange}
          rows={3}
          className="w-full border px-3 py-2 rounded"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-1">No. Telepon</label>
        <input
          type="text"
          name="phoneNumber"
          value={data.phoneNumber || ''}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">No. Telepon Rumah</label>
        <input
          type="text"
          name="homePhoneNumber"
          value={data.homePhoneNumber || ''}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {showIdentification ? (
        <IdentificationSection
          data={data.identification || {}}
          setData={(identification) =>
            setData(prev => ({ ...prev, identification }))
          }
        />
      ) : nationalityInput ? (
        <div className="mb-4">
          <label className="block mb-1">No. Passport *</label>
          <input
            type="text"
            name="passportNumber"
            value={data.passportNumber || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ) : null}
    </div>
  );
};

export default PersonalInfoSection;
