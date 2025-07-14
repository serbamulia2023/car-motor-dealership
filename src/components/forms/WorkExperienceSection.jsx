import React from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { FiMinus } from "react-icons/fi";

const inputClass = "w-full border rounded px-2 py-1";

export default function WorkExperienceSection() {
  const { control, watch, setValue } = useFormContext();
  const { fields: workFields, append: addWork, remove: removeWork } = useFieldArray({ control, name: "workExperience" });
  const { fields: businessFields, append: addBusiness, remove: removeBusiness } = useFieldArray({ control, name: "businesses" });

  const hasBusiness = watch("hasBusiness");

  return (
    <div className="space-y-6">
      {/* Pengalaman Kerja */}
      <h3 className="font-bold text-lg">Pengalaman Kerja</h3>
      {workFields.length === 0 && <p className="text-sm text-gray-500">Belum ada pengalaman kerja ditambahkan.</p>}
      {workFields.map((item, index) => (
        <div key={item.id} className="relative border border-gray-300 rounded-lg p-4 grid grid-cols-2 gap-4">
          <button type="button" onClick={() => removeWork(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
            <FiMinus size={18} />
          </button>

          <Controller
            name={`workExperience.${index}.dari`}
            control={control}
            render={({ field }) => (
              <div>
                <label>Dari</label>
                <input type="date" {...field} className={inputClass} />
              </div>
            )}
          />

          <div>
            <label>Sampai</label>
            <Controller
              name={`workExperience.${index}.sampai`}
              control={control}
              render={({ field }) => (
                <input type="date" {...field} className={inputClass} disabled={watch(`workExperience.${index}.masih_bekerja`)} />
              )}
            />
            <div className="mt-1">
              <label className="inline-flex items-center">
                <Controller
                  name={`workExperience.${index}.masih_bekerja`}
                  control={control}
                  render={({ field }) => <input type="checkbox" {...field} className="mr-2" checked={field.value || false} />}
                />
                Masih bekerja di sini
              </label>
            </div>
          </div>

          {[
            "nama_perusahaan",
            "jenis_usaha",
            "jabatan_awal",
            "jabatan_akhir",
            "deskripsi_pekerjaan",
            "jumlah_karyawan",
            "alasan_berhenti",
            "atasan_langsung",
            "nama_direktur",
          ].map((fieldName) => (
            <Controller
              key={fieldName}
              name={`workExperience.${index}.${fieldName}`}
              control={control}
              render={({ field }) => (
                <div className={["deskripsi_pekerjaan"].includes(fieldName) ? "col-span-2" : ""}>
                  <label>{fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
                  {["deskripsi_pekerjaan"].includes(fieldName) ? (
                    <textarea {...field} className={inputClass} />
                  ) : (
                    <input type="text" {...field} className={inputClass} />
                  )}
                </div>
              )}
            />
          ))}
        </div>
      ))}
      <button type="button" onClick={() => addWork({})} className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
        <span className="text-xl font-bold">＋</span> Tambah Pengalaman Kerja
      </button>

      {/* Usaha Sendiri */}
      <div className="mt-10">
        <label className="block font-semibold mb-2">Apakah Anda Mempunyai Usaha Sendiri?</label>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input type="radio" name="hasBusiness" value="yes" checked={hasBusiness === true} onChange={() => setValue("hasBusiness", true)} className="mr-2" />
            Ya
          </label>
          <label className="inline-flex items-center">
            <input type="radio" name="hasBusiness" value="no" checked={hasBusiness === false} onChange={() => setValue("hasBusiness", false)} className="mr-2" />
            Tidak
          </label>
        </div>
      </div>

      {hasBusiness && (
        <div className="space-y-6 mt-6">
          <h4 className="font-semibold text-md">Usaha Sendiri</h4>
          {businessFields.map((item, index) => (
            <div key={item.id} className="relative border border-gray-300 rounded-lg p-4 grid grid-cols-2 gap-4">
              {businessFields.length > 1 && (
                <button type="button" onClick={() => removeBusiness(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <FiMinus size={18} />
                </button>
              )}
              {[
                "nama_perusahaan",
                "alamat",
                "no_telp",
                "tahun_berdiri",
                "status_kepemilikan",
                "jenis_usaha",
                "jumlah_karyawan",
                "pendapatan_bulanan",
              ].map((fieldName) => (
                <Controller
                  key={fieldName}
                  name={`businesses.${index}.${fieldName}`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <label>{fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
                      <input type="text" {...field} className={inputClass} />
                    </div>
                  )}
                />
              ))}
            </div>
          ))}
          <button type="button" onClick={() => addBusiness({})} className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
            <span className="text-xl font-bold">＋</span> Tambah Usaha Sendiri
          </button>
        </div>
      )}
    </div>
  );
}
