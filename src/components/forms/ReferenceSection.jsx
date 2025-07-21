import React, { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { FiPlus, FiMinus } from 'react-icons/fi';

export default function ReferenceSection() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // FieldArrays for both references and emergency contacts
  const {
    fields: references,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({ control, name: 'referensi.references' });

  const {
    fields: emergencyContacts,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({ control, name: 'referensi.emergencyContacts' });

  const inputClass = 'w-full px-2 py-1 border border-gray-300 rounded-md text-sm';
  const maxReferences = 3;

  // Ensure tipe field is present after reset()
  useEffect(() => {
    references.forEach((ref, i) =>
      setValue(`referensi.references.${i}.tipe`, 'referrer', { shouldValidate: true })
    );
    emergencyContacts.forEach((ref, i) =>
      setValue(`referensi.emergencyContacts.${i}.tipe`, 'emergency', { shouldValidate: true })
    );
  }, [references.length, emergencyContacts.length]);

  const renderEntry = (entry, index, type) => {
    const baseName = `referensi.${type}.${index}`;
    const removeFn = type === 'references' ? removeReference : removeEmergency;

    return (
      <div
        key={entry.id}
        className="relative grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-300 p-4 rounded-md bg-white pr-10"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input {...register(`${baseName}.nama`)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Perusahaan / Alamat</label>
          <input {...register(`${baseName}.perusahaan_or_alamat`)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">No Telepon</label>
          <input {...register(`${baseName}.no_hp`)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hubungan</label>
          <input {...register(`${baseName}.hubungan`)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jabatan</label>
          <input {...register(`${baseName}.jabatan`)} className={inputClass} />
        </div>
        <input type="hidden" {...register(`${baseName}.tipe`)} value={type === 'references' ? 'referrer' : 'emergency'} />
        <button
          type="button"
          onClick={() => removeFn(index)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
        >
          <FiMinus size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8 px-4">
      {/* Reference */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-gray-800">Referensi</h3>
        <p className="text-sm text-gray-600">
          Mohon isi data referensi Anda. Maksimal 3 orang. (Opsional, bukan keluarga)
        </p>
        {references.map((entry, idx) => renderEntry(entry, idx, 'references'))}
        {references.length < maxReferences && (
          <button
            type="button"
            onClick={() =>
              appendReference({
                nama: '',
                perusahaan_or_alamat: '',
                no_hp: '',
                hubungan: '',
                jabatan: '',
                tipe: 'referrer',
              })
            }
            className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
          >
            <FiPlus /> Tambah Referensi
          </button>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-gray-800">Kontak Darurat</h3>
        <p className="text-sm text-gray-600">
          Wajib diisi. Kontak darurat seperti anggota keluarga atau orang terdekat.
        </p>
        {emergencyContacts.map((entry, idx) => renderEntry(entry, idx, 'emergencyContacts'))}
        <button
          type="button"
          onClick={() =>
            appendEmergency({
              nama: '',
              perusahaan_or_alamat: '',
              no_hp: '',
              hubungan: '',
              jabatan: '',
              tipe: 'emergency',
            })
          }
          className="flex items-center gap-2 text-white font-semibold bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm"
        >
          <FiPlus /> Tambah Kontak Darurat
        </button>
      </div>
    </div>
  );
}
