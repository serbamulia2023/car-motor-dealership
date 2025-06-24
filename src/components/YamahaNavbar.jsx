import { Link, useLocation, useNavigate } from 'react-router-dom';
import './YamahaNavbar.css';

export default function YamahaNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleHomeClick = (e) => {
    e.preventDefault();

    if (path === '/brands/yamaha') {
      navigate('/'); // from brand homepage to main homepage
    } else {
      navigate('/brands/yamaha'); // from subpages to brand homepage
    }
  };

  const handleContactClick = (e) => {
    if (path === '/brands/yamaha') {
      // already on brand homepage → scroll
      return; // allow anchor href to scroll
    }

    e.preventDefault();
    navigate('/brands/yamaha#yamaha-contact');
  };

  return (
    <nav className="navbar yamaha-navbar">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <h1 className="logo">Yamaha</h1>
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
