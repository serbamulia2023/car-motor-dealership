import React from "react";
import { useFormContext } from "react-hook-form";

const PersonalDataAgreement = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dengan ini saya menyatakan bahwa:</h3>

      <div className="space-y-2">
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("pdaAccepted.first", { required: true })}
            className="mt-1"
          />
          <span>
            Data/informasi yang telah saya berikan di atas adalah benar dan akurat. Apabila ternyata
            dikemudian hari data/informasi tersebut terbukti terdapat ketidakbenaran dan
            mengakibatkan kerugian Perusahaan, maka saya akan bertanggung jawab atas akibatnya.
          </span>
        </label>
        {errors?.pdaAccepted?.first && (
          <p className="text-sm text-red-600 ml-6">Checklist ini wajib diisi.</p>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("pdaAccepted.second", { required: true })}
            className="mt-1"
          />
          <span>
            Menyetujui untuk memberikan akses kepada PT Serba Mulia Auto mempergunakan data pribadi saya
            untuk keperluan proses penerimaan karyawan dan/atau untuk keperluan lainnya yaitu mengenai
            promosi produk/layanan dari PT Serba Mulia Auto/Afiliasi/pihak ketiga yang terkait dengan
            PT Serba Mulia Auto.
          </span>
        </label>
        {errors?.pdaAccepted?.second && (
          <p className="text-sm text-red-600 ml-6">Checklist ini wajib diisi.</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDataAgreement;
