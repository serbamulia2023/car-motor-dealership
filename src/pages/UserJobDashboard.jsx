import React, { useEffect, useState } from 'react';
import DashboardNavbar from '../components/userdashboard/DashboardNavbar';
import JobCard from '../components/userdashboard/JobCard';
import AppliedJobCard from '../components/userdashboard/AppliedJobCard';

const UserJobDashboard = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  // Fetch jobs (later from backend)
  useEffect(() => {
    const jobList = [
      { id: 1, title: 'Software Engineer', company: 'Serba Mulia', location: 'Jakarta' },
      { id: 2, title: 'Product Manager', company: 'Serba Mulia', location: 'Remote' },
      { id: 3, title: 'UI/UX Designer', company: 'Serba Mulia', location: 'Bandung' },
    ];
    setAllJobs(jobList);
  }, []);

  const checkQuestionnaireComplete = () => {
    const saved = localStorage.getItem('formData');
    if (!saved) return false;

    try {
      const data = JSON.parse(saved);
      return (
        data.personalInfo?.fullName &&
        data.pdaAccepted?.first &&
        data.pdaAccepted?.second
      );
    } catch {
      return false;
    }
  };

  const handleApply = (job) => {
    if (!checkQuestionnaireComplete()) {
      alert('❌ Please complete the questionnaire before applying.');
      return;
    }

    if (appliedJobs.find((j) => j.id === job.id)) {
      alert('⚠️ You have already applied to this job.');
      return;
    }

    setAppliedJobs((prev) => [...prev, job]);
    alert(`✅ Successfully applied to ${job.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="max-w-5xl mx-auto py-8 px-4 space-y-10">
        {/* Available Jobs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
          {allJobs.length === 0 ? (
            <p className="text-gray-500">No job listings available right now.</p>
          ) : (
            <div className="grid gap-4">
              {allJobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={() => handleApply(job)} />
              ))}
            </div>
          )}
        </section>

        {/* Applied Jobs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Applied Jobs</h2>
          {appliedJobs.length === 0 ? (
            <p className="text-gray-500">You haven't applied to any jobs yet.</p>
          ) : (
            <div className="grid gap-4">
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
