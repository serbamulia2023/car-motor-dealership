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
    <div className="space-y-8 px-4">
      {/* Hobi */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hobi dan Kegiatan Di Waktu Luang (Opsional)
        </label>
        <Controller
          name="leisure.hobi"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              rows={3}
              placeholder="Contoh: Membaca buku, bersepeda, menulis jurnal..."
              className="w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg px-3 py-2 text-sm"
            />
          )}
        />
      </div>

      {/* Frekuensi Membaca */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Frekuensi Membaca</label>
        <Controller
          name="leisure.frekuensi_membaca"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-4">
              {['Banyak', 'Sedang', 'Kurang'].map((val) => (
                <label key={val} className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Topik yang Dibaca (Maksimal 3)
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
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
          >
            + Tambah Topik
          </button>
        )}
      </div>

      {/* Bacaan Dibaca */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bacaan yang Anda Baca (Pilih Satu)
        </label>
        <Controller
          name="leisure.bacaan_dibaca"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-4">
              {['Koran', 'Majalah'].map((val) => (
                <label key={val} className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="radio"
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
    </div>
  );
}
