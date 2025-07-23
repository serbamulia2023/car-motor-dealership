import { Link, useLocation, useNavigate } from 'react-router-dom';
import './YamahaNavbar.css'; // ✅ Match Daihatsu structure

export default function YamahaNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (path === '/brands/yamaha') {
      navigate('/');
    } else {
      navigate('/brands/yamaha');
    }
  };

  return (
    <nav className="yamaha-navbar">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <div className="logo">
            <img src="/brands/yamaha.png" alt="Yamaha Logo" className="navbarLogo" />
          </div>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <a href="/" onClick={handleHomeClick}>Home</a>
            </li>
            <li>
              <Link to="/brands/yamaha/models">Models</Link>
            </li>
            <li>
              <Link to="/brands/yamaha/test-drive">Book Test Drive</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
