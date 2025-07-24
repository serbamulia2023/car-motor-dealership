import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

export default function DashboardNavbar({ user, onLogout }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile from /api/me
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/me', {
          credentials: 'include',
        });

        if (res.status === 401) {
          console.warn('🔒 Not authenticated');
          return navigate('/login');
        }

        const data = await res.json();

        const fullName =
          data?.personalInfo?.full_name || data?.full_name || data?.name || 'User';

        const photoUrl =
          data?.personalInfo?.photo?.startsWith('http')
            ? data.personalInfo.photo
            : 'http://localhost:5050/uploads/profile-default.jpg';

        setUserProfile({ name: fullName, photo: photoUrl });
      } catch (err) {
        console.error('❌ Failed to fetch profile:', err.message || err);
        setUserProfile(null);
      }
    };

    fetchProfile();
  }, [navigate]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const displayName =
    userProfile?.name || user?.full_name || user?.name || 'User';

  const displayPhoto =
    userProfile?.photo || 'http://localhost:5050/uploads/profile-default.jpg';

  const handleLogoutClick = () => {
    toggleDrawer();
    onLogout?.();
  };

  const handleNavigate = (path, options = {}) => {
    toggleDrawer();
    navigate(path, options);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <img
        src="/brands/Logo Serba Mulia Auto.png"
        alt="Logo"
        className="w-32 h-auto cursor-pointer -mt-2"
        onClick={() => navigate('/dashboard')}
      />

      {/* Desktop Nav Center */}
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
          onClick={() => localStorage.setItem('navbarSource', 'dashboard')}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'
          }
        >
          Contact Us
        </NavLink>
      </div>

      {/* Profile Avatar */}
      <div className="flex items-center gap-4">
        <span className="text-gray-800 font-medium hidden sm:inline">
          Hello, {displayName}
        </span>
        <img
          src={displayPhoto}
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
              src={displayPhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border mb-3"
            />
            <p className="text-lg font-semibold text-gray-800">
              {displayName}
            </p>
          </div>

          <hr className="my-6 border-t" />

          {/* Mobile Nav */}
          <div className="sm:hidden mb-6 space-y-4 px-4">
            <div
              className="cursor-pointer text-gray-700 hover:text-blue-600 text-base font-medium"
              onClick={() => handleNavigate('/dashboard')}
            >
              Home
            </div>
            <div
              className="cursor-pointer text-gray-700 hover:text-blue-600 text-base font-medium"
              onClick={() => {
                localStorage.setItem('navbarSource', 'dashboard');
                handleNavigate('/contact');
              }}
            >
              Contact Us
            </div>
          </div>

          {/* Drawer Actions */}
          <ul className="space-y-4 px-4">
            <li
              className="cursor-pointer text-blue-600 hover:underline text-base font-medium"
              onClick={() => handleNavigate('/edit-profile')}
            >
              Edit Profile
            </li>
            <li
              className="cursor-pointer text-red-600 hover:underline text-base font-medium"
              onClick={handleLogoutClick}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
