// src/App.jsx
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from './axios';

import Navbar from './components/Navbar';
import DaihatsuNavbar from './components/DaihatsuNavbar';
import YamahaNavbar from './components/YamahaNavbar';
import BrandLogos from './components/BrandLogos';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

import Contact from './pages/Contact';
import Career from './pages/Career';
import JobDetail from './pages/JobDetail';
import DashboardJobDetail from './pages/DashboardJobDetail';
import Daihatsu from './pages/Daihatsu';
import DaihatsuModels from './pages/DaihatsuModels';
import DaihatsuTestDrive from './pages/DaihatsuTestDrive';
import Yamaha from './pages/Yamaha';
import YamahaModels from './pages/YamahaModels';
import Xmax from './pages/Xmax';
import Lexi from './pages/Lexi';
import Nmax from './pages/Nmax';
import Aerox from './pages/Aerox';
import YamahaTestDrive from './pages/YamahaTestDrive';
import Terios from './pages/Terios';
import Xenia from './pages/Xenia';
import GranMax from './pages/GranMax';
import Sigra from './pages/Sigra';
import Ayla from './pages/Ayla';
import Luxio from './pages/Luxio';
import Sirion from './pages/Sirion';
import Rocky from './pages/Rocky';
import GranMaxPickup from './pages/GranMaxPickUp';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Questionnaire from './pages/Questionnaire';
import EditProfile from './pages/EditProfile';
import UserJobDashboard from './pages/UserJobDashboard';
import QuestionnaireGuide from './pages/QuestionnaireGuide';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import './index.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [query, setQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };

  const handleSignUpSuccess = (userData) => {
    setUser(userData);
    navigate('/questionnaire');
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('/me');
        setUser(res.data);
      } catch (err) {
        console.warn('[App] Session fetch failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    setQuery('');
  }, [path]);

  const getNavbar = () => {
    if (path.startsWith('/daihatsu')) return DaihatsuNavbar;
    if (path.startsWith('/yamaha')) return YamahaNavbar;
    if ([
      '/dashboard',
      '/edit-profile',
      '/questionnaire',
      '/reset-password'
    ].some(prefix => path.startsWith(prefix))) return null;
    return Navbar;
  };

  const handleSearch = () => {
    const term = query.toLowerCase().trim();
    if (term.includes('terios')) navigate('/daihatsu/models/terios');
    else if (term.includes('xenia')) navigate('/daihatsu/models/xenia');
    else if (term.includes('granmax')) {
      if (term.includes('pickup') || term.includes('pick up')) {
        navigate('/daihatsu/models/granmax-pickup');
      } else if (term.includes('van') || term.includes('minibus') || term.includes('blind')) {
        navigate('/daihatsu/models/granmax-van');
      } else {
        navigate('/daihatsu/models/granmax-van');
      }
    }
    else if (term.includes('sigra')) navigate('/daihatsu/models/sigra');
    else if (term.includes('sirion')) navigate('/daihatsu/models/sirion');
    else if (term.includes('rocky')) navigate('/daihatsu/models/rocky');
    else if (term.includes('ayla')) navigate('/daihatsu/models/ayla');
    else if (term.includes('luxio')) navigate('/daihatsu/models/luxio');
    else if (term.includes('daihatsu')) navigate('/daihatsu');
    else if (term.includes('yamaha')) navigate('/yamaha');
    else if (term.includes('xmax')) navigate('/yamaha/models/xmax');
    else if (term.includes('nmax')) navigate('/yamaha/models/nmax');
    else if (term.includes('aerox')) navigate('/yamaha/models/aerox');
    else if (term.includes('lexi')) navigate('/yamaha/models/lexi');
    else showToast('No matching product or brand found.');
  };

  const productImages = ['/car.jpg', '/car2.jpg', '/car.jpg', '/car2.jpg'];

  if (loading) return <div className="text-center p-10">Loading...</div>;

  const ActiveNavbar = getNavbar();

  return (
    <>
      {toast && (
        <div className="fixed inset-x-4 top-6 sm:inset-x-auto sm:right-6 z-50 w-full sm:max-w-sm mx-auto sm:mx-0">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

      {ActiveNavbar && <ActiveNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
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
                Explore our selection of top-tier vehicles, book a test drive, or join our growing team. Drive your future with confidence — only with DriveNow.
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
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
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
            <footer className="bg-[#1d1f26] text-white pt-12 px-6 md:px-24">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
                {/* Logo + Description */}
                <div className="md:col-span-7">
                  <img src="/brands/Logo Serba Mulia Auto.png" alt="Serba Mulia Auto" className="w-48 mb-4" />
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Serba Mulia Auto ditunjuk sebagai Dealer Resmi Toyota sejak tahun 1979. Serba Mulia Auto
                    meningkatkan kualitas pelayanan penjualan dan purna jualnya agar bisa menjadi perusahaan otomotif
                    pilihan utama masyarakat indonesia.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="md:col-span-5 md:pl-12 text-right">
                  <p className="text-white font-bold text-xl mb-2">
                    (+62) <span className="text-red-500">21 224 553 77</span>
                  </p>
                  <p className="text-sm text-gray-300 mb-2">cs@serbamulia.co.id</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Kirana Three Office Suite 15th Floor<br />
                    Jl. Kirana Avenue, Kelapa Gading,<br />
                    Jakarta Utara 14240, Indonesia
                  </p>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="border-t border-gray-700 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Serba Mulia Auto. All rights reserved.</p>

                {/* Larger Social Icons */}
                <div className="flex gap-6 mt-2 md:mt-0 text-white text-2xl">
                  <a
                    href="https://www.facebook.com/serbamuliamotor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-blue-500"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://twitter.com/serbamuliamotor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="hover:text-sky-400"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.instagram.com/serbamuliamotor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-pink-400"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </footer>
          </main>
        } />

        {/* Public Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/careers/:id" element={<JobDetail />} />
        <Route path="/questionnaire-guide" element={<QuestionnaireGuide />} />
        <Route path="/forgot-password" element={<ForgotPassword showToast={showToast} />} />
        <Route path="/reset-password/:token" element={<ResetPassword showToast={showToast} />} />
        <Route path="/login" element={<Login showToast={showToast} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<SignUp showToast={showToast} onLoginSuccess={handleSignUpSuccess} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute user={user}><UserJobDashboard showToast={showToast} /></ProtectedRoute>} />
        <Route path="/dashboard/job/:id" element={<ProtectedRoute user={user}><DashboardJobDetail user={user} showToast={showToast} /></ProtectedRoute>} />
        <Route path="/questionnaire" element={<ProtectedRoute user={user}><Questionnaire /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute user={user}><EditProfile /></ProtectedRoute>} />

        {/* Product Pages */}
        <Route path="/daihatsu" element={<Daihatsu />} />
        <Route path="/daihatsu/models" element={<DaihatsuModels />} />
        <Route path="/daihatsu/models/terios" element={<Terios />} />
        <Route path="/daihatsu/models/xenia" element={<Xenia />} />
        <Route path="/daihatsu/models/sigra" element={<Sigra />} />
        <Route path="/daihatsu/models/ayla" element={<Ayla />} />
        <Route path="/daihatsu/models/sirion" element={<Sirion />} />
        <Route path="/daihatsu/models/rocky" element={<Rocky />} />
        <Route path="/daihatsu/models/luxio" element={<Luxio />} />
        <Route path="/daihatsu/models/granmax-van" element={<GranMax />} />
        <Route path="/daihatsu/models/granmax-pickup" element={<GranMaxPickup />} />
        <Route path="/daihatsu/test-drive" element={<DaihatsuTestDrive />} />
        <Route path="/yamaha" element={<Yamaha />} />
        <Route path="/yamaha/models" element={<YamahaModels />} />
        <Route path="/yamaha/models/xmax" element={<Xmax />} />
        <Route path="/yamaha/models/lexi" element={<Lexi />} />
        <Route path="/yamaha/models/nmax" element={<Nmax />} />
        <Route path="/yamaha/models/aerox" element={<Aerox />} />
        <Route path="/yamaha/test-drive" element={<YamahaTestDrive />} />

        {/* 404 Fallback */}
        <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '4rem' }}>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;