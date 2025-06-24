import React from 'react';

const PDACheckboxSection = ({ isChecked = [false, false], setIsChecked = () => {} }) => {
  const handleCheckbox = (index) => {
    const updated = [...isChecked];
    updated[index] = !updated[index];
    setIsChecked(updated); // this will now always be safe
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h3 className="text-lg font-bold mb-4">Personal Data Agreement</h3>

      <div className="space-y-4 text-sm text-gray-700">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={isChecked[0]}
            onChange={() => handleCheckbox(0)}
            className="mt-1"
          />
          <span>
            Data/informasi yang saya berikan di atas adalah benar dan akurat. Jika di kemudian hari
            terbukti tidak benar, saya bersedia bertanggung jawab sepenuhnya.
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={isChecked[1]}
            onChange={() => handleCheckbox(1)}
            className="mt-1"
          />
          <span>
            Saya menyetujui PT Serba Mulia Auto menggunakan data pribadi saya untuk keperluan proses
            rekrutmen dan/atau keperluan lainnya sesuai kebijakan privasi perusahaan.
          </span>
        </label>
      </div>
    </div>
  );
};

export default PDACheckboxSection;
