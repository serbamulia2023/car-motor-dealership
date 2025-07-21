import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DashboardNavbar from './DashboardNavbar';

const VALID_BRANDS = ['daihatsu', 'yamaha', 'castrol'];

export default function DashboardJobDetail({ showToast, user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [applied, setApplied] = useState(false);

  const hasRedirected = useRef(false);
  const userId = user?.userId;

  useEffect(() => {
    if (user === null) return;

    const fetchJobAndStatus = async () => {
      if (!userId && !hasRedirected.current) {
        hasRedirected.current = true;
        showToast?.('Anda belum login.', 'error');
        navigate('/login');
        return;
      }

      try {
        const [jobRes, profileRes] = await Promise.all([
          axios.get(`http://localhost:5050/api/jobs/${id}`),
          axios.get(`http://localhost:5050/api/me`, { withCredentials: true }),
        ]);

        const jobData = jobRes.data;
        const profile = profileRes.data;
        const p = profile?.personalInfo || {};

        const requiredFields = [
          p.fullName || p.full_name,
          p.email,
          p.birth_place,
          p.birth_date,
          p.address,
          p.phone,
          p.telepon_rumah,
          p.gender,
          p.religion,
          p.marital_status,
          p.nationality,
          p.blood_type,
        ];

        const hasAllPersonalInfo = requiredFields.every((val) => val && val.trim?.());
        const hasEducation = Array.isArray(profile.education) && profile.education.length > 0;
        const hasQuestionnaire = Array.isArray(profile.questionnaire) && profile.questionnaire.length > 0;

        const isMinimalComplete = hasAllPersonalInfo && (hasEducation || hasQuestionnaire);

        setJob(jobData);
        setProfileComplete(!!isMinimalComplete);
      } catch (error) {
        console.error('❌ Fetch error:', error);
        showToast?.('Gagal memuat data pekerjaan atau profil', 'error');
      } finally {
        setLoading(false);
      }

      const pendingId = localStorage.getItem('pendingApplyJobId');
      if (pendingId === id) localStorage.removeItem('pendingApplyJobId');
    };

    fetchJobAndStatus();
  }, [id, user, userId, navigate, showToast]);

  const handleApply = async () => {
    if (!userId) {
      showToast?.('Anda belum login.', 'error');
      return;
    }

    try {
      const { data: profile } = await axios.get('http://localhost:5050/api/me', { withCredentials: true });
      const cv = profile?.personalInfo?.cv;

      if (!cv || typeof cv !== 'string') {
        localStorage.setItem('pendingApplyJobId', id);
        showToast?.('❌ Unggah CV terlebih dahulu sebelum melamar.', 'error');
        navigate('/edit-profile');
        return;
      }

      if (!profileComplete) {
        localStorage.setItem('pendingApplyJobId', id);
        showToast?.('Lengkapi profil terlebih dahulu sebelum melamar.', 'error');
        navigate('/edit-profile');
        return;
      }

      await axios.post(
        'http://localhost:5050/api/apply',
        { userId, jobId: id },
        { withCredentials: true }
      );
      setApplied(true);
      showToast?.('Berhasil melamar pekerjaan!', 'success');

      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      console.error('❌ Gagal melamar:', err);
      showToast?.('Gagal melamar pekerjaan.', 'error');
    }
  };

  const renderBrandLogo = (brand) => {
    if (!brand) return null;
    const clean = brand.toLowerCase().trim();
    if (!VALID_BRANDS.includes(clean)) return null;

    return (
      <img
        src={`/brands/${clean}.png`}
        alt={`${clean} logo`}
        className="mx-auto mb-6 h-24 sm:h-32 md:h-40 object-contain"
        onError={(e) => (e.target.style.display = 'none')}
      />
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Memuat data pekerjaan...</div>;
  }

  if (!job) {
    return <div className="p-6 text-center text-red-500">Pekerjaan tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardNavbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-4 py-1 rounded-full text-sm hover:bg-gray-800 transition"
          >
            ← Kembali
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
          {renderBrandLogo(job.brand)}

          <h1 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            Diposting pada: {job.created_at ? formatDate(job.created_at) : 'Tanggal tidak tersedia'}
          </p>

          <div className="text-left text-gray-700 space-y-6">
            <p><strong>Perusahaan:</strong> {job.company}</p>
            <p><strong>Lokasi:</strong> {job.location}</p>

            <div>
              <strong>Deskripsi:</strong>
              <p className="whitespace-pre-line mt-1">{job.description}</p>
            </div>

            {job.responsibilities?.length > 0 && (
              <div>
                <h2 className="font-semibold mb-1">Tanggung Jawab</h2>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.qualifications?.length > 0 && (
              <div>
                <h2 className="font-semibold mb-1">Kualifikasi</h2>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  {job.qualifications.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-center pt-6">
              <button
                onClick={handleApply}
                disabled={applied}
                className={`px-6 py-2 rounded-full font-semibold text-white transition duration-200 ${
                  applied ? 'bg-green-500 cursor-default' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {applied ? 'Sudah Dilamar' : 'Lamar Pekerjaan'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white text-center text-sm py-6">
        © {new Date().getFullYear()} Serba Mulia Auto. All rights reserved.
      </footer>
    </div>
  );
}
