import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function DaihatsuNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (path === '/daihatsu') {
      navigate('/');
    } else {
      navigate('/daihatsu');
    }
  };

  // Lock scroll on drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-white z-50 shadow flex items-center px-4 justify-between">
        {/* Logo */}
        <Link to="/daihatsu" className="flex items-center gap-2">
          <img src="/brands/daihatsu.png" alt="Daihatsu Logo" className="h-10" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(true)} className="md:hidden text-2xl text-gray-700">
          <FaBars />
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <li>
            <a
              href="/"
              onClick={handleHomeClick}
              className={path === '/daihatsu' ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500'}
            >
              Home
            </a>
          </li>
          <li>
            <Link to="/daihatsu/models" className="text-gray-700 hover:text-red-500">Models</Link>
          </li>
          <li>
            <Link to="/daihatsu/test-drive" className="text-gray-700 hover:text-red-500">Book Test Drive</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Right Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30" onClick={() => setMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 w-[260px] max-w-xs h-screen bg-white shadow-lg z-50 pt-12 px-6 flex flex-col space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-700"
            >
              <FaTimes />
            </button>

            <a
              href="/"
              onClick={(e) => {
                handleHomeClick(e);
                setMenuOpen(false);
              }}
              className={path === '/daihatsu' ? 'text-red-600 font-semibold' : 'text-gray-800'}
            >
              Home
            </a>
            <Link to="/daihatsu/models" onClick={() => setMenuOpen(false)} className="text-gray-800">
              Models
            </Link>
            <Link to="/daihatsu/test-drive" onClick={() => setMenuOpen(false)} className="text-gray-800">
              Book Test Drive
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
