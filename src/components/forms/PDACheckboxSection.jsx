import React, { useEffect, useState } from "react";

const PersonalDataAgreement = ({ data, setData }) => {
  const [first, setFirst] = useState(data?.first || false);
  const [second, setSecond] = useState(data?.second || false);

  useEffect(() => {
    setData({ first, second });
  }, [first, second]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg">Dengan ini saya menyatakan bahwa:</h3>

      <div className="space-y-2">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={first}
            onChange={(e) => setFirst(e.target.checked)}
            className="mt-1"
          />
          <span>
            Data/informasi yang telah saya berikan di atas adalah benar dan akurat. Apabila ternyata dikemudian hari data/informasi tersebut terbukti terdapat ketidakbenaran dan mengakibatkan kerugian Perusahaan, maka saya akan bertanggung jawab atas akibatnya.
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={second}
            onChange={(e) => setSecond(e.target.checked)}
            className="mt-1"
          />
          <span>
            Menyetujui untuk memberikan akses kepada PT Serba Mulia Auto mempergunakan data pribadi saya untuk keperluan proses penerimaan karyawan dan/atau untuk keperluan lainnya yaitu mengenai promosi produk/layanan dari PT Serba Mulia Auto/Afiliasi/pihak ketiga yang terkait dengan PT Serba Mulia Auto.
          </span>
        </label>
      </div>
    </div>
  );
};

export default PersonalDataAgreement;
