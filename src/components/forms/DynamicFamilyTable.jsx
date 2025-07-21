import React, { useEffect, useRef, useState } from 'react';
import { useFormContext, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { FiMinus } from 'react-icons/fi';
import Select from 'react-select';

const genderOptions = [
  { value: 'Laki-laki', label: 'Laki-laki' },
  { value: 'Perempuan', label: 'Perempuan' },
];

const defaultRow = (hubungan) => ({
  hubungan,
  nama: '',
  gender: '',
  usia: '',
  pendidikan: '',
  pekerjaan: '',
  no_hp: '',
  keterangan: hubungan === 'Anak' || hubungan === 'Saudara' ? '' : hubungan,
});

const defaultPartnerWork = {
  nama_perusahaan: '',
  alamat: '',
  telepon: '',
  jenis_usaha: '',
  jabatan: '',
  masa_kerja: '',
};

export default function DynamicFamilyTable() {
  const { control, register } = useFormContext();
  const rawMaritalStatus = useWatch({ name: 'personalInfo.marital_status', control });
  const maritalStatus = (rawMaritalStatus || 'Belum Kawin').toLowerCase();
  const initializedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const {
    fields: familyFields,
    append: appendFamily,
    remove: removeFamily,
    replace: replaceFamily,
  } = useFieldArray({
    control,
    name: 'family.rows',
  });

  const {
    fields: partnerFields,
    append: appendPartner,
    remove: removePartner,
  } = useFieldArray({
    control,
    name: 'family.partnerWork',
  });

  useEffect(() => {
    if (initializedRef.current) return;

    const hubunganMap = new Map();
    familyFields.forEach((f) => {
      if (!hubunganMap.has(f.hubungan)) hubunganMap.set(f.hubungan, f);
    });

    const nextRows = [];
    nextRows.push(hubunganMap.get('Ayah') || defaultRow('Ayah'));
    nextRows.push(hubunganMap.get('Ibu') || defaultRow('Ibu'));

    if (maritalStatus === 'kawin') {
      nextRows.push(hubunganMap.get('Suami/Istri') || defaultRow('Suami/Istri'));
    }

    const remaining = familyFields.filter((f) => !['Ayah', 'Ibu', 'Suami/Istri'].includes(f.hubungan));
    replaceFamily([...nextRows, ...remaining]);

    initializedRef.current = true;
    setIsReady(true);
  }, [familyFields, maritalStatus, replaceFamily]);

  useEffect(() => {
    if (!initializedRef.current) return;

    const hasSpouse = familyFields.some((f) => f.hubungan === 'Suami/Istri');

    if (maritalStatus === 'kawin' && !hasSpouse) {
      appendFamily(defaultRow('Suami/Istri'));
    }

    if (maritalStatus !== 'kawin') {
      const spouseIndexes = familyFields
        .map((f, i) => (f.hubungan === 'Suami/Istri' ? i : null))
        .filter((i) => i !== null);
      spouseIndexes.forEach((i) => removeFamily(i));
    }
  }, [maritalStatus, familyFields, appendFamily, removeFamily]);

  const inputClass = 'w-full px-2 py-1 border rounded text-sm';

  const renderFamilyRow = (field, index) => (
    <div key={field.id || `${field.hubungan}-${index}`} className="relative border p-4 mb-4 rounded-md pr-10">
      <div className="text-sm font-bold mb-2">{field.hubungan}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <input {...register(`family.rows.${index}.nama`)} className={inputClass} placeholder="Nama" />
        <Controller
          control={control}
          name={`family.rows.${index}.gender`}
          render={({ field }) => (
            <Select
              {...field}
              options={genderOptions}
              placeholder="Jenis Kelamin"
              className="text-sm"
              classNamePrefix="react-select"
              onChange={(val) => field.onChange(val?.value || '')}
              value={genderOptions.find((opt) => opt.value === field.value) ?? ''}
            />
          )}
        />
        <input
          {...register(`family.rows.${index}.usia`, {
            setValueAs: (v) => (v === '' ? null : parseInt(v, 10)),
          })}
          className={inputClass}
          placeholder="Usia"
        />
        <input {...register(`family.rows.${index}.pendidikan`)} className={inputClass} placeholder="Pendidikan" />
        <input {...register(`family.rows.${index}.pekerjaan`)} className={inputClass} placeholder="Pekerjaan" />
        <input {...register(`family.rows.${index}.no_hp`)} className={inputClass} placeholder="No. Telp/HP" />
        <input {...register(`family.rows.${index}.keterangan`)} className={inputClass} placeholder="Keterangan" />
      </div>
      {!['Ayah', 'Ibu', 'Suami/Istri'].includes(field.hubungan) && (
        <button
          type="button"
          onClick={() => removeFamily(index)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <FiMinus size={18} />
        </button>
      )}
    </div>
  );

  if (!isReady) return null;

  return (
    <div className="space-y-6">
      {/* Ayah / Ibu / Saudara */}
      <div>
        <h3 className="font-semibold mb-2">Ayah, Ibu, dan Saudara</h3>
        {familyFields.map((f, i) => ['Ayah', 'Ibu', 'Saudara'].includes(f.hubungan) && renderFamilyRow(f, i))}
        <button
          type="button"
          onClick={() => appendFamily(defaultRow('Saudara'))}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          + Tambah Saudara
        </button>
      </div>

      {/* Suami/Istri */}
      {familyFields.some((f) => f.hubungan === 'Suami/Istri') && (
        <div>
          <h3 className="font-semibold mb-2">Suami/Istri</h3>
          {familyFields.map((f, i) => f.hubungan === 'Suami/Istri' && renderFamilyRow(f, i))}

          <div className="bg-blue-50 p-4 rounded space-y-4 mt-4">
            <h4 className="font-semibold">Pekerjaan Pasangan (opsional)</h4>
            {partnerFields.map((field, i) => (
              <div key={field.id} className="relative border p-4 rounded-md pr-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(defaultPartnerWork).map((key) => (
                    <input
                      key={key}
                      {...register(`family.partnerWork.${i}.${key}`)}
                      className={inputClass}
                      placeholder={key.replace(/_/g, ' ')}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => removePartner(i)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FiMinus size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendPartner({ ...defaultPartnerWork })}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              + Tambah Pekerjaan
            </button>
          </div>
        </div>
      )}

      {/* Anak */}
      {['kawin', 'cerai'].includes(maritalStatus) && (
        <div>
          <h3 className="font-semibold mb-2">Anak</h3>
          {familyFields.map((f, i) => f.hubungan === 'Anak' && renderFamilyRow(f, i))}
          <button
            type="button"
            onClick={() => appendFamily(defaultRow('Anak'))}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            + Tambah Anak
          </button>
        </div>
      )}
    </div>
  );
}
