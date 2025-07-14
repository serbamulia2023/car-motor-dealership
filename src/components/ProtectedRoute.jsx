import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from '../axios';

export default function ProtectedRoute({ children, allowIncompleteProfile = true }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(true); // assume true unless proven otherwise
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/me', { withCredentials: true });
        if (res.status === 200) {
          setAuthenticated(true);
          setHasProfile(res.data.hasProfile !== false); // safe for both old/new versions
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.warn('❌ Not authenticated:', error.response?.data || error.message);
        setAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) return null; // or return a spinner/loading state

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasProfile && !allowIncompleteProfile) {
    return <Navigate to="/questionnaire" state={{ from: location }} replace />;
  }

  return children;
}
