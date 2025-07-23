import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../index.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Track screen size
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <Link to="/">
            <img
              src="/brands/Logo Serba Mulia Auto.png"
              alt="Serba Mulia Auto"
              className="h-10 object-contain"
            />
          </Link>
        </div>

        <div className="navbar-right">
          {isMobile ? (
            <>
              {!menuOpen && (
                <div className="hamburger" onClick={() => setMenuOpen(true)}>
                  <FaBars size={22} />
                </div>
              )}

              <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <div className="close-icon" onClick={() => setMenuOpen(false)}>
                  <FaTimes size={22} />
                </div>
                <ul className="nav-links-vertical">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                </ul>
              </div>
            </>
          ) : (
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
