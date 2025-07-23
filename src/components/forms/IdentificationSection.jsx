import React, { useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

const IdentificationSection = () => {
  const { watch, setValue, control } = useFormContext();

  const kendaraanStatus = watch('personalInfo.kendaraan_status');
  const kendaraanJenis = watch('personalInfo.kendaraan_jenis');
  const hasVehicle = !!kendaraanStatus || !!watch('personalInfo.kendaraan_detail');
  const [vehicleActive, setVehicleActive] = useState(hasVehicle);

  useEffect(() => {
    if (!vehicleActive) {
      setValue('personalInfo.kendaraan_status', '');
      setValue('personalInfo.kendaraan_jenis', '');
      setValue('personalInfo.kendaraan_jenis_lainnya', '');
      setValue('personalInfo.kendaraan_detail', '');
    }
  }, [vehicleActive, setValue]);

  const sanitize = (val, field) => {
    if (
      ['personalInfo.sim_a', 'personalInfo.sim_c', 'personalInfo.no_bpjs', 'personalInfo.nik'].includes(field)
    ) {
      return val.replace(/[^0-9]/g, '');
    } else if (field === 'personalInfo.npwp') {
      return val.replace(/[^0-9.\-]/g, '');
    }
    return val;
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Data Identitas & Kendaraan</h3>

      {/* ✅ NIK field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">NIK</label>
        <Controller
          control={control}
          name="personalInfo.nik"
          render={({ field: { value, onChange, ...rest } }) => (
            <input
              {...rest}
              value={value || ''}
              onChange={(e) => onChange(sanitize(e.target.value, 'personalInfo.nik'))}
              inputMode="numeric"
              placeholder="Contoh: 3174XXXXXXXXXXXX"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
            />
          )}
        />
      </div>

      {['sim_a', 'sim_c', 'npwp', 'no_bpjs'].map((field, idx) => (
        <div key={idx}>
          <label className="block text-sm font-medium text-gray-700">
            {field === 'sim_a' && 'No. SIM A'}
            {field === 'sim_c' && 'No. SIM C'}
            {field === 'npwp' && 'No. NPWP'}
            {field === 'no_bpjs' && 'No. BPJS / Jamsostek'}
          </label>
          <Controller
            control={control}
            name={`personalInfo.${field}`}
            render={({ field: { value, onChange, ...rest } }) => (
              <input
                {...rest}
                value={value || ''}
                onChange={(e) => onChange(sanitize(e.target.value, `personalInfo.${field}`))}
                inputMode="numeric"
                placeholder={
                  field === 'npwp' ? '12.345.678.9-012.345' : 'Opsional jika ada'
                }
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
              />
            )}
          />
        </div>
      ))}

      {/* Kendaraan ownership toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Apakah Anda memiliki kendaraan?
        </label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasVehicle"
              checked={vehicleActive}
              onChange={() => setVehicleActive(true)}
              className="form-radio"
            />
            <span className="ml-2">Ya</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasVehicle"
              checked={!vehicleActive}
              onChange={() => setVehicleActive(false)}
              className="form-radio"
            />
            <span className="ml-2">Tidak</span>
          </label>
        </div>
      </div>

      {/* Vehicle fields */}
      {vehicleActive && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jenis Kendaraan</label>
            <Controller
              control={control}
              name="personalInfo.kendaraan_jenis"
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    field.onChange(e);
                    if (e.target.value !== 'lainnya') {
                      setValue('personalInfo.kendaraan_jenis_lainnya', '');
                    }
                  }}
                  className="mt-1 w-full px-4 py-2 border rounded-md bg-white shadow-sm"
                >
                  <option value="">Pilih jenis kendaraan</option>
                  <option value="mobil">Mobil</option>
                  <option value="motor">Motor</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              )}
            />
          </div>

          {kendaraanJenis === 'lainnya' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenis Kendaraan Lainnya</label>
              <Controller
                control={control}
                name="personalInfo.kendaraan_jenis_lainnya"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Contoh: Truk, Sepeda Listrik"
                    className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
                  />
                )}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Jenis / Merk / Tahun</label>
            <Controller
              control={control}
              name="personalInfo.kendaraan_detail"
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Contoh: Honda Jazz 2022"
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status Kepemilikan Kendaraan</label>
            <Controller
              control={control}
              name="personalInfo.kendaraan_status"
              render={({ field }) => (
                <select
                  {...field}
                  value={field.value ?? ''}
                  className="mt-1 w-full px-4 py-2 border rounded-md bg-white shadow-sm"
                >
                  <option value="">Pilih salah satu</option>
                  <option value="sendiri">Milik Sendiri</option>
                  <option value="orangtua">Orang Tua</option>
                  <option value="kantor">Kantor</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default IdentificationSection;
