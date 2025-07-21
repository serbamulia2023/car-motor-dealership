import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FiMinus } from 'react-icons/fi';

export default function LeisureSection() {
  const { control, watch, setValue } = useFormContext();

  const topikDibaca = watch('leisure.topik_dibaca') || [];

  const handleAddTopik = () => {
    if (topikDibaca.length < 3) {
      setValue('leisure.topik_dibaca', [...topikDibaca, '']);
    }
  };

  const handleRemoveTopik = (index) => {
    const updated = [...topikDibaca];
    updated.splice(index, 1);
    setValue('leisure.topik_dibaca', updated);
  };

  return (
    <div className="space-y-8 px-4 py-6">
      {/* Hobi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hobi dan Kegiatan Di Waktu Luang <span className="text-gray-400">(Opsional)</span>
        </label>
        <Controller
          name="leisure.hobi"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              value={field.value ?? ''}
              rows={3}
              placeholder="Contoh: Membaca buku, bersepeda, menulis jurnal..."
              className="w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-3 py-2 text-sm"
            />
          )}
        />
      </div>

      {/* Frekuensi Membaca */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Frekuensi Membaca</label>
        <Controller
          name="leisure.frekuensi_membaca"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-4">
              {['Banyak', 'Sedang', 'Kurang'].map((val) => (
                <label key={val} className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    className="text-blue-600"
                    value={val}
                    checked={field.value === val}
                    onChange={() => field.onChange(val)}
                  />
                  {val}
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* Topik Dibaca */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Topik yang Dibaca <span className="text-gray-400">(Maksimal 3)</span>
        </label>
        <div className="space-y-3">
          {topikDibaca.map((topic, idx) => (
            <Controller
              key={idx}
              name={`leisure.topik_dibaca.${idx}`}
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    placeholder={`Topik ${idx + 1}`}
                    className="w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 rounded-lg text-sm pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveTopik(idx)}
                    aria-label="Remove topic"
                  >
                    <FiMinus />
                  </button>
                </div>
              )}
            />
          ))}
        </div>
        {topikDibaca.length < 3 && (
          <button
            type="button"
            onClick={handleAddTopik}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            + Tambah Topik
          </button>
        )}
      </div>

      {/* Jenis Bacaan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bacaan yang Anda Baca <span className="text-gray-400">(Pilih Satu)</span>
        </label>
       <Controller
          control={control}
          name="leisure.jenis_bacaan"
          render={({ field }) => (
            <div className="flex flex-wrap gap-4">
              {['Koran', 'Majalah'].map((val) => (
                <label key={val} className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
                    value={val.toLowerCase()}
                    checked={field.value === val.toLowerCase()}
                    onChange={() => field.onChange(val.toLowerCase())}
                    className="text-blue-600"
                  />
                  {val}
                </label>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
