import React, { useState, useEffect } from "react";

const defaultBaseEducation = [
  { jenjang: "SD", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
  { jenjang: "SMP", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
  { jenjang: "SMA/SMK", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
];

const defaultEducationUniversityRow = {
  jenjang: "Universitas",
  sekolah: "",
  kota: "",
  jurusan: "",
  tahunMasuk: "",
  tahunLulus: "",
};

const defaultKursusRow = {
  penyelenggara: "",
  kota: "",
  lama: "",
  tahun: "",
  dibiayaiOleh: "",
  lulusTidak: "",
};

const defaultKegiatanSosialRow = {
  namaOrganisasi: "",
  macamKegiatan: "",
  tahun: "",
  jabatan: "",
};

const defaultBahasaRow = {
  bahasa: "",
  mendengar: "",
  membaca: "",
  berbicara: "",
  menulis: "",
};

const lulusTidakOptions = [
  { value: "", label: "Pilih" },
  { value: "Lulus", label: "Lulus" },
  { value: "Tidak", label: "Tidak" },
];

const skillOptions = [
  { value: "", label: "" },
  { value: "Baik", label: "Baik" },
  { value: "Sedang", label: "Sedang" },
  { value: "Kurang", label: "Kurang" },
];

const inputClass = "w-full px-2 py-1 border border-gray-300 rounded text-sm";

const DynamicEducationTable = ({ data, setData }) => {
  // Education States
  const [baseEducation, setBaseEducation] = useState(defaultBaseEducation);
  const [universities, setUniversities] = useState([
    { jenjang: "SD", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
    { jenjang: "SMP", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" },
    { jenjang: "SMA/SMK", sekolah: "", kota: "", jurusan: "", tahunMasuk: "", tahunLulus: "" }
  ]);

  // Kursus / Pelatihan
  const [kursusRows, setKursusRows] = useState([]);

  // Kegiatan Sosial
  const [kegiatanSosialRows, setKegiatanSosialRows] = useState([]);

  // Bahasa
  const [bahasaRows, setBahasaRows] = useState([]);

  // Init data from props (only once or on change)
  useEffect(() => {
    if (!data) return;

    if (Array.isArray(data.baseEducation)) setBaseEducation(data.baseEducation);
    if (Array.isArray(data.universities)) setUniversities(data.universities);
    if (Array.isArray(data.kursus)) setKursusRows(data.kursus);
    if (Array.isArray(data.kegiatanSosial)) setKegiatanSosialRows(data.kegiatanSosial);
    if (Array.isArray(data.bahasa)) setBahasaRows(data.bahasa);
  }, [data]);

  // Update parent form data when any part changes
  useEffect(() => {
    setData({
      baseEducation,
      universities,
      kursus: kursusRows,
      kegiatanSosial: kegiatanSosialRows,
      bahasa: bahasaRows,
    });
  }, [baseEducation, universities, kursusRows, kegiatanSosialRows, bahasaRows, setData]);

  // Handlers for Education
  const handleBaseChange = (index, field, value) => {
    const updated = [...baseEducation];
    updated[index][field] = value;
    setBaseEducation(updated);
  };
  const handleUniChange = (index, field, value) => {
    const updated = [...universities];
    updated[index][field] = value;
    setUniversities(updated);
  };
  const addUniversity = (e) => {
    e.preventDefault();
    setUniversities([...universities, { ...defaultEducationUniversityRow }]);
  };
  const addUniversity2 = () => {
    setUniversities([
      ...universities, 
    { 
        jenjang: "Universitas",
        sekolah: "",
        kota: "",
        jurusan: "",
        tahunMasuk: "",
        tahunLulus: ""
    }
    ]);
  };
  const removeUniversity = (index, e) => {
    e.preventDefault();
    const updated = [...universities];
    updated.splice(index, 1);
    setUniversities(updated);
  };

  // Handlers for Kursus
  const handleKursusChange = (index, field, value) => {
    const updated = [...kursusRows];
    updated[index][field] = value;
    setKursusRows(updated);
  };
  const addKursus = (e) => {
    e.preventDefault();
    setKursusRows([...kursusRows, { ...defaultKursusRow }]);
  };
  const removeKursus = (index, e) => {
    e.preventDefault();
    const updated = [...kursusRows];
    updated.splice(index, 1);
    setKursusRows(updated);
  };

  // Handlers for Kegiatan Sosial
  const handleKegiatanSosialChange = (index, field, value) => {
    const updated = [...kegiatanSosialRows];
    updated[index][field] = value;
    setKegiatanSosialRows(updated);
  };
  const addKegiatanSosial = (e) => {
    e.preventDefault();
    setKegiatanSosialRows([...kegiatanSosialRows, { ...defaultKegiatanSosialRow }]);
  };
  const removeKegiatanSosial = (index, e) => {
    e.preventDefault();
    const updated = [...kegiatanSosialRows];
    updated.splice(index, 1);
    setKegiatanSosialRows(updated);
  };

  // Handlers for Bahasa
  const handleBahasaChange = (index, field, value) => {
    const updated = [...bahasaRows];
    updated[index][field] = value;
    setBahasaRows(updated);
  };
  const addBahasa = (e) => {
    e.preventDefault();
    setBahasaRows([...bahasaRows, { ...defaultBahasaRow }]);
  };
  const removeBahasa = (index, e) => {
    e.preventDefault();
    const updated = [...bahasaRows];
    updated.splice(index, 1);
    setBahasaRows(updated);
  };

  return (
    <div className="space-y-10">
      {/* Pendidikan */}
      <div>
        <h3 className="font-semibold mb-2">Riwayat Pendidikan</h3>
        <table className="w-full text-sm border table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Jenjang</th>
              <th className="p-2 border w-56">Nama Sekolah/Universitas</th>
              <th className="p-2 border w-40">Kota</th>
              <th className="p-2 border">Jurusan</th>
              <th className="p-2 border w-28">Tahun Masuk</th>
              <th className="p-2 border w-28">Tahun Lulus</th>
              <th className="p-2 border w-20">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* Base fixed rows */}
            {/* {baseEducation.map((row, i) => (
              <tr key={i}>
                <td className="p-1 border">{row.jenjang}</td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Nama Sekolah/Universitas"
                    value={row.sekolah}
                    onChange={(e) => handleBaseChange(i, "sekolah", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-40">
                  <input
                    type="text"
                    placeholder="Kota"
                    value={row.kota}
                    onChange={(e) => handleBaseChange(i, "kota", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Jurusan"
                    value={row.jurusan}
                    onChange={(e) => handleBaseChange(i, "jurusan", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-28">
                  <input
                    type="text"
                    placeholder="Tahun Masuk"
                    value={row.tahunMasuk}
                    onChange={(e) => handleBaseChange(i, "tahunMasuk", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-28">
                  <input
                    type="text"
                    placeholder="Tahun Lulus"
                    value={row.tahunLulus}
                    onChange={(e) => handleBaseChange(i, "tahunLulus", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-20"></td>
              </tr>
            ))} */}

            {/* Dynamic university rows */}
            {universities.map((row, i) => (
              <tr key={"uni-" + i}>
                <td className="p-1 border">{row.jenjang}</td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Nama Sekolah/Universitas"
                    value={row.sekolah}
                    // onChange={(e) => handleUniChange(i, "sekolah", e.target.value)}
                    onChange={(e) => hand(i, "sekolah", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-40">
                  <input
                    type="text"
                    placeholder="Kota"
                    value={row.kota}
                    onChange={(e) => handleUniChange(i, "kota", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Jurusan"
                    value={row.jurusan}
                    onChange={(e) => handleUniChange(i, "jurusan", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-28">
                  <input
                    type="text"
                    placeholder="Tahun Masuk"
                    value={row.tahunMasuk}
                    onChange={(e) => handleUniChange(i, "tahunMasuk", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-28">
                  <input
                    type="text"
                    placeholder="Tahun Lulus"
                    value={row.tahunLulus}
                    onChange={(e) => handleUniChange(i, "tahunLulus", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-20 text-center">
                  {
                    row.jenjang === "Universitas" && (
                      <button
                        type="button"
                        className="text-red-600"
                        onClick={(e) => {
                          removeUniversity(i);
                        }}
                      >
                        Hapus
                      </button>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addUniversity2}
          type="button"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Tambah Universitas
        </button>
      </div>

      {/* Kursus / Pelatihan */}
      <div>
        <h3 className="font-semibold mt-10 mb-2">Kursus / Pelatihan</h3>
        <table className="w-full text-sm border table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Penyelenggara</th>
              <th className="p-2 border">Kota</th>
              <th className="p-2 border">Lama</th>
              <th className="p-2 border">Tahun</th>
              <th className="p-2 border">Dibiayai Oleh</th>
              <th className="p-2 border">Lulus/Tidak</th>
              <th className="p-2 border w-20">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kursusRows.map((row, i) => (
              <tr key={i}>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Penyelenggara"
                    value={row.penyelenggara}
                    onChange={(e) => handleKursusChange(i, "penyelenggara", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Kota"
                    value={row.kota}
                    onChange={(e) => handleKursusChange(i, "kota", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Lama"
                    value={row.lama}
                    onChange={(e) => handleKursusChange(i, "lama", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Tahun"
                    value={row.tahun}
                    onChange={(e) => handleKursusChange(i, "tahun", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Dibiayai Oleh"
                    value={row.dibiayaiOleh}
                    onChange={(e) => handleKursusChange(i, "dibiayaiOleh", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <select
                    value={row.lulusTidak}
                    onChange={(e) => handleKursusChange(i, "lulusTidak", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Pilih</option>
                    <option value="Lulus">Lulus</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </td>
                <td className="p-1 border w-20 text-center">
                  <button
                    className="text-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      removeKursus(i);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addKursus}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Tambah Kursus
        </button>
      </div>

      {/* Kegiatan Sosial */}
      <div>
        <h3 className="font-semibold mt-10 mb-2">Kegiatan Sosial</h3>
        <table className="w-full text-sm border table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nama Organisasi</th>
              <th className="p-2 border">Macam Kegiatan</th>
              <th className="p-2 border">Tahun</th>
              <th className="p-2 border">Jabatan</th>
              <th className="p-2 border w-20">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatanSosialRows.map((row, i) => (
              <tr key={i}>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Nama Organisasi"
                    value={row.namaOrganisasi}
                    onChange={(e) => handleKegiatanSosialChange(i, "namaOrganisasi", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Macam Kegiatan"
                    value={row.macamKegiatan}
                    onChange={(e) => handleKegiatanSosialChange(i, "macamKegiatan", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Tahun"
                    value={row.tahun}
                    onChange={(e) => handleKegiatanSosialChange(i, "tahun", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Jabatan"
                    value={row.jabatan}
                    onChange={(e) => handleKegiatanSosialChange(i, "jabatan", e.target.value)}
                    className={inputClass}
                  />
                </td>
                <td className="p-1 border w-20 text-center">
                  <button
                    className="text-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      removeKegiatanSosial(i);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addKegiatanSosial}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Tambah Kegiatan
        </button>
      </div>

      {/* Bahasa */}
      <div>
        <h3 className="font-semibold mt-10 mb-2">Bahasa</h3>
        <table className="w-full text-sm border table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Bahasa</th>
              <th className="p-2 border">Mendengar</th>
              <th className="p-2 border">Membaca</th>
              <th className="p-2 border">Berbicara</th>
              <th className="p-2 border">Menulis</th>
              <th className="p-2 border w-20">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bahasaRows.map((row, i) => (
              <tr key={i}>
                <td className="p-1 border">
                  <input
                    type="text"
                    placeholder="Bahasa"
                    value={row.bahasa}
                    onChange={(e) => handleBahasaChange(i, "bahasa", e.target.value)}
                    className={inputClass}
                  />
                </td>
                {["mendengar", "membaca", "berbicara", "menulis"].map((field) => (
                  <td key={field} className="p-1 border">
                    <select
                      value={row[field]}
                      onChange={(e) => handleBahasaChange(i, field, e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Pilih</option>
                      <option value="Baik">Baik</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Kurang">Kurang</option>
                    </select>
                  </td>
                ))}
                <td className="p-1 border w-20 text-center">
                  <button
                    className="text-red-600"
                    onClick={(e) => {
                      e.preventDefault();
                      removeBahasa(i);
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addBahasa}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Tambah Bahasa
        </button>
      </div>
    </div>
  );
};

export default DynamicEducationTable;
