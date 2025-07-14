import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import dropdown from '@dropdowns/countries';
import IdentificationSection from './IdentificationSection';

const genderOptions = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const bloodTypeOptions = ['A', 'B', 'AB', 'O', 'NA'].map((t) => ({ value: t, label: t }));
const religionOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Lainnya'].map((r) => ({
  value: r,
  label: r,
}));
const maritalOptions = [
  { value: 'Belum Kawin', label: 'Belum Kawin' },
  { value: 'Kawin', label: 'Kawin' },
  { value: 'Cerai', label: 'Cerai' },
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
    position: 'absolute',
  }),
};

const PersonalInfoSection = () => {
  const { control, watch, register, setValue } = useFormContext();
  const [countries, setCountries] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050';

  useEffect(() => {
    const countryOptions = dropdown.getAllCountries().map((c) => ({
      value: c.name,
      label: c.name,
    }));
    setCountries(countryOptions);
  }, []);

  const watchFields = watch('personalInfo') || {};
  const nationality = watchFields.nationality;

  const getFileUrl = (filePath) =>
    filePath?.startsWith('http') ? filePath : `${backendUrl}/${filePath.replace(/^\/+/g, '')}`;

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">Informasi Pribadi</h3>

      {/* === Text Inputs (snake_case) === */}
      {[
        { name: 'full_name', label: 'Nama Lengkap', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'birth_place', label: 'Tempat Lahir', type: 'text' },
        { name: 'birth_date', label: 'Tanggal Lahir', type: 'date' },
        { name: 'address', label: 'Alamat Tempat Tinggal', type: 'text' },
        { name: 'phone', label: 'Nomor Telepon', type: 'text' },
        { name: 'telepon_rumah', label: 'Telepon Rumah', type: 'text' },
      ].map(({ name, label, type }) => (
        <div key={name}>
          <label className="block mb-1">
            {label} <span className="text-red-500">*</span>
          </label>
          <input
            type={type}
            {...register(`personalInfo.${name}`)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}

      {/* === Select Inputs (snake_case) === */}
      {[
        { name: 'gender', label: 'Jenis Kelamin', options: genderOptions },
        { name: 'marital_status', label: 'Status Pernikahan', options: maritalOptions },
        { name: 'nationality', label: 'Kewarganegaraan', options: countries },
        { name: 'blood_type', label: 'Golongan Darah', options: bloodTypeOptions },
        { name: 'religion', label: 'Agama', options: religionOptions },
      ].map(({ name, label, options }) => (
        <div key={name}>
          <label className="block mb-1">
            {label} <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name={`personalInfo.${name}`}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                styles={selectStyles}
                value={options.find((opt) => opt.value === field.value)}
                onChange={(val) => field.onChange(val?.value || '')}
              />
            )}
          />
        </div>
      ))}

      {/* === Conditional Identification Section === */}
      {nationality?.toLowerCase() === 'indonesia' ? (
        <IdentificationSection />
      ) : nationality ? (
        <div>
          <label className="block mb-1">
            Nomor Paspor <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('personalInfo.passport_number')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      ) : null}

      {/* === File Uploads (photo, cv) === */}
      {[
        { name: 'photo', label: 'Upload Foto', accept: 'image/*' },
        { name: 'cv', label: 'Upload CV / Resume', accept: '.pdf,.doc,.docx' },
      ].map(({ name, label, accept }) => (
        <div key={name}>
          <label className="block mb-1">{label}</label>
          {watchFields[name] && typeof watchFields[name] === 'string' && (
            <div className="mb-2">
              <a
                href={getFileUrl(watchFields[name])}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                {watchFields[name].split('/').pop()}
              </a>
            </div>
          )}
          <input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files[0];
              setValue(`personalInfo.${name}`, file || watchFields[name]);
            }}
            className="block w-full text-sm text-gray-500"
          />
        </div>
      ))}
    </div>
  );
};

export default PersonalInfoSection;
