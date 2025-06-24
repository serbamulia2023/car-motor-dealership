import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Fuse from 'fuse.js';
import IdentificationSection from './IdentificationSection';
import dropdown from '@dropdowns/countries';

const genderOptions = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const bloodTypeOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
  { value: 'NA', label: 'NA' },
];

const religionOptions = [
  { value: 'Islam', label: 'Islam' },
  { value: 'Kristen', label: 'Kristen' },
  { value: 'Katolik', label: 'Katolik' },
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Buddha', label: 'Buddha' },
  { value: 'Konghucu', label: 'Konghucu' },
  { value: 'Lainnya', label: 'Lainnya' },
];

const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: '40px',
    borderColor: '#d1d5db',
    boxShadow: 'none',
    fontSize: '0.875rem',
    paddingLeft: '0.25rem',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#3b82f6'
      : state.isFocused
      ? '#e0f2fe'
      : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#111827',
    fontWeight: state.isSelected ? 600 : 400,
    fontSize: '0.875rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

const PersonalInfoSection = ({ data = {}, setData }) => {
  const [isIndonesian, setIsIndonesian] = useState(false);
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([]);

  // const fuse = new Fuse(['indonesia', 'indonesian', 'wni', 'indo', 'orang indonesia'], {
  //   threshold: 0.3,
  //   includeScore: true,
  // });

  useEffect(() => {
    const allCountries = dropdown.getAllCountries();
    const countryOptions = allCountries.map((c) => ({ value: c.name, label: c.name }));
    setCountries(countryOptions);
  }, []);

  // useEffect(() => {
  //   const nationality = (data.nationality || '').toLowerCase();
    // const result = fuse.search(nationality);
    // setIsIndonesian(result.length > 0);
  // }, [data.nationality]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const numericFields = ['phoneNumber', 'homePhoneNumber'];
    if (numericFields.includes(name) && /[^0-9]/.test(value)) return;

    setData({
      ...data,
      [name]: files ? files[0] : value,
    });
  };

  const handleSelectChange = (field, selectedOption) => {
    const val = selectedOption ? selectedOption.value : '';
    if (field === 'nationality') {
      setCountry(val)
    }

    setData({
      ...data,
      [field]: val,
    });
  };

  const getSelectValue = (field, options) =>
    options.find((opt) => opt.value === data[field]) || null;

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">Informasi Pribadi</h3>

      {/* Full Name */}
      <div>
        <label className="block mb-1">Nama Lengkap *</label>
        <input
          type="text"
          name="fullName"
          value={data.fullName || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={data.email || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-1">Jenis Kelamin *</label>
        <Select
          name="gender"
          value={getSelectValue('gender', genderOptions)}
          onChange={(selected) => handleSelectChange('gender', selected)}
          options={genderOptions}
          isSearchable={false}
          styles={selectStyles}
          menuPortalTarget={document.body}
        />
      </div>

      {/* Nationality */}
      <div>
        <label className="block mb-1">Kewarganegaraan *</label>
        <Select
          name="nationality"
          value={getSelectValue('nationality', countries)}
          onChange={(selected) => handleSelectChange('nationality', selected)}
          options={countries}
          styles={selectStyles}
          isSearchable={true}
          menuPortalTarget={document.body}
          placeholder="Select country..."
        />
      </div>

      {/* Conditional Fields */}
      {
        country ? (
          <>
            {country.toLowerCase() === 'indonesia' ? (
              <IdentificationSection
                data={data}
                setData={(newData) =>
                  setData({
                    ...data,
                    ...newData,
                  })
                }
              />
            ) : (
              <div>
                <label className="block mb-1">Nomor Paspor *</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={data.passportNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            )}
          </>
        ) : null
      }
      {/* {!isIndonesian && data.nationality?.trim().length > 2 && (
        <div>
          <label className="block mb-1">Nomor Paspor *</label>
          <input
            type="text"
            name="passportNumber"
            value={data.passportNumber || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {isIndonesian && (
        <IdentificationSection
          data={data}
          setData={(newData) =>
            setData({
              ...data,
              ...newData,
            })
          }
        />
      )} */}

      {/* Birthplace */}
      <div>
        <label className="block mb-1">Tempat Lahir *</label>
        <input
          type="text"
          name="birthPlace"
          value={data.birthPlace || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Birthdate */}
      <div>
        <label className="block mb-1">Tanggal Lahir *</label>
        <input
          type="date"
          name="birthDate"
          value={data.birthDate || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Blood Type */}
      <div>
        <label className="block mb-1">Golongan Darah *</label>
        <Select
          name="bloodType"
          value={getSelectValue('bloodType', bloodTypeOptions)}
          onChange={(selected) => handleSelectChange('bloodType', selected)}
          options={bloodTypeOptions}
          isSearchable={false}
          styles={selectStyles}
          menuPortalTarget={document.body}
        />
      </div>

      {/* Address */}
      <div>
        <label className="block mb-1">Alamat Tempat Tinggal *</label>
        <input
          type="text"
          name="address"
          value={data.address || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Religion */}
      <div>
        <label className="block mb-1">Agama *</label>
        <Select
          name="religion"
          value={getSelectValue('religion', religionOptions)}
          onChange={(selected) => handleSelectChange('religion', selected)}
          options={religionOptions}
          isSearchable={false}
          styles={selectStyles}
          menuPortalTarget={document.body}
        />
      </div>

      {/* Phone Numbers */}
      <div>
        <label className="block mb-1">Nomor Telepon *</label>
        <input
          type="text"
          name="phoneNumber"
          value={data.phoneNumber || ''}
          onChange={handleInputChange}
          inputMode="numeric"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1">Telepon Rumah</label>
        <input
          type="text"
          name="homePhoneNumber"
          value={data.homePhoneNumber || ''}
          onChange={handleInputChange}
          inputMode="numeric"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Uploads */}
      <div>
        <label className="block mb-1">Upload Foto (required)</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleInputChange}
          className="block w-full text-sm text-gray-500"
        />
      </div>

      <div>
        <label className="block mb-1">Upload CV / Resume</label>
        <input
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={handleInputChange}
          className="block w-full text-sm text-gray-500"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
