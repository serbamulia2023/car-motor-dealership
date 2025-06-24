import React, { useState, useEffect } from 'react';

const IdentificationSection = ({ data, setData }) => {
  const [hasVehicle, setHasVehicle] = useState(!!data.kendaraanStatus || !!data.kendaraanDetail);
  const [vehicleType, setVehicleType] = useState(data.kendaraanJenis || '');

  useEffect(() => {
    if (!hasVehicle && !data.kendaraanStatus && !data.kendaraanDetail) {
      setData({
        kendaraanStatus: '',
        kendaraanJenis: '',
        kendaraanJenisLainnya: '',
        kendaraanDetail: '',
      });
      setVehicleType('');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let filteredValue = value;

    if (['ktp', 'simA', 'simC', 'jamsostek'].includes(name)) {
      filteredValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'npwp') {
      filteredValue = value.replace(/[^0-9.\-]/g, '');
    }

    setData({ [name]: filteredValue });
  };

  const handleVehicleTypeChange = (e) => {
    const { value } = e.target;
    setVehicleType(value);
    setData({
      kendaraanJenis: value,
      ...(value === 'lainnya' ? {} : { kendaraanJenisLainnya: '' }),
    });
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Data Identitas & Kendaraan</h3>

      {/* No. KTP */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          No. KTP <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="ktp"
          inputMode="numeric"
          required
          value={data.ktp || ''}
          onChange={handleChange}
          placeholder="Contoh: 3173xxxxxxxxxxxx"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* No. SIM A */}
      <div>
        <label className="block text-sm font-medium text-gray-700">No. SIM A</label>
        <input
          type="text"
          name="simA"
          inputMode="numeric"
          value={data.simA || ''}
          onChange={handleChange}
          placeholder="Opsional jika ada"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* No. SIM C */}
      <div>
        <label className="block text-sm font-medium text-gray-700">No. SIM C</label>
        <input
          type="text"
          name="simC"
          inputMode="numeric"
          value={data.simC || ''}
          onChange={handleChange}
          placeholder="Opsional jika ada"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* No. NPWP */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          No. NPWP <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="npwp"
          inputMode="numeric"
          required
          value={data.npwp || ''}
          onChange={handleChange}
          placeholder="Contoh: 12.345.678.9-012.345"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* ✅ NEW FIELD: No. Jamsostek */}
      <div>
        <label className="block text-sm font-medium text-gray-700">No. Jamsostek</label>
        <input
          type="text"
          name="jamsostek"
          inputMode="numeric"
          value={data.jamsostek || ''}
          onChange={handleChange}
          placeholder="Opsional jika ada"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Vehicle section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Apakah Anda memiliki kendaraan?
        </label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasVehicle"
              checked={hasVehicle === true}
              onChange={() => setHasVehicle(true)}
              className="form-radio"
            />
            <span className="ml-2">Ya</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasVehicle"
              checked={hasVehicle === false}
              onChange={() => setHasVehicle(false)}
              className="form-radio"
            />
            <span className="ml-2">Tidak</span>
          </label>
        </div>
      </div>

      {hasVehicle && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jenis Kendaraan</label>
            <select
              name="kendaraanJenis"
              value={vehicleType}
              onChange={handleVehicleTypeChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white"
            >
              <option value="">Pilih jenis kendaraan</option>
              <option value="mobil">Mobil</option>
              <option value="motor">Motor</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          {vehicleType === 'lainnya' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenis Kendaraan Lainnya</label>
              <input
                type="text"
                name="kendaraanJenisLainnya"
                value={data.kendaraanJenisLainnya || ''}
                onChange={handleChange}
                placeholder="Contoh: Truk, Sepeda Listrik"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Jenis / Merk / Tahun</label>
            <input
              type="text"
              name="kendaraanDetail"
              value={data.kendaraanDetail || ''}
              onChange={handleChange}
              placeholder="Contoh: Honda Jazz 2022"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status Kepemilikan Kendaraan</label>
            <select
              name="kendaraanStatus"
              value={data.kendaraanStatus || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
            >
              <option value="">Pilih salah satu</option>
              <option value="sendiri">Milik Sendiri</option>
              <option value="orangtua">Orang Tua</option>
              <option value="kantor">Kantor</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default IdentificationSection;
