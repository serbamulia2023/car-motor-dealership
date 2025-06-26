import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";

const defaultBaseEducation = [
  { jenjang: "SD", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
  { jenjang: "SMP", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
  { jenjang: "SMA/SMK", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
];

const defaultUniversityRow = { jenjang: "Universitas", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" };
const defaultKursusRow = { penyelenggara: "", kota: "", lama: "", tahun: "", dibiayaiOleh: "", lulusTidak: "" };
const defaultBahasaRow = { bahasa: "", mendengar: "", membaca: "", berbicara: "", menulis: "" };
const defaultKegiatanRow = { namaOrganisasi: "", macamKegiatan: "", tahun: "", jabatan: "" };

const DynamicEducationTable = ({ data, setData }) => {
  const [base, setBase] = useState(defaultBaseEducation);
  const [universities, setUniversities] = useState([]);
  const [kursus, setKursus] = useState([]);
  const [bahasa, setBahasa] = useState([]);
  const [kegiatan, setKegiatan] = useState([]);

  useEffect(() => {
    if (data) {
      setBase(data.base || defaultBaseEducation);
      setUniversities(data.universities || []);
      setKursus(data.kursus || []);
      setBahasa(data.bahasa || []);
      setKegiatan(data.kegiatan || []);
    }
  }, []);

  useEffect(() => {
    setData({ base, universities, kursus, bahasa, kegiatan });
  }, [base, universities, kursus, bahasa, kegiatan]);

  const inputClass = "border px-2 py-1 rounded text-sm w-full";

  const handleArrayChange = (arr, setArr, index, field, value) => {
    const copy = [...arr];
    copy[index][field] = value;
    setArr(copy);
  };

  const addRow = (arr, setArr, def) => setArr([...arr, { ...def }]);
  const removeRow = (arr, setArr, index) => {
    const updated = [...arr];
    updated.splice(index, 1);
    setArr(updated);
  };

  const MinusButton = ({ onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
    >
      <FiMinus size={18} />
    </button>
  );

  const renderSection = (title, items, fields, setFn, defaults, isSelect = {}, selectOptions = {}) => (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      {items.map((row, i) => (
        <div key={i} className="relative border p-4 pr-10 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {fields.map((f) =>
            isSelect[f] ? (
              <select key={f} className={inputClass} value={row[f]} onChange={(e) => handleArrayChange(items, setFn, i, f, e.target.value)}>
                <option value="">{selectOptions[f].label}</option>
                {selectOptions[f].options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input key={f} className={inputClass} placeholder={f} value={row[f]} onChange={(e) => handleArrayChange(items, setFn, i, f, e.target.value)} />
            )
          )}
          <MinusButton onClick={() => removeRow(items, setFn, i)} />
        </div>
      ))}
      <button onClick={() => addRow(items, setFn, defaults)} className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
        + Tambah {title.split(" ")[0]}
      </button>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Riwayat Pendidikan */}
      <div>
        <h3 className="font-semibold mb-2">Riwayat Pendidikan</h3>
        {[...base, ...universities].map((row, idx) => {
          const isUni = row.jenjang === "Universitas";
          return (
            <div key={idx} className="relative border p-4 pr-10 rounded mb-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 md:col-span-3 font-semibold">{row.jenjang}</div>
              <input className={inputClass} placeholder="Nama Sekolah/Universitas" value={row.sekolah} onChange={(e) =>
                idx < base.length
                  ? handleArrayChange(base, setBase, idx, "sekolah", e.target.value)
                  : handleArrayChange(universities, setUniversities, idx - base.length, "sekolah", e.target.value)
              } />
              <input className={inputClass} placeholder="Kota" value={row.kota} onChange={(e) =>
                idx < base.length
                  ? handleArrayChange(base, setBase, idx, "kota", e.target.value)
                  : handleArrayChange(universities, setUniversities, idx - base.length, "kota", e.target.value)
              } />
              <input className={inputClass} placeholder="Jurusan" value={row.jurusan} onChange={(e) =>
                idx < base.length
                  ? handleArrayChange(base, setBase, idx, "jurusan", e.target.value)
                  : handleArrayChange(universities, setUniversities, idx - base.length, "jurusan", e.target.value)
              } />
              <input className={inputClass} placeholder="Tahun Masuk" value={row.tahunMasuk} onChange={(e) =>
                idx < base.length
                  ? handleArrayChange(base, setBase, idx, "tahunMasuk", e.target.value)
                  : handleArrayChange(universities, setUniversities, idx - base.length, "tahunMasuk", e.target.value)
              } />
              <input className={inputClass} placeholder="Tahun Lulus" value={row.tahunLulus} onChange={(e) =>
                idx < base.length
                  ? handleArrayChange(base, setBase, idx, "tahunLulus", e.target.value)
                  : handleArrayChange(universities, setUniversities, idx - base.length, "tahunLulus", e.target.value)
              } />
              {isUni && <MinusButton onClick={() => removeRow(universities, setUniversities, idx - base.length)} />}
            </div>
          );
        })}
        <button onClick={() => addRow(universities, setUniversities, defaultUniversityRow)} className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
          + Tambah Universitas
        </button>
      </div>

      {/* Kursus */}
      {renderSection("Kursus / Pelatihan", kursus, ["penyelenggara", "kota", "lama", "tahun", "dibiayaiOleh", "lulusTidak"], setKursus, defaultKursusRow, { lulusTidak: true }, {
        lulusTidak: { label: "Lulus/Tidak", options: ["Lulus", "Tidak"] },
      })}

      {/* Bahasa */}
      {renderSection("Bahasa", bahasa, ["bahasa", "mendengar", "membaca", "berbicara", "menulis"], setBahasa, defaultBahasaRow, {
        mendengar: true, membaca: true, berbicara: true, menulis: true
      }, {
        mendengar: { label: "Pilih mendengar", options: ["Baik", "Sedang", "Kurang"] },
        membaca: { label: "Pilih membaca", options: ["Baik", "Sedang", "Kurang"] },
        berbicara: { label: "Pilih berbicara", options: ["Baik", "Sedang", "Kurang"] },
        menulis: { label: "Pilih menulis", options: ["Baik", "Sedang", "Kurang"] },
      })}

      {/* Kegiatan Sosial */}
      {renderSection("Kegiatan Sosial", kegiatan, ["namaOrganisasi", "macamKegiatan", "tahun", "jabatan"], setKegiatan, defaultKegiatanRow)}
    </div>
  );
};

export default DynamicEducationTable;
