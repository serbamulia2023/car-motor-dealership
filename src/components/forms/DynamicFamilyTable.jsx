import React, { useEffect, useState } from "react";
import Select from "react-select";

const genderOptions = [
  { value: "Laki-laki", label: "Laki-laki" },
  { value: "Perempuan", label: "Perempuan" },
];

const maritalStatusOptions = [
  { value: "Belum Menikah", label: "Belum Menikah" },
  { value: "Menikah", label: "Menikah" },
  { value: "Duda", label: "Duda" },
  { value: "Janda", label: "Janda" },
];

const defaultSpouseRow = {
  hubungan: "Suami/Istri",
  nama: "",
  gender: "",
  usia: "",
  pendidikan: "",
  pekerjaan: "",
  noHp: "",
  keterangan: "",
};

const defaultPartnerWork = {
  namaPerusahaan: "",
  alamat: "",
  telepon: "",
  jenisUsaha: "",
  jabatan: "",
  masaKerja: "",
};

const inputClass =
  "w-full px-2 py-[6px] border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm";

const DynamicFamilyTable = ({ data, setData }) => {
  const [status, setStatus] = useState(data.status || "");
  const [rows, setRows] = useState(
    data.rows || [
      {
        hubungan: "Ayah",
        nama: "",
        gender: "",
        usia: "",
        pendidikan: "",
        pekerjaan: "",
        noHp: "",
        keterangan: "",
      },
      {
        hubungan: "Ibu",
        nama: "",
        gender: "",
        usia: "",
        pendidikan: "",
        pekerjaan: "",
        noHp: "",
        keterangan: "",
      },
    ]
  );
  const [partnerRows, setPartnerRows] = useState(() => {
    if (["Menikah", "Duda", "Janda"].includes(data.status)) {
      const initial = [];
      if (data.status === "Menikah") initial.push(defaultSpouseRow);
      return [...initial];
    }
    return [];
  });
  const [partnerWork, setPartnerWork] = useState(data.partnerWork || defaultPartnerWork);

  // 1. Update partnerRows only when status changes
  useEffect(() => {
    let updated = [...partnerRows];

    if (status === "Menikah") {
      if (!updated.some((row) => row.hubungan === "Suami/Istri")) {
        updated = [defaultSpouseRow, ...updated.filter((r) => r.hubungan === "Anak")];
      }
    } else {
      updated = updated.filter((row) => row.hubungan === "Anak");
    }

    setPartnerRows(updated);
  }, [status]);

  // 2. Sync all data upwards only when relevant state changes
  useEffect(() => {
    setData({ status, rows, partnerRows, partnerWork });
  }, [status, rows, partnerRows, partnerWork, setData]);

  const handleRowChange = (index, field, value, isSpouse = false) => {
    const updated = isSpouse ? [...partnerRows] : [...rows];
    updated[index][field] = value;
    isSpouse ? setPartnerRows(updated) : setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        hubungan: "Saudara",
        nama: "",
        gender: "",
        usia: "",
        pendidikan: "",
        pekerjaan: "",
        noHp: "",
        keterangan: "",
      },
    ]);
  };

  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const addChild = () => {
    setPartnerRows([
      ...partnerRows,
      {
        hubungan: "Anak",
        nama: "",
        gender: "",
        usia: "",
        pendidikan: "",
        pekerjaan: "",
        noHp: "",
        keterangan: "",
      },
    ]);
  };

  const removeChild = (index) => {
    const updated = [...partnerRows];
    updated.splice(index, 1);
    setPartnerRows(updated);
  };

  const handleWorkChange = (field, value) => {
    setPartnerWork((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      {/* Marital Status */}
      <div>
        <label className="block font-medium mb-1">Status Perkawinan</label>
        <Select
          options={maritalStatusOptions}
          value={maritalStatusOptions.find((opt) => opt.value === status)}
          onChange={(e) => setStatus(e.value)}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      {/* Spouse & Child Section */}
      {["Menikah", "Duda", "Janda"].includes(status) && (
        <div className="space-y-2">
          <h3 className="font-semibold">Suami/Istri & Anak</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    "Hubungan",
                    "Nama",
                    "L/P",
                    "Usia",
                    "Pendidikan",
                    "Pekerjaan",
                    "No. Telp/HP",
                    "Keterangan",
                    "Aksi",
                  ].map((head) => (
                    <th key={head} className="p-2 border text-left">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partnerRows.map((row, index) => {
                  if (row.hubungan === "Suami/Istri" && status !== "Menikah") return null;

                  return (
                    <tr key={index}>
                      <td className="p-1 border">{row.hubungan}</td>
                      <td className="p-1 border">
                        <input
                          value={row.nama}
                          onChange={(e) =>
                            handleRowChange(index, "nama", e.target.value, true)
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="p-1 border w-32">
                        <Select
                          options={genderOptions}
                          value={genderOptions.find((opt) => opt.value === row.gender)}
                          onChange={(e) => handleRowChange(index, "gender", e.value, true)}
                          className="text-sm"
                          menuPortalTarget={document.body}
                          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        />
                      </td>
                      <td className="p-1 border w-20">
                        <input
                          type="number"
                          value={row.usia}
                          onChange={(e) =>
                            handleRowChange(index, "usia", e.target.value, true)
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="p-1 border">
                        <input
                          value={row.pendidikan}
                          onChange={(e) =>
                            handleRowChange(index, "pendidikan", e.target.value, true)
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="p-1 border">
                        <input
                          value={row.pekerjaan}
                          onChange={(e) =>
                            handleRowChange(index, "pekerjaan", e.target.value, true)
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="p-1 border">
                        <input
                          value={row.noHp}
                          onChange={(e) =>
                            handleRowChange(index, "noHp", e.target.value, true)
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="p-1 border">
                        <input
                          value={row.keterangan}
                          onChange={(e) =>
                            handleRowChange(index, "keterangan", e.target.value, true)
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="p-1 border">
                        {row.hubungan === "Anak" && (
                          <button
                            type="button"
                            className="text-red-600"
                            onClick={() => removeChild(index)}
                          >
                            Hapus
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addChild}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          >
            Tambah Anak
          </button>

          {status === "Menikah" && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold mb-2">Pekerjaan Pasangan (opsional)</h4>
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Nama Perusahaan"
                  value={partnerWork.namaPerusahaan}
                  onChange={(e) => handleWorkChange("namaPerusahaan", e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="Alamat"
                  value={partnerWork.alamat}
                  onChange={(e) => handleWorkChange("alamat", e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="Telepon"
                  value={partnerWork.telepon}
                  onChange={(e) => handleWorkChange("telepon", e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="Jenis Usaha"
                  value={partnerWork.jenisUsaha}
                  onChange={(e) => handleWorkChange("jenisUsaha", e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="Jabatan"
                  value={partnerWork.jabatan}
                  onChange={(e) => handleWorkChange("jabatan", e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="Masa Kerja"
                  value={partnerWork.masaKerja}
                  onChange={(e) => handleWorkChange("masaKerja", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Family Table */}
      <div className="space-y-2 mt-6">
        <h3 className="font-semibold">Susunan Keluarga</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto border">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Hubungan",
                  "Nama",
                  "L/P",
                  "Usia",
                  "Pendidikan",
                  "Pekerjaan",
                  "No. Telp/HP",
                  "Keterangan",
                  "Aksi",
                ].map((head) => (
                  <th key={head} className="p-2 border text-left">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="p-1 border">{row.hubungan}</td>
                  <td className="p-1 border">
                    <input
                      value={row.nama}
                      onChange={(e) => handleRowChange(index, "nama", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="p-1 border w-32">
                    <Select
                      options={genderOptions}
                      value={genderOptions.find((opt) => opt.value === row.gender)}
                      onChange={(e) => handleRowChange(index, "gender", e.value)}
                      className="text-sm"
                      menuPortalTarget={document.body}
                      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    />
                  </td>
                  <td className="p-1 border w-20">
                    <input
                      type="number"
                      value={row.usia}
                      onChange={(e) => handleRowChange(index, "usia", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="p-1 border">
                    <input
                      value={row.pendidikan}
                      onChange={(e) => handleRowChange(index, "pendidikan", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="p-1 border">
                    <input
                      value={row.pekerjaan}
                      onChange={(e) => handleRowChange(index, "pekerjaan", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="p-1 border">
                    <input
                      value={row.noHp}
                      onChange={(e) => handleRowChange(index, "noHp", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="p-1 border">
                    <input
                      value={row.keterangan}
                      onChange={(e) => handleRowChange(index, "keterangan", e.target.value)}
                      className={inputClass}
                    />
                  </td>
                  <td className="p-1 border">
                    {row.hubungan === "Saudara" && (
                      <button
                        type="button"
                        className="text-red-600"
                        onClick={() => removeRow(index)}
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
        >
          Tambah Saudara
        </button>
      </div>
    </div>
  );
};

export default DynamicFamilyTable;
