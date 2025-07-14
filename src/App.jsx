import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import DaihatsuNavbar from './components/DaihatsuNavbar';
import YamahaNavbar from './components/YamahaNavbar';
import BrandLogos from './components/BrandLogos';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

import Contact from './pages/Contact';
import Career from './pages/Career';
import JobDetail from './pages/JobDetail';
import DashboardJobDetail from './pages/DashboardJobDetail';

import Daihatsu from './pages/Daihatsu';
import DaihatsuModels from './pages/DaihatsuModels';
import DaihatsuTestDrive from './pages/DaihatsuTestDrive';

import Yamaha from './pages/Yamaha';
import YamahaModels from './pages/YamahaModels';
import YamahaTestDrive from './pages/YamahaTestDrive';

import Terios from './pages/Terios';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Questionnaire from './pages/Questionnaire';
import EditProfile from './pages/EditProfile';
import UserJobDashboard from './pages/UserJobDashboard';

import './index.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

function App() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  // Determine which navbar to show
  let ActiveNavbar = Navbar;
  if (path.startsWith('/daihatsu')) ActiveNavbar = DaihatsuNavbar;
  else if (path.startsWith('/brands/yamaha')) ActiveNavbar = YamahaNavbar;
  else if (path.startsWith('/dashboard')) ActiveNavbar = null;

  // Hide ALL navbars on these routes
  const hideHeaderRoutes = ['/edit-profile'];
  if (hideHeaderRoutes.includes(path)) ActiveNavbar = null;

  const handleSearch = () => {
    const term = query.toLowerCase().trim();
    if (term.includes('terios')) navigate('/daihatsu/models/terios');
    else if (term.includes('daihatsu')) navigate('/daihatsu');
    else if (term.includes('yamaha')) navigate('/brands/yamaha');
    else if (term.includes('ayla')) navigate('/daihatsu/models');
    else showToast('No matching product or brand found.');
  };

  const productImages = [
    '/car.jpg', '/car2.jpg', '/car.jpg', '/car2.jpg', '/car.jpg', '/car2.jpg'
  ];

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}
      {ActiveNavbar && <ActiveNavbar />}

      <Routes>
        {/* 🌐 Landing Page */}
        <Route
          path="/"
          element={
            <main>
              <section className="hero">
                <img src="/car.jpg" alt="Hero Car" className="hero-img" />
                <div className="hero-overlay-text">
                  <h1 className="hero-title">The easiest way to buy a car</h1>
                  <p className="hero-subtitle">Drive your dream car down the stylish streets.</p>
                  <div className="hero-search-box">
                    <input
                      type="text"
                      placeholder="Enter car brand or model to search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}>Search</button>
                  </div>
                </div>
              </section>

              <BrandLogos />

              <section className="welcome-section">
                <h2>Welcome</h2>
                <p>
                  Explore our selection of top-tier vehicles, book a test drive,
                  or join our growing team. Drive your future with confidence —
                  only with DriveNow.
                </p>
              </section>

              <section className="product-gallery">
                <h2>Product's Gallery</h2>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  loop
                  speed={1000}
                  spaceBetween={30}
                  grabCursor
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {productImages.map((src, index) => (
                    <SwiperSlide key={index}>
                      <div className="product-card">
                        <img src={src} alt={`Product ${index + 1}`} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>

              <footer className="main-footer">
                <p>&copy; {new Date().getFullYear()} Serba Mulia Auto. All rights reserved.</p>
              </footer>
            </main>
          }
        />

        {/* 🔓 Public Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/careers/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login showToast={showToast} />} />
        <Route path="/signup" element={<SignUp showToast={showToast} />} />

        {/* 🔐 Dashboard Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserJobDashboard showToast={showToast} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/job/:id"
          element={
            <ProtectedRoute>
              <DashboardJobDetail showToast={showToast} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* 🚗 Vehicle Pages */}
        <Route path="/daihatsu" element={<Daihatsu />} />
        <Route path="/daihatsu/models" element={<DaihatsuModels />} />
        <Route path="/daihatsu/models/terios" element={<Terios />} />
        <Route path="/daihatsu/test-drive" element={<DaihatsuTestDrive />} />
        <Route path="/brands/yamaha" element={<Yamaha />} />
        <Route path="/brands/yamaha/models" element={<YamahaModels />} />
        <Route path="/brands/yamaha/test-drive" element={<YamahaTestDrive />} />

        {/* 🧱 Fallback */}
        <Route
          path="*"
          element={<h1 style={{ textAlign: 'center', marginTop: '4rem' }}>404 - Page Not Found</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
