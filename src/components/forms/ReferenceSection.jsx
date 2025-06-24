import React, { useState, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const ReferenceSection = ({ data = {}, setData }) => {
  const maxReferences = 3;
  const [references, setReferences] = useState(data.references || []);
  const [emergencyContacts, setEmergencyContacts] = useState(data.emergencyContacts || []);

  useEffect(() => {
    setData({ ...data, references, emergencyContacts });
  }, [references, emergencyContacts]);

  const handleChange = (type, index, field, value) => {
    const updated = [...(type === 'references' ? references : emergencyContacts)];
    updated[index][field] = value;
    type === 'references' ? setReferences(updated) : setEmergencyContacts(updated);
  };

  const addEntry = (type) => {
    const setter = type === 'references' ? setReferences : setEmergencyContacts;
    const current = type === 'references' ? references : emergencyContacts;
    if (type === 'references' && current.length >= maxReferences) return;

    const baseEntry = {
      name: '',
      address: '',
      phone: '',
      relationship: '',
    };

    if (type === 'references') {
      setter([...current, { ...baseEntry, position: '' }]);
    } else {
      setter([...current, baseEntry]);
    }
  };

  const removeEntry = (type, index) => {
    const updated = (type === 'references' ? references : emergencyContacts).filter((_, i) => i !== index);
    type === 'references' ? setReferences(updated) : setEmergencyContacts(updated);
  };

  const renderFields = (entry, index, type) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-300 p-4 rounded-md bg-white relative">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
          type="text"
          value={entry.name}
          onChange={(e) => handleChange(type, index, 'name', e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Alamat</label>
        <input
          type="text"
          value={entry.address || ''}
          onChange={(e) => handleChange(type, index, 'address', e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
        <input
          type="text"
          value={entry.phone || ''}
          onChange={(e) => handleChange(type, index, 'phone', e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hubungan</label>
        <input
          type="text"
          value={entry.relationship}
          onChange={(e) => handleChange(type, index, 'relationship', e.target.value)}
          className="w-full px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      {type === 'references' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Jabatan</label>
          <input
            type="text"
            value={entry.position}
            onChange={(e) => handleChange(type, index, 'position', e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        </div>
      )}
      <button
        type="button"
        onClick={() => removeEntry(type, index)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <FiMinus />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 px-4 pt-0">
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-gray-800">Referensi</h3>
        <p className="text-sm text-gray-600">
          Mohon isi data referensi Anda. Maksimal 3 orang referensi. (Opsional, bukan keluarga)
        </p>
        {references.map((entry, index) => renderFields(entry, index, 'references'))}
        {references.length < maxReferences && (
          <button
            type="button"
            onClick={() => addEntry('references')}
            className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
          >
            <FiPlus className="text-base" /> Tambah Referensi
          </button>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-md font-semibold text-gray-800">Orang yang dapat dihubungi dalam keadaan darurat</h3>
        <p className="text-sm text-gray-600">
          Mohon isi data berikut secara lengkap (Wajib diisi)
        </p>
        {emergencyContacts.map((entry, index) => renderFields(entry, index, 'emergencyContacts'))}
        <button
          type="button"
          onClick={() => addEntry('emergencyContacts')}
          className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
        >
          <FiPlus className="text-base" /> Tambah Kontak Darurat
        </button>
      </div>
    </div>
  );
};

export default ReferenceSection;
