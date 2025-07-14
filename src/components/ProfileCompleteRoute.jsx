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
        setAllowed(res.data?.profileComplete);
      })
      .catch(() => setAllowed(false))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;

  return allowed ? children : <Navigate to="/questionnaire" replace />;
}
