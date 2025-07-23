import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

import AppliedJobCard from '../components/userdashboard/AppliedJobCard';
import DashboardNavbar from './DashboardNavbar';
import JobCard from '../components/userdashboard/JobCard';

const UserJobDashboard = ({ showToast }) => {
  const [session, setSession] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplied, setLoadingApplied] = useState(true);

  const navigate = useNavigate();

  // Step 1: Get user session info
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get('/me');
        console.log('🟢 Session /me response:', res.data);
        const sessionData = res.data;
        if (!sessionData?.userId) throw new Error('userId not found');
        setSession(sessionData);
      } catch (err) {
        console.error('❌ Session error:', err);
        showToast?.('Sesi tidak ditemukan. Silakan login ulang.', 'error');
      }
    };

    fetchSession();
  }, []);

  // Step 2: Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/jobs');
        setAllJobs(res.data || []);
      } catch (err) {
        console.error('❌ Job fetch failed:', err);
        showToast?.('Gagal memuat lowongan.', 'error');
      } finally {
        setLoadingJobs(false);
      }
    };

    if (session?.userId) fetchJobs();
  }, [session]);

  // Step 3: Fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`/applied-jobs/${session.userId}`);
        setAppliedJobs(res.data || []);
      } catch (err) {
        console.error('❌ Applied jobs fetch failed:', err);
        showToast?.('Gagal memuat lamaran Anda.', 'error');
      } finally {
        setLoadingApplied(false);
      }
    };

    if (session?.userId) fetchAppliedJobs();
  }, [session]);

  const handleApplyClick = (job) => {
    navigate(`/dashboard/job/${job.id}`);
  };

  const unappliedJobs = allJobs.filter(
    (job) => !appliedJobs.some((applied) => applied.id === job.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
        {/* 🟦 Lowongan Tersedia */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Lowongan Tersedia</h2>

          {loadingJobs ? (
            <p className="text-gray-500">Memuat lowongan...</p>
          ) : unappliedJobs.length === 0 ? (
            <p className="text-gray-500">Tidak ada lowongan saat ini.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unappliedJobs.map((job) => (
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

        {/* 🟩 Lamaran Anda */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Lamaran Anda</h2>

          {loadingApplied ? (
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
