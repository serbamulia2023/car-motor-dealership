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
import Filano from './pages/Filano';
import Fazzio from './pages/Fazzio';
import Gear125 from './pages/Gear125';
import Freego from './pages/Freego';
import Xride from './pages/Xride';
import MioM3 from './pages/MioM3';
import Fino from './pages/Fino';
import XSR from './pages/XSR';
import R15 from './pages/R15';
import R25 from './pages/R25';
import Mt25 from './pages/Mt25';
import Mt15 from './pages/Mt15';
import Vixion from './pages/Vixion';
import WR155R from './pages/WR155R';
import Yz125x from './pages/Yz125x';
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
import Yz250Series from './pages/Yz250Series';
import Mxking from './pages/MxKing';
import VegaForce from './pages/VegaForce'
import JupiterZ1 from './pages/JupiterZ1';
import DashboardNavbar from './pages/DashboardNavbar';

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
    localStorage.removeItem('navbarSource'); // ✅ clear override
    setUser(userData);
    navigate('/dashboard');
  };

  const handleSignUpSuccess = (userData) => {
    localStorage.removeItem('navbarSource'); // ✅ clear override
    setUser(userData);
    navigate('/questionnaire');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout'); // or whatever invalidates the session on backend
    } catch (err) {
      console.warn('Failed to logout on backend:', err);
    }

    setUser(null);
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('navbarSource');
    navigate('/');
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
    const brandPaths = ['/daihatsu', '/yamaha'];
    const isBrandPath = brandPaths.some((prefix) => path.startsWith(prefix));
    const isContact = path === '/contact';

    // Clear navbarSource if not on brand page or contact with 'from'
    if (!isBrandPath && !isContact && !path.startsWith('/dashboard')) {
      localStorage.removeItem('navbarSource');
    }
  }, [path]);

  useEffect(() => {
    setQuery('');
  }, [path]);

 
  const getNavbar = () => {
    const noNavbarPaths = ['/edit-profile', '/questionnaire', '/reset-password'];
    const override = localStorage.getItem('navbarSource');

    // ❌ Don't show navbar on some paths
    if (noNavbarPaths.some((prefix) => path.startsWith(prefix))) return null;

    // ✅ Always show DashboardNavbar when logged in and not on brand-specific pages
    if (user && !path.startsWith('/daihatsu') && !path.startsWith('/yamaha')) {
      return () => <DashboardNavbar user={user} onLogout={handleLogout} />;
    }

    // 🌐 Show forced brand navbar
    if (override === 'daihatsu') return DaihatsuNavbar;
    if (override === 'yamaha') return YamahaNavbar;

    // ✅ Only show brand navbar when not logged in (fallback for public brand pages)
    if (!user) {
      if (path.startsWith('/daihatsu')) return DaihatsuNavbar;
      if (path.startsWith('/yamaha')) return YamahaNavbar;
    }

    // Default fallback
    return Navbar;
  };


  const ActiveNavbar = getNavbar();

  const handleSearch = () => {
    const term = query.toLowerCase().trim();
    if (term.includes('terios')) navigate('/daihatsu/models/terios');
    else if (term.includes('xenia')) navigate('/daihatsu/models/xenia');
    else if (term.includes('granmax')) {
      if (term.includes('pickup')) navigate('/daihatsu/models/granmax-pickup');
      else navigate('/daihatsu/models/granmax-van');
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
    else if (term.includes('filano')) navigate('/yamaha/models/filano');
    else if (term.includes('fazzio')) navigate('/yamaha/models/fazzio');
    else if (term.includes('gear')) navigate('/yamaha/models/gear125');
    else if (term.includes('freego')) navigate('/yamaha/models/freego');
    else if (term.includes('xride')) navigate('/yamaha/models/xride');
    else if (term.includes('mio')) navigate('/yamaha/models/miom3');
    else if (term.includes('fino')) navigate('/yamaha/models/fino');
    else if (term.includes('xsr')) navigate('/yamaha/models/xsr');
    else if (term.includes('r15')) navigate('/yamaha/models/r15');
    else if (term.includes('r25')) navigate('/yamaha/models/r25');
    else if (term.includes('mt25')) navigate('/yamaha/models/mt25');
    else if (term.includes('mt15')) navigate('/yamaha/models/mt15');
    else if (term.includes('vixion')) navigate('/yamaha/models/vixion');
    else if (term.includes('wr155')) navigate('/yamaha/models/wr155r');
    else if (term.includes('yz125x')) navigate('/yamaha/models/yz125x');
    else if (term.includes('yz250series')) navigate('/yamaha/models/yz250series');
    else if (term.includes('mxking')) navigate('/yamaha/models/mxking');
    else if (term.includes('jupiterz1')) navigate('/yamaha/models/jupiterz1');
    else if (term.includes('vegaforce')) navigate('/yamaha/models/vegaforce');
    else showToast('No matching product or brand found.');
  };

  const productImages = ['/car.jpg', '/car2.jpg', '/car.jpg', '/car2.jpg'];

  if (loading) return <div className="text-center p-10">Loading...</div>;

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
              <img src="/serbamuliaauto.jpg" alt="Hero Car" className="hero-img" />
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
        <Route path="/yamaha/models/xride" element={<Xride />} />
        <Route path="/yamaha/models/nmax" element={<Nmax />} />
        <Route path="/yamaha/models/aerox" element={<Aerox />} />
        <Route path="/yamaha/models/filano" element={<Filano />} />
        <Route path="/yamaha/models/fazzio" element={<Fazzio />} />
        <Route path="/yamaha/models/gear125" element={<Gear125 />} />
        <Route path="/yamaha/models/freego" element={<Freego />} />
        <Route path="/yamaha/models/miom3" element={<MioM3 />} />
        <Route path="/yamaha/models/fino" element={<Fino />} />
        <Route path="/yamaha/models/xsr" element={<XSR />} />
        <Route path="/yamaha/models/r15" element={<R15 />} />
        <Route path="/yamaha/models/r25" element={<R25 />} />
        <Route path="/yamaha/models/mt25" element={<Mt25 />} />
        <Route path="/yamaha/models/mt15" element={<Mt15 />} />
        <Route path="/yamaha/models/vixion" element={<Vixion />} />
        <Route path="/yamaha/models/wr155r" element={<WR155R />} />
        <Route path="/yamaha/models/yz125x" element={<Yz125x />} />
        <Route path="/yamaha/models/yz250series" element={<Yz250Series />} />
        <Route path="/yamaha/models/mxking" element={<Mxking />} />
        <Route path="/yamaha/models/jupiterz1" element={<JupiterZ1 />} />
        <Route path="/yamaha/models/vegaforce" element={<VegaForce />} />
        <Route path="/yamaha/test-drive" element={<YamahaTestDrive />} />

        {/* 404 Fallback */}
        <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '4rem' }}>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;