import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function DaihatsuNavbar() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm px-6 py-2 flex items-center justify-between">
      {/* Logo container with fixed height and overflow hidden */}
      <div className="flex items-center">
        <div className="h-[36px] sm:h-[44px] overflow-hidden flex items-center">
          <img
            src="/brands/Logo Serba Mulia Auto.png"
            alt="Serba Mulia Auto"
            className="h-auto max-h-none w-auto scale-[0.7] sm:scale-[0.75] -mt-6 sm:-mt-5 cursor-pointer"
            onClick={() => navigate('/daihatsu')}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex gap-8 text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
        <NavLink
          to="/daihatsu"
          className={({ isActive }) =>
            isActive ? 'text-red-600 font-semibold' : 'hover:text-red-600'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/daihatsu/models"
          className={({ isActive }) =>
            isActive ? 'text-red-600 font-semibold' : 'hover:text-red-600'
          }
        >
          Models
        </NavLink>
        <NavLink
          to="/daihatsu/test-drive"
          className={({ isActive }) =>
            isActive ? 'text-red-600 font-semibold' : 'hover:text-red-600'
          }
        >
          Book Test Drive
        </NavLink>
      </div>

      {/* Layout spacer */}
      <div className="w-24 sm:w-28" />
    </div>
  );
}
