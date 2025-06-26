import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const DashboardNavbar = ({ userPhoto, onProfileClick }) => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Left: Company logo */}
      <div
        onClick={() => navigate('/dashboard')}
        className="text-xl font-bold text-gray-800 cursor-pointer"
      >
        SerbaMulia
      </div>

      {/* Right: Profile photo */}
      <div className="relative">
        {userPhoto ? (
          <img
            src={`http://localhost:5050/${userPhoto}`}
            alt="User profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={onProfileClick}
          />
        ) : (
          <FaUserCircle
            size={40}
            className="text-gray-500 cursor-pointer"
            onClick={onProfileClick}
          />
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
