import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfileCompleteRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setAllowed(false);
      setChecked(true);
      return;
    }

    axios
      .get('http://localhost:5050/api/me', {
        headers: { 'x-user-id': userId },
        withCredentials: true,
      })
      .then((res) => {
        const profile = res.data;

        const hasFullName = profile?.personalInfo?.fullName?.trim();
        const hasEmail = profile?.personalInfo?.email?.trim();
        const hasEducation = Array.isArray(profile.education) && profile.education.length > 0;
        const hasQuestionnaire = Array.isArray(profile.questionnaire) && profile.questionnaire.length > 0;

        const isComplete = hasFullName && hasEmail && (hasEducation || hasQuestionnaire);

        setAllowed(!!isComplete);
      })
      .catch(() => setAllowed(false))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;

  return allowed ? children : <Navigate to="/questionnaire" replace />;
}
