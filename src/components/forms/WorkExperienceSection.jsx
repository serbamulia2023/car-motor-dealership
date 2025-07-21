import React from "react";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { FiMinus } from "react-icons/fi";

const inputClass = "w-full border rounded px-2 py-1";

export default function WorkExperienceSection() {
  const { control, watch } = useFormContext();

  const {
    fields: workExperience,
    append: addWork,
    remove: removeWork,
  } = useFieldArray({ control, name: "workExperience" });

  const {
    fields: businessFields,
    append: addBusiness,
    remove: removeBusiness,
  } = useFieldArray({ control, name: "businesses" });

  const hasBusiness = watch("personalInfo.hasBusiness");

  return (
    <div className="space-y-8">
      {/* 🔹 Pengalaman Kerja */}
      <div>
        <h3 className="font-bold text-lg mb-2">Pengalaman Kerja</h3>
        {workExperience.length === 0 && (
          <p className="text-sm text-gray-500">Belum ada pengalaman kerja ditambahkan.</p>
        )}
        {workExperience.map((item, index) => (
          <div key={item.id} className="relative border border-gray-300 rounded-lg p-4 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => removeWork(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FiMinus size={18} />
            </button>

            <Controller
              name={`workExperience.${index}.dari`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium">Dari</label>
                  <input type="date" {...field} value={field.value ?? ""} className={inputClass} />
                </div>
              )}
            />

            <div>
              <label className="block text-sm font-medium">Sampai</label>
              <Controller
                name={`workExperience.${index}.sampai`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    value={field.value ?? ""}
                    className={inputClass}
                    disabled={watch(`workExperience.${index}.masih_bekerja`)}
                  />
                )}
              />
              <div className="mt-2">
                <Controller
                  name={`workExperience.${index}.masih_bekerja`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value = false, ...field } }) => (
                    <label className="inline-flex items-center text-sm">
                      <input
                        type="checkbox"
                        {...field}
                        checked={value}
                        className="mr-2"
                      />
                      Masih bekerja di sini
                    </label>
                  )}
                />
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
                defaultValue=""
                render={({ field }) => (
                  <div className={fieldName === "deskripsi_pekerjaan" ? "col-span-2" : ""}>
                    <label className="block text-sm font-medium">
                      {fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </label>
                    {fieldName === "deskripsi_pekerjaan" ? (
                      <textarea {...field} value={field.value ?? ""} className={`${inputClass} min-h-[100px]`} />
                    ) : (
                      <input type="text" {...field} value={field.value ?? ""} className={inputClass} />
                    )}
                  </div>
                )}
              />
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addWork({})}
          className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm mt-2"
        >
          <span className="text-xl font-bold">＋</span> Tambah Pengalaman Kerja
        </button>
      </div>

      {/* 🔹 Usaha Sendiri */}
      <div>
        <label className="block font-semibold mb-2">
          Apakah Anda Mempunyai Usaha Sendiri?
        </label>

        <Controller
          name="personalInfo.hasBusiness"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="flex gap-6 mb-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={field.value === true}
                  onChange={() => field.onChange(true)}
                  className="mr-2"
                />
                Ya
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={field.value === false}
                  onChange={() => field.onChange(false)}
                  className="mr-2"
                />
                Tidak
              </label>
            </div>
          )}
        />

        {hasBusiness === true && (
          <div className="space-y-6 mt-4">
            <h4 className="font-semibold text-md">Usaha Sendiri</h4>
            {businessFields.map((item, index) => (
              <div
                key={item.id}
                className="relative border border-gray-300 rounded-lg p-4 grid grid-cols-2 gap-4"
              >
                {businessFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBusiness(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
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
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <label className="block text-sm font-medium">
                          {fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </label>
                        <input type="text" {...field} value={field.value ?? ""} className={inputClass} />
                      </div>
                    )}
                  />
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addBusiness({})}
              className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              <span className="text-xl font-bold">＋</span> Tambah Usaha Sendiri
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
