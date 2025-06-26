import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FiMinus } from "react-icons/fi";

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
  hubungan: "Suami/Istri", nama: "", gender: "", usia: "", pendidikan: "", pekerjaan: "", noHp: "", keterangan: "",
};

const defaultPartnerWork = {
  namaPerusahaan: "", alamat: "", telepon: "", jenisUsaha: "", jabatan: "", masaKerja: "",
};

const inputClass = "w-full px-2 py-[6px] border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm";

const DynamicFamilyTable = ({ data = {}, setData }) => {
  const [status, setStatus] = useState(data.status || "");
  const [rows, setRows] = useState(() =>
    data.rows?.length
      ? data.rows
      : [
          { hubungan: "Ayah", nama: "", gender: "", usia: "", pendidikan: "", pekerjaan: "", noHp: "", keterangan: "" },
          { hubungan: "Ibu", nama: "", gender: "", usia: "", pendidikan: "", pekerjaan: "", noHp: "", keterangan: "" },
        ]
  );
  const [partnerRows, setPartnerRows] = useState(data.partnerRows || []);
  const [partnerWork, setPartnerWork] = useState(data.partnerWork || defaultPartnerWork);

  useEffect(() => {
    if (["Menikah", "Duda", "Janda"].includes(status)) {
      setPartnerRows((prev) => {
        const hasSpouse = prev.some((r) => r.hubungan === "Suami/Istri");
        if (status === "Menikah" && !hasSpouse) return [defaultSpouseRow, ...prev];
        if (status !== "Menikah") return prev.filter((r) => r.hubungan === "Anak");
        return prev;
      });
    } else {
      setPartnerRows([]);
    }
  }, [status]);

  useEffect(() => {
    setData({ status, rows, partnerRows, partnerWork });
  }, [status, rows, partnerRows, partnerWork]);

  const handleRowChange = (index, field, value, isPartner = false) => {
    const copy = isPartner ? [...partnerRows] : [...rows];
    copy[index][field] = value;
    isPartner ? setPartnerRows(copy) : setRows(copy);
  };

  const removeRow = (index) => setRows((prev) => prev.filter((_, i) => i !== index));
  const removeChild = (index) => setPartnerRows((prev) => prev.filter((_, i) => i !== index));
  const addRow = () => setRows((prev) => [...prev, {
    hubungan: "Saudara", nama: "", gender: "", usia: "", pendidikan: "", pekerjaan: "", noHp: "", keterangan: ""
  }]);
  const addChild = () => setPartnerRows((prev) => [...prev, {
    hubungan: "Anak", nama: "", gender: "", usia: "", pendidikan: "", pekerjaan: "", noHp: "", keterangan: ""
  }]);

  const handleWorkChange = (field, value) => {
    setPartnerWork((prev) => ({ ...prev, [field]: value }));
  };

  const MinusButton = ({ onClick }) => (
    <button type="button" onClick={onClick} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
      <FiMinus size={18} />
    </button>
  );

  const renderCard = (row, index, isPartner = false, removable = false, onRemove) => (
    <div key={index} className="relative border p-4 rounded-md mb-4 space-y-2 pr-10">
      <div className="text-sm font-semibold">{row.hubungan}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <input value={row.nama} onChange={(e) => handleRowChange(index, "nama", e.target.value, isPartner)} className={inputClass} placeholder="Nama" />
        <Select
          options={genderOptions}
          value={genderOptions.find((opt) => opt.value === row.gender)}
          onChange={(e) => handleRowChange(index, "gender", e.value, isPartner)}
          placeholder="Jenis Kelamin" 
          className="text-sm"
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
        <input value={row.usia} onChange={(e) => handleRowChange(index, "usia", e.target.value, isPartner)} className={inputClass} placeholder="Usia" type="number" />
        <input value={row.pendidikan} onChange={(e) => handleRowChange(index, "pendidikan", e.target.value, isPartner)} className={inputClass} placeholder="Pendidikan" />
        <input value={row.pekerjaan} onChange={(e) => handleRowChange(index, "pekerjaan", e.target.value, isPartner)} className={inputClass} placeholder="Pekerjaan" />
        <input value={row.noHp} onChange={(e) => handleRowChange(index, "noHp", e.target.value, isPartner)} className={inputClass} placeholder="No. Telp/HP" />
        <input value={row.keterangan} onChange={(e) => handleRowChange(index, "keterangan", e.target.value, isPartner)} className={inputClass} placeholder="Keterangan" />
      </div>
      {removable && <MinusButton onClick={onRemove} />}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Status */}
      <div>
        <label className="block font-medium mb-1">Status Perkawinan</label>
        <Select
          options={maritalStatusOptions}
          value={maritalStatusOptions.find((opt) => opt.value === status)}
          onChange={(e) => setStatus(e.value)}
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        />
      </div>

      {/* Pasangan & Anak */}
      {["Menikah", "Duda", "Janda"].includes(status) && (
        <div>
          <h3 className="font-semibold mb-2">Suami/Istri & Anak</h3>
          {partnerRows.map((row, i) => renderCard(row, i, true, row.hubungan === "Anak", () => removeChild(i)))}
          <button onClick={addChild} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm">+ Tambah Anak</button>

          {status === "Menikah" && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold mb-2">Pekerjaan Pasangan (opsional)</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(partnerWork).map(([key, val]) => (
                  <input key={key} value={val} onChange={(e) => handleWorkChange(key, e.target.value)} className={inputClass} placeholder={key} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Susunan Keluarga */}
      <div>
        <h3 className="font-semibold mb-2">Susunan Keluarga</h3>
        {rows.map((row, i) => renderCard(row, i, false, row.hubungan === "Saudara", () => removeRow(i)))}
        <button onClick={addRow} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm">+ Tambah Saudara</button>
      </div>
    </div>
  );
};

export default DynamicFamilyTable;
