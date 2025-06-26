import React from 'react';

const defaultQuestions = [
  { question: 'Apakah anda pernah melamar di perusahaan ini sebelumnya?', required: true },
  { question: 'Selain di sini, di perusahaan mana lagi anda sedang melamar?', required: true },
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

const QuestionnaireSection = ({ data = [], setData }) => {
  const questions = data.length > 0
    ? data
    : defaultQuestions.map(q => ({ ...q, answer: '', explanation: '' }));

  const handleAnswer = (index, value) => {
    const updated = [...questions];
    updated[index].answer = value;
    setData(updated);
  };

  const handleExplanation = (index, value) => {
    const updated = [...questions];
    updated[index].explanation = value;
    setData(updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Pertanyaan Tambahan</h3>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <label className="block font-medium text-sm mb-1">{q.question}</label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question-${index}`}
                value="yes"
                checked={q.answer === 'yes'}
                onChange={() => handleAnswer(index, 'yes')}
                className="mr-2"
                required={q.required}
              />
              Ya
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`question-${index}`}
                value="no"
                checked={q.answer === 'no'}
                onChange={() => handleAnswer(index, 'no')}
                className="mr-2"
                required={q.required}
              />
              Tidak
            </label>
          </div>
          {(q.answer === 'yes' || q.answer === 'no') && (
            <input
              type="text"
              value={q.explanation || ''}
              onChange={(e) => handleExplanation(index, e.target.value)}
              className="mt-2 w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Jelaskan jawaban Anda (opsional namun disarankan)"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionnaireSection;
