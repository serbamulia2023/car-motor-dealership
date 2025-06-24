import { Link, useLocation, useNavigate } from 'react-router-dom';
import './DaihatsuNavbar.css'; // ✅ Correct import for regular CSS

export default function DaihatsuNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (path === '/daihatsu') {
      navigate('/');
    } else {
      navigate('/daihatsu');
    }
  };

  return (
    <nav className="daihatsu-navbar">
      <div className="navbar-wrapper">
        <div className="navbar-left">
         <div className="logo">
            <img src="/brands/daihatsu.png" alt="Daihatsu Logo" className="navbarLogo" />
         </div>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <a href="/" onClick={handleHomeClick}>Home</a>
            </li>
            <li>
              <Link to="/daihatsu/models">Models</Link>
            </li>
            <li>
              <Link to="/daihatsu/test-drive">Book Test Drive</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
