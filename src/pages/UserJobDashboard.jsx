import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AppliedJobCard from '../components/userdashboard/AppliedJobCard';
import DashboardNavbar from './DashboardNavbar';
import JobCard from '../components/userdashboard/jobcard';

const UserJobDashboard = ({ showToast }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // ✅ Load user session info from /api/me
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/me', {
          withCredentials: true,
        });

        const id = res.data?.userId;
        if (!id) throw new Error('userId missing in session');

        setUserId(id);
      } catch (err) {
        console.error('❌ Failed to load user session:', err);
        setError('User tidak ditemukan. Silakan login ulang.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch jobs + applied jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (!userId) return;

      try {
        const [jobsRes, appliedRes] = await Promise.all([
          fetch('http://localhost:5050/api/jobs', {
            credentials: 'include',
          }),
          fetch(`http://localhost:5050/api/applied-jobs/${userId}`, {
            credentials: 'include',
          }),
        ]);

        if (!jobsRes.ok) throw new Error(await jobsRes.text());
        if (!appliedRes.ok) throw new Error(await appliedRes.text());

        const jobs = await jobsRes.json();
        const applied = await appliedRes.json();

        setAllJobs(jobs);
        setAppliedJobs(applied);
        setError('');
      } catch (err) {
        console.error('❌ Failed to fetch jobs:', err);
        setError('Gagal memuat daftar pekerjaan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId]);

  const handleApplyClick = (job) => {
    navigate(`/dashboard/job/${job.id}`);
  };

  const availableJobs = allJobs.filter(
    (job) => !appliedJobs.some((aj) => aj.id === job.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
        {/* Lowongan Tersedia */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Lowongan Tersedia</h2>

          {loading ? (
            <p className="text-gray-500">Memuat lowongan...</p>
          ) : error ? (
            <div className="text-red-500 text-sm mb-4">
              {error}
              <button
                onClick={() => window.location.reload()}
                className="ml-4 text-blue-600 underline"
              >
                Coba lagi
              </button>
            </div>
          ) : availableJobs.length === 0 ? (
            <p className="text-gray-500">Tidak ada lowongan saat ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={() => handleApplyClick(job)}
                  showToast={showToast}
                />
              ))}
            </div>
          )}
        </section>

        {/* Lamaran Anda */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Lamaran Anda</h2>

          {loading ? (
            <p className="text-gray-500">Memuat lamaran...</p>
          ) : appliedJobs.length === 0 ? (
            <p className="text-gray-500">Belum ada lamaran terkirim.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appliedJobs.map((job) => (
                <AppliedJobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserJobDashboard;
