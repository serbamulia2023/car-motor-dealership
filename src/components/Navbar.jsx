import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../index.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar-left">Serba Mulia Auto</div>

        <div className="navbar-right">
          {isMobile && !menuOpen && (
            <div className="hamburger" onClick={() => setMenuOpen(true)}>
              <FaBars size={22} />
            </div>
          )}

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {isMobile && (
              <li className="close-icon" onClick={() => setMenuOpen(false)}>
                <FaTimes size={22} />
              </li>
            )}
            {['/', '/contact', '/careers'].map((path, idx) => {
              const text = ['Home', 'Contact', 'Careers'][idx];
              return (
                <li key={path}>
                  <Link to={path}>{text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
