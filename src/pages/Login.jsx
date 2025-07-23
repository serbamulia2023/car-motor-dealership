import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Toast from '../components/Toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // 🔄 Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  // ✅ Handle login and store userId + email
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5050/api/login',
        form,
        { withCredentials: true }
      );

      const { userId, email } = res.data;

      // ✅ Store both userId and email in localStorage
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ userId, email })
      );

      setToast({ message: 'Login berhasil!', type: 'success' });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setToast({ message: 'Email atau password salah.', type: 'error' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* ✅ Toast Notification */}
      {toast && (
        <div className="absolute top-4 right-3 transform -translate-x-1/2 z-50">
          <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login ke Akun Anda</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="text-right mt-1">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Lupa password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Belum punya akun?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
