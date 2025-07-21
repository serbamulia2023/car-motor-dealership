import React, { useEffect } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';

const defaultQuestions = [
  { question: 'Apakah anda pernah melamar di perusahaan ini sebelumnya?', required: true },
  { question: 'Selain di sini, di perusahaan mana lagi anda sedang melamar? Sebagai apa?', required: true },
  { question: 'Apakah anda terikat kontrak dengan perusahaan tempat anda bekerja saat ini?', required: true },
  { question: 'Apakah anda mempunyai pekerjaan sampingan?', required: true },
  { question: 'Apakah anda keberatan bila kami minta referensi pada perusahaan dimana anda pernah bekerja?', required: true },
  { question: 'Apakah anda mempunyai teman/saudara yang bekerja di perusahaan ini?', required: true },
  { question: 'Apakah anda memiliki akun social media seperti Facebook, Instagram dan LinkedIn? Jika iya, username-nya?', required: true },
  { question: 'Apakah anda pernah menderita sakit keras/kronis/kecelakaan berat/operasi?', required: true },
  { question: 'Apakah anda pernah menjalani pemeriksaan psikologis/psikotest?', required: true },
  { question: 'Apakah anda pernah berurusan dengan polisi karena tindak kejahatan?', required: true },
  { question: 'Bila diterima, bersediakah anda ditugaskan ke luar kota?', required: true },
  { question: 'Bila diterima, bersediakah anda ditempatkan di luar kota? Sebutkan nama kota/daerah', required: true },
  { question: 'Jenis pekerjaan/jabatan apa yang sesuai dengan keinginan karir anda?', required: true },
  { question: 'Jenis pekerjaan apakah yang paling tidak anda sukai?', required: true },
  { question: 'Berapa besar penghasilan anda sebulan dan fasilitas apa yang anda peroleh saat ini?', required: true },
  { question: 'Bila diterima, berapa gaji dan fasilitas apa yang anda harapkan?', required: true },
  { question: 'Bila diterima, kapan anda dapat mulai bekerja?', required: true },
];

export default function QuestionnaireSection() {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, replace } = useFieldArray({
    control,
    name: 'questionnaire',
  });

  useEffect(() => {
    const current = watch('questionnaire') || [];
    if (current.length !== defaultQuestions.length) {
      const merged = defaultQuestions.map((q, i) => {
        const existing = current[i] || {};
        return {
          question: q.question,
          answer: existing.answer || '',
          explanation: existing.explanation || '',
        };
      });
      replace(merged);
    }
  }, [replace, watch]);

  return (
    <div className="space-y-6 px-4 py-2">
      <h3 className="text-lg font-bold">Pertanyaan Tambahan</h3>

      {fields.map((field, index) => {
        const q = defaultQuestions[index];
        const answer = watch(`questionnaire.${index}.answer`);

        return (
          <div
            key={field.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3"
          >
            {/* Label */}
            <label className="block font-medium text-sm text-gray-800">
              {q.question}
              {q.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Yes / No radio */}
            <Controller
              name={`questionnaire.${index}.answer`}
              control={control}
              rules={{ required: q.required ? 'Pertanyaan ini wajib diisi.' : false }}
              render={({ field }) => (
                <div className="flex items-center gap-6 text-sm text-gray-700">
                  {['yes', 'no'].map((val) => (
                    <label key={val} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        value={val}
                        checked={field.value === val}
                        onChange={() => field.onChange(val)}
                        className="accent-blue-600"
                      />
                      {val === 'yes' ? 'Ya' : 'Tidak'}
                    </label>
                  ))}
                </div>
              )}
            />

            {/* Error for required */}
            {errors?.questionnaire?.[index]?.answer && (
              <p className="text-red-500 text-sm">
                {errors.questionnaire[index].answer.message}
              </p>
            )}

            {/* Optional Explanation */}
            {['yes', 'no'].includes(answer) && (
              <Controller
                name={`questionnaire.${index}.explanation`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    value={field.value ?? ''}
                    placeholder="Jelaskan jawaban Anda (opsional)"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
