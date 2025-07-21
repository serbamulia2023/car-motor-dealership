import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function DashboardNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    photo: 'http://localhost:5050/uploads/profile-default.jpg',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/me', {
          credentials: 'include',
        });

        if (res.status === 401) {
          console.warn('🔒 Not authenticated, redirecting to login...');
          return navigate('/login');
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('✅ Fetched /api/me:', data);

        const fullName =
          data.personalInfo?.full_name || data.full_name || data.name || 'User';

        const photoUrl = data.personalInfo?.photo?.startsWith('http')
          ? data.personalInfo.photo
          : 'http://localhost:5050/uploads/profile-default.jpg';

        setUserProfile({
          name: fullName,
          photo: photoUrl,
        });
      } catch (err) {
        console.error('❌ Error fetching profile:', err.message || err);
        setUserProfile({
          name: 'User',
          photo: 'http://localhost:5050/uploads/profile-default.jpg',
        });
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-10">
        <img
          src="/brands/Logo Serba Mulia Auto.png"
          alt="Logo"
          className="w-32 h-auto cursor-pointer -mt-2"
          onClick={() => navigate('/dashboard')}
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex gap-8 text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Contact Us
        </NavLink>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <span className="text-gray-800 font-medium hidden sm:inline">
          Hello, {userProfile.name}
        </span>
        <img
          src={userProfile.photo}
          alt="Profile"
          className="w-10 h-10 rounded-full border object-cover cursor-pointer"
          onClick={toggleDrawer}
        />
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-lg border-l z-50 px-6 py-6 flex flex-col">
          <button
            className="text-gray-500 absolute top-4 right-4 text-2xl"
            onClick={toggleDrawer}
          >
            ✕
          </button>

          <div className="mt-10 flex flex-col items-center text-center">
            <img
              src={userProfile.photo}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border mb-3"
            />
            <p className="text-lg font-semibold text-gray-800">
              {userProfile.name}
            </p>
          </div>

          <hr className="my-6 border-t" />

          <ul className="space-y-4 px-4">
            <li
              className="cursor-pointer text-blue-600 hover:underline text-base font-medium"
              onClick={() => {
                navigate('/edit-profile');
                toggleDrawer();
              }}
            >
              Edit Profile
            </li>
            <li
              className="cursor-pointer text-red-600 hover:underline text-base font-medium"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
