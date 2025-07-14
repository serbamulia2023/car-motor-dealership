import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FiPlus, FiMinus } from 'react-icons/fi';

export default function ReferenceSection() {
  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

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

  const maxReferences = 3;

  const inputClass = 'w-full px-2 py-1 border border-gray-300 rounded-md text-sm';

  const renderReferenceFields = (entry, index) => (
    <div key={entry.id} className="relative grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-300 p-4 rounded-md bg-white pr-10">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input {...register(`referensi.references.${index}.name`)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Perusahaan</label>
        <input {...register(`referensi.references.${index}.perusahaan_or_alamat`)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">No Telepon</label>
        <input {...register(`referensi.references.${index}.phone`)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hubungan</label>
        <input {...register(`referensi.references.${index}.relationship`)} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Jabatan</label>
        <input {...register(`referensi.references.${index}.position`)} className={inputClass} />
      </div>
      <input type="hidden" value="referrer" {...register(`referensi.references.${index}.tipe`)} />
      <button
        type="button"
        onClick={() => removeReference(index)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
      >
        <FiMinus size={18} />
      </button>
    </div>
  );

  const renderEmergencyFields = (entry, index) => (
    <div key={entry.id} className="relative grid grid-cols-1 md:grid-cols-3 gap-3 border border-gray-300 p-4 rounded-md bg-white pr-10">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input {...register(`referensi.emergencyContacts.${index}.name`, { required: true })} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Alamat</label>
        <input {...register(`referensi.emergencyContacts.${index}.perusahaan_or_alamat`, { required: true })} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">No Telepon</label>
        <input {...register(`referensi.emergencyContacts.${index}.phone`, { required: true })} className={inputClass} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Hubungan</label>
        <input {...register(`referensi.emergencyContacts.${index}.relationship`, { required: true })} className={inputClass} />
      </div>
      <input type="hidden" value="emergency" {...register(`referensi.emergencyContacts.${index}.tipe`)} />
      <button
        type="button"
        onClick={() => removeEmergency(index)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
      >
        <FiMinus size={18} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 px-4">
      {/* Reference Section */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-gray-800">Referensi</h3>
        <p className="text-sm text-gray-600">Mohon isi data referensi Anda. Maksimal 3 orang. (Opsional, bukan keluarga)</p>
        {references.map(renderReferenceFields)}
        {references.length < maxReferences && (
          <button
            type="button"
            onClick={() =>
              appendReference({
                name: '',
                perusahaan_or_alamat: '',
                phone: '',
                relationship: '',
                position: '',
                tipe: 'referrer',
              })
            }
            className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
          >
            <FiPlus /> Tambah Referensi
          </button>
        )}
      </div>

      {/* Emergency Section */}
      <div className="space-y-3">
        <h3 className="text-md font-semibold text-gray-800">Kontak Darurat</h3>
        <p className="text-sm text-gray-600">Mohon isi data berikut secara lengkap (Wajib diisi)</p>
        {emergencyContacts.map(renderEmergencyFields)}
        <button
          type="button"
          onClick={() =>
            appendEmergency({
              name: '',
              perusahaan_or_alamat: '',
              phone: '',
              relationship: '',
              tipe: 'emergency',
            })
          }
          className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
        >
          <FiPlus /> Tambah Kontak Darurat
        </button>
      </div>
    </div>
  );
}
