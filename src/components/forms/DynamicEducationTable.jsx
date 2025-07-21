import React from 'react';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { FiMinus } from 'react-icons/fi';
import Select from 'react-select';

const levelOptions = ["Baik", "Sedang", "Kurang"].map((l) => ({ value: l, label: l }));
const inputClass = "border px-2 py-1 rounded text-sm w-full";

const defaultUniversity = { jenjang: "Universitas", sekolah: "", kota: "", jurusan: "", tahun_masuk: "", tahun_lulus: "" };
const defaultKursus = { bidang: "", penyelenggara: "", kota: "", lama: "", tahun: "", dibiayai_oleh: "", lulus: "" };
const defaultBahasa = { nama: "", bicara: "", menulis: "", membaca: "" };
const defaultKegiatan = { nama_organisasi: "", macam_kegiatan: "", tahun: "", jabatan: "" };

export default function DynamicEducationTable() {
  const { register, control } = useFormContext();

  const { fields: universityFields, append: appendUni, remove: removeUni } = useFieldArray({
    control,
    name: 'education.universities',
  });

  const { fields: kursusFields, append: appendKursus, remove: removeKursus } = useFieldArray({
    control,
    name: 'kursus',
  });

  const { fields: bahasaFields, append: appendBahasa, remove: removeBahasa } = useFieldArray({
    control,
    name: 'bahasa',
  });

  const { fields: kegiatanFields, append: appendKegiatan, remove: removeKegiatan } = useFieldArray({
    control,
    name: 'kegiatan',
  });

  const MinusButton = ({ onClick }) => (
    <button type="button" onClick={onClick} className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10">
      <FiMinus size={18} />
    </button>
  );

  return (
    <div className="space-y-10">
      {/* Base Education */}
      <div>
        <h3 className="font-semibold mb-2">Riwayat Pendidikan</h3>
        {["SD", "SMP", "SMA/SMK"].map((jenjang, idx) => (
          <div key={jenjang} className="border p-4 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-3 font-semibold">{jenjang}</div>
            <input className={inputClass} placeholder="Nama Sekolah" {...register(`education.base.${idx}.sekolah`)} />
            <input className={inputClass} placeholder="Kota" {...register(`education.base.${idx}.kota`)} />
            <input className={inputClass} placeholder="Jurusan" {...register(`education.base.${idx}.jurusan`)} />
            <input className={inputClass} placeholder="Tahun Masuk" {...register(`education.base.${idx}.tahun_masuk`)} />
            <input className={inputClass} placeholder="Tahun Lulus" {...register(`education.base.${idx}.tahun_lulus`)} />
            <input type="hidden" value={jenjang} {...register(`education.base.${idx}.jenjang`)} />
          </div>
        ))}

        {/* University Fields */}
        {universityFields.map((row, i) => (
          <div key={row.id} className="relative border p-4 pr-10 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-3 font-semibold">Universitas</div>
            <input className={inputClass} placeholder="Nama Universitas" {...register(`education.universities.${i}.sekolah`)} />
            <input className={inputClass} placeholder="Kota" {...register(`education.universities.${i}.kota`)} />
            <input className={inputClass} placeholder="Jurusan" {...register(`education.universities.${i}.jurusan`)} />
            <input className={inputClass} placeholder="Tahun Masuk" {...register(`education.universities.${i}.tahun_masuk`)} />
            <input className={inputClass} placeholder="Tahun Lulus" {...register(`education.universities.${i}.tahun_lulus`)} />
            <input type="hidden" value="Universitas" {...register(`education.universities.${i}.jenjang`)} />
            <MinusButton onClick={() => removeUni(i)} />
          </div>
        ))}
        <button type="button" onClick={() => appendUni(defaultUniversity)} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          + Tambah Universitas
        </button>
      </div>

      {/* Kursus */}
      <div>
        <h3 className="font-semibold mb-2">Kursus / Pelatihan</h3>
        {kursusFields.map((_, i) => (
          <div key={i} className="relative border p-4 pr-10 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(defaultKursus).map((f) => (
              <input key={f} className={inputClass} placeholder={f.replace(/_/g, ' ')} {...register(`kursus.${i}.${f}`)} />
            ))}
            <MinusButton onClick={() => removeKursus(i)} />
          </div>
        ))}
        <button type="button" onClick={() => appendKursus(defaultKursus)} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          + Tambah Kursus
        </button>
      </div>

      {/* Bahasa */}
      <div>
        <h3 className="font-semibold mb-2">Bahasa</h3>
        {bahasaFields.map((row, i) => (
          <div key={row.id} className="relative border p-4 pr-10 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <input className={inputClass} placeholder="Bahasa" {...register(`bahasa.${i}.nama`)} />
            {["bicara", "menulis", "membaca"].map((field) => (
              <Controller
                key={field}
                control={control}
                name={`bahasa.${i}.${field}`}
                render={({ field: rhfField }) => (
                  <Select
                    {...rhfField}
                    options={levelOptions}
                    placeholder={`Kemampuan ${field}`}
                    value={levelOptions.find((opt) => opt.value === rhfField.value) || null}
                    onChange={(opt) => rhfField.onChange(opt?.value || "")}
                  />
                )}
              />
            ))}
            <MinusButton onClick={() => removeBahasa(i)} />
          </div>
        ))}
        <button type="button" onClick={() => appendBahasa(defaultBahasa)} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          + Tambah Bahasa
        </button>
      </div>

      {/* Kegiatan Sosial */}
      <div>
        <h3 className="font-semibold mb-2">Kegiatan Sosial</h3>
        {kegiatanFields.map((_, i) => (
          <div key={i} className="relative border p-4 pr-10 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(defaultKegiatan).map((f) => (
              <input key={f} className={inputClass} placeholder={f.replace(/_/g, " ")} {...register(`kegiatan.${i}.${f}`)} />
            ))}
            <MinusButton onClick={() => removeKegiatan(i)} />
          </div>
        ))}
        <button type="button" onClick={() => appendKegiatan(defaultKegiatan)} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
          + Tambah Kegiatan Sosial
        </button>
      </div>
    </div>
  );
}
