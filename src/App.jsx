import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import DaihatsuNavbar from './components/DaihatsuNavbar';
import YamahaNavbar from './components/YamahaNavbar';
import BrandLogos from './components/BrandLogos';
import Toast from './components/Toast';

import Contact from './pages/Contact';
import Career from './pages/Career';
import JobDetail from './pages/JobDetail';

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

  let ActiveNavbar = Navbar;
  if (path.startsWith('/daihatsu')) ActiveNavbar = DaihatsuNavbar;
  else if (path.startsWith('/brands/yamaha')) ActiveNavbar = YamahaNavbar;

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
      <ActiveNavbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <main>
              {/* Hero Section */}
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
                      style={{ outline: 'none' }}
                    />
                    <button onClick={handleSearch}>Search</button>
                  </div>
                </div>
              </section>

              {/* Brand Logos */}
              <BrandLogos />

              {/* Welcome */}
              <section className="welcome-section">
                <h2>Welcome</h2>
                <p>
                  Explore our selection of top-tier vehicles, book a test drive,
                  or join our growing team. Drive your future with confidence —
                  only with DriveNow.
                </p>
              </section>

              {/* Product Gallery */}
              <section className="product-gallery">
                <h2>Product's Gallery</h2>
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  speed={1000}
                  spaceBetween={30}
                  grabCursor={true}
                  slidesPerView={1}
                  slidesPerGroup={1}
                  breakpoints={{
                    640: { slidesPerView: 2, slidesPerGroup: 1 },
                    1024: { slidesPerView: 3, slidesPerGroup: 1 },
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

              {/* Footer */}
              <footer className="main-footer">
                <p>&copy; {new Date().getFullYear()} Serba Mulia Auto. All rights reserved.</p>
              </footer>
            </main>
          }
        />

        {/* Static Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/careers/:id" element={<JobDetail />} />

        {/* Daihatsu */}
        <Route path="/daihatsu" element={<Daihatsu />} />
        <Route path="/daihatsu/models" element={<DaihatsuModels />} />
        <Route path="/daihatsu/models/terios" element={<Terios />} />
        <Route path="/daihatsu/test-drive" element={<DaihatsuTestDrive />} />

        {/* Yamaha */}
        <Route path="/brands/yamaha" element={<Yamaha />} />
        <Route path="/brands/yamaha/models" element={<YamahaModels />} />
        <Route path="/brands/yamaha/test-drive" element={<YamahaTestDrive />} />

        {/* Auth */}
        <Route path="/login" element={<Login showToast={showToast} />} />
        <Route path="/signup" element={<SignUp showToast={showToast} />} />
        <Route path="/questionnaire" element={<Questionnaire />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
