import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicPaths = ['/login', '/signup', '/forgot-password'];
    const isPublic = publicPaths.includes(location.pathname);

    const fetchProfile = async () => {
      try {
        const res = await axios.get('/me'); // ✅ uses /api/me under the hood
        setProfile(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          if (!isPublic) console.warn('⚠️ User not authenticated');
        } else {
          console.error('❌ Unexpected auth error:', err);
        }
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (isPublic) {
      setLoading(false);
    } else {
      fetchProfile();
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
