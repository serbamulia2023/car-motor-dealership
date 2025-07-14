import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardNavbar from './DashboardNavbar';

const VALID_BRANDS = ['daihatsu', 'yamaha', 'castrol'];

export default function DashboardJobDetail({ showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const [applied, setApplied] = useState(false);

  // ✅ Correctly get userId from localStorage
  const storedUser = localStorage.getItem('loggedInUser');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.userId;

  useEffect(() => {
    const fetchJobAndStatus = async () => {
      if (!userId) {
        showToast?.('Anda belum login.', 'error');
        navigate('/login');
        return;
      }

      try {
        const [jobRes, profileRes] = await Promise.all([
          axios.get(`http://localhost:5050/api/jobs/${id}`),
          axios.get(`http://localhost:5050/api/me`, {
            headers: { 'x-user-id': userId },
            withCredentials: true,
          }),
        ]);

        setJob(jobRes.data);
        setProfileComplete(profileRes.data?.profileComplete || false);
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
  }, [id, userId, showToast, navigate]);

  const handleApply = async () => {
    if (!userId) {
      showToast?.('Anda belum login.', 'error');
      return;
    }

    if (!profileComplete) {
      localStorage.setItem('pendingApplyJobId', id);
      navigate('/edit-profile');
      showToast?.('Lengkapi profil terlebih dahulu sebelum melamar.', 'error');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5050/api/apply',
        { userId, jobId: id },
        { withCredentials: true }
      );
      setApplied(true);
      showToast?.('Berhasil melamar pekerjaan!', 'success');
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

  if (loading) return <div className="p-6 text-center text-gray-500">Memuat data pekerjaan...</div>;
  if (!job) return <div className="p-6 text-center text-red-500">Pekerjaan tidak ditemukan.</div>;

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
