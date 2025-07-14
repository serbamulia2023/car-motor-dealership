import { useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicPaths = ['/login', '/signup', '/forgot-password'];
    if (publicPaths.includes(location.pathname)) {
      setLoading(false); // Skip auth check
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/me', {
          withCredentials: true,
        });
        setProfile(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setProfile(null); // expected on public routes
        } else {
          console.error('❌ Unexpected auth error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
