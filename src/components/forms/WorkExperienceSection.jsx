import React from 'react';

const WorkExperienceSection = ({ experiences = [], setExperiences }) => {
  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: '',
        roleStart: '',
        roleEnd: '',
        supervisor: '',
        director: '',
        description: '',
      },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengalaman Kerja</h3>
      {experiences.map((exp, index) => (
        <div key={index} className="border rounded-md p-4 mb-4 space-y-3">
          <div>
            <label className="block font-medium text-gray-700">Nama Perusahaan</label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleChange(index, 'company', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Contoh: PT ABC"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Jabatan Awal</label>
              <input
                type="text"
                value={exp.roleStart}
                onChange={(e) => handleChange(index, 'roleStart', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Jabatan Akhir</label>
              <input
                type="text"
                value={exp.roleEnd}
                onChange={(e) => handleChange(index, 'roleEnd', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Deskripsi Pekerjaan</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              placeholder="Tulis tanggung jawab utama atau proyek"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Atasan Langsung</label>
              <input
                type="text"
                value={exp.supervisor}
                onChange={(e) => handleChange(index, 'supervisor', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Nama Direktur</label>
              <input
                type="text"
                value={exp.director}
                onChange={(e) => handleChange(index, 'director', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-sm text-red-600 hover:underline mt-2"
            >
              Hapus Pengalaman
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="text-sm text-blue-600 hover:underline"
      >
        + Tambah Pengalaman Kerja
      </button>
    </div>
  );
};

export default WorkExperienceSection;
