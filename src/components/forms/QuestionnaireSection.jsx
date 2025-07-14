import React, { useEffect } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';

const defaultQuestions = [
  { question: 'Apakah anda pernah melamar di perusahaan ini sebelumnya?', required: true },
  { question: 'Selain di sini, di perusahaan mana lagi anda sedang melamar? Sebagai apa?', required: true },
  { question: 'Apakah anda terikat kontrak dengan perusahaan tempat anda bekerja saat ini?', required: true },
  { question: 'Apakah anda mempunyai pekerjaan sampingan?', required: false },
  { question: 'Apakah anda keberatan bila kami minta referensi pada perusahaan dimana anda pernah bekerja?', required: false },
  { question: 'Apakah anda mempunyai teman/saudara yang bekerja di perusahaan ini?', required: false },
  { question: 'Apakah anda memiliki akun social media seperti Facebook, Instagram dan LinkedIn? Jika iya, username-nya?', required: false },
  { question: 'Apakah anda pernah menderita sakit keras/kronis/kecelakaan berat/operasi?', required: false },
  { question: 'Apakah anda pernah menjalani pemeriksaan psikologis/psikotest?', required: false },
  { question: 'Apakah anda pernah berurusan dengan polisi karena tindak kejahatan?', required: false },
  { question: 'Bila diterima, bersediakah anda ditugaskan ke luar kota?', required: true },
  { question: 'Bila diterima, bersediakah anda ditempatkan di luar kota? Sebutkan nama kota/daerah', required: true },
  { question: 'Jenis pekerjaan/jabatan apa yang sesuai dengan keinginan karir anda?', required: true },
  { question: 'Jenis pekerjaan apakah yang paling tidak anda sukai?', required: true },
  { question: 'Berapa besar penghasilan anda sebulan dan fasilitas apa yang anda peroleh saat ini?', required: true },
  { question: 'Bila diterima, berapa gaji dan fasilitas apa yang anda harapkan?', required: true },
  { question: 'Bila diterima, kapan anda dapat mulai bekerja?', required: true },
];

export default function QuestionnaireSection() {
  const { control, watch, setValue } = useFormContext();

  // Initialize if not already filled
  const watchedQuestions = watch('questionnaire');

  useEffect(() => {
    if (!watchedQuestions || watchedQuestions.length === 0) {
      const initial = defaultQuestions.map((q) => ({
        question: q.question,
        answer: '',
        explanation: '',
      }));
      setValue('questionnaire', initial);
    }
  }, [watchedQuestions, setValue]);

  const { fields } = useFieldArray({
    control,
    name: 'questionnaire',
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Pertanyaan Tambahan</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <label className="block font-medium text-sm mb-1">
            {defaultQuestions[index].question}
          </label>

          <Controller
            name={`questionnaire.${index}.answer`}
            control={control}
            rules={{ required: defaultQuestions[index].required }}
            render={({ field }) => (
              <div className="flex items-center gap-6">
                {['yes', 'no'].map((val) => (
                  <label key={val} className="inline-flex items-center">
                    <input
                      type="radio"
                      value={val}
                      checked={field.value === val}
                      onChange={() => field.onChange(val)}
                      className="mr-2"
                    />
                    {val === 'yes' ? 'Ya' : 'Tidak'}
                  </label>
                ))}
              </div>
            )}
          />

          {watch(`questionnaire.${index}.answer`) && (
            <Controller
              name={`questionnaire.${index}.explanation`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Jelaskan jawaban Anda (opsional namun disarankan)"
                />
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
