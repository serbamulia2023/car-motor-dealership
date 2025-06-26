import React, { useState, useEffect } from "react";
import { FiMinus } from "react-icons/fi";

const emptyExperience = {
  dari: "",
  sampai: "",
  masihBekerja: false,
  namaPerusahaan: "",
  jenisUsaha: "",
  jabatanAwal: "",
  jabatanAkhir: "",
  deskripsiPekerjaan: "",
  jumlahKaryawan: "",
  alasanBerhenti: "",
  atasanLangsung: "",
  namaDirektur: "",
};

const emptyBusiness = {
  namaPerusahaan: "",
  alamat: "",
  noTelp: "",
  tahunBerdiri: "",
  statusKepemilikan: "",
  jenisUsaha: "",
  jumlahKaryawan: "",
  pendapatanBulanan: "",
};

const WorkExperienceSection = ({ data = {}, setData }) => {
  const [workExperience, setWorkExperience] = useState(data.workExperience || []);
  const [hasBusiness, setHasBusiness] = useState(data.hasBusiness || false);
  const [businesses, setBusinesses] = useState(data.businesses || []);

  useEffect(() => {
    setData({
      ...data,
      workExperience,
      hasBusiness,
      businesses,
    });
  }, [workExperience, hasBusiness, businesses]);

  const updateExperience = (index, field, value) => {
    const updated = [...workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperience(updated);
  };

  const addExperience = () => {
    setWorkExperience([...workExperience, { ...emptyExperience }]);
  };

  const removeExperience = (index) => {
    const updated = [...workExperience];
    updated.splice(index, 1);
    setWorkExperience(updated);
  };

  const updateBusiness = (index, field, value) => {
    const updated = [...businesses];
    updated[index] = { ...updated[index], [field]: value };
    setBusinesses(updated);
  };

  const addBusiness = () => {
    setBusinesses([...businesses, { ...emptyBusiness }]);
  };

  const removeBusiness = (index) => {
    const updated = [...businesses];
    updated.splice(index, 1);
    setBusinesses(updated);
  };

  return (
    <div className="space-y-6">
      {/* Work Experience Section */}
      <h3 className="font-bold text-lg">Pengalaman Kerja</h3>
      {workExperience.length === 0 && (
        <p className="text-sm text-gray-500">Belum ada pengalaman kerja ditambahkan.</p>
      )}
      {workExperience.map((item, index) => (
        <div
          key={index}
          className="relative border border-gray-300 rounded-lg p-4 grid grid-cols-2 gap-4"
        >
          <button
            type="button"
            onClick={() => removeExperience(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <FiMinus size={18} />
          </button>

          <div>
            <label>Dari</label>
            <input
              type="date"
              value={item.dari}
              onChange={(e) => updateExperience(index, "dari", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Sampai</label>
            <input
              type="date"
              value={item.sampai}
              onChange={(e) => updateExperience(index, "sampai", e.target.value)}
              disabled={item.masihBekerja}
              className="w-full border rounded px-2 py-1"
            />
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={item.masihBekerja}
                  onChange={(e) =>
                    updateExperience(index, "masihBekerja", e.target.checked)
                  }
                  className="mr-2"
                />
                Masih bekerja di sini
              </label>
            </div>
          </div>

          <div>
            <label>Nama Perusahaan</label>
            <input
              type="text"
              value={item.namaPerusahaan}
              onChange={(e) => updateExperience(index, "namaPerusahaan", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Jenis Usaha</label>
            <input
              type="text"
              value={item.jenisUsaha}
              onChange={(e) => updateExperience(index, "jenisUsaha", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Jabatan Awal</label>
            <input
              type="text"
              value={item.jabatanAwal}
              onChange={(e) => updateExperience(index, "jabatanAwal", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Jabatan Akhir</label>
            <input
              type="text"
              value={item.jabatanAkhir}
              onChange={(e) => updateExperience(index, "jabatanAkhir", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div className="col-span-2">
            <label>Deskripsi Pekerjaan</label>
            <textarea
              value={item.deskripsiPekerjaan}
              onChange={(e) =>
                updateExperience(index, "deskripsiPekerjaan", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Jumlah Karyawan</label>
            <input
              type="text"
              value={item.jumlahKaryawan}
              onChange={(e) =>
                updateExperience(index, "jumlahKaryawan", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>
              Alasan Berhenti<span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              value={item.alasanBerhenti}
              onChange={(e) =>
                updateExperience(index, "alasanBerhenti", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>

          <div>
            <label>Atasan Langsung (opsional)</label>
            <input
              type="text"
              value={item.atasanLangsung}
              onChange={(e) =>
                updateExperience(index, "atasanLangsung", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label>Nama Direktur (opsional)</label>
            <input
              type="text"
              value={item.namaDirektur}
              onChange={(e) =>
                updateExperience(index, "namaDirektur", e.target.value)
              }
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
      >
        <span className="text-xl font-bold">＋</span> Tambah Pengalaman Kerja
      </button>

      {/* ======== Self-Owned Business Section ======== */}
      <div className="mt-10">
        <label className="block font-semibold mb-2">
          Apakah Anda Mempunyai Usaha Sendiri?
        </label>
        <div className="flex gap-6">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasBusiness"
              value="yes"
              checked={hasBusiness === true}
              onChange={() => setHasBusiness(true)}
              className="mr-2"
            />
            Ya
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasBusiness"
              value="no"
              checked={hasBusiness === false}
              onChange={() => setHasBusiness(false)}
              className="mr-2"
            />
            Tidak
          </label>
        </div>
      </div>

      {hasBusiness && (
        <div className="space-y-6 mt-6">
          <h4 className="font-semibold text-md">Usaha Sendiri</h4>
          {businesses.map((biz, index) => (
            <div
              key={index}
              className="relative border border-gray-300 rounded-lg p-4 grid grid-cols-2 gap-4"
            >
              {businesses.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBusiness(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FiMinus size={18} />
                </button>
              )}

              <div>
                <label>Nama Perusahaan</label>
                <input
                  type="text"
                  value={biz.namaPerusahaan}
                  onChange={(e) =>
                    updateBusiness(index, "namaPerusahaan", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>Alamat</label>
                <input
                  type="text"
                  value={biz.alamat}
                  onChange={(e) =>
                    updateBusiness(index, "alamat", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>No Telp Kantor</label>
                <input
                  type="text"
                  value={biz.noTelp}
                  onChange={(e) =>
                    updateBusiness(index, "noTelp", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>Tahun Berdiri</label>
                <input
                  type="text"
                  value={biz.tahunBerdiri}
                  onChange={(e) =>
                    updateBusiness(index, "tahunBerdiri", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>Status Kepemilikan</label>
                <input
                  type="text"
                  value={biz.statusKepemilikan}
                  onChange={(e) =>
                    updateBusiness(index, "statusKepemilikan", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>Jenis Usaha</label>
                <input
                  type="text"
                  value={biz.jenisUsaha}
                  onChange={(e) =>
                    updateBusiness(index, "jenisUsaha", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>Jumlah Karyawan</label>
                <input
                  type="text"
                  value={biz.jumlahKaryawan}
                  onChange={(e) =>
                    updateBusiness(index, "jumlahKaryawan", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div>
                <label>Pendapatan /bulan</label>
                <input
                  type="text"
                  value={biz.pendapatanBulanan}
                  onChange={(e) =>
                    updateBusiness(index, "pendapatanBulanan", e.target.value)
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addBusiness}
            className="flex items-center gap-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
          >
            <span className="text-xl font-bold">＋</span> Tambah Usaha Sendiri
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceSection;
