import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Toast from '../components/Toast'; 

export default function ResetPassword({ showToast }) {
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ Fetch email from token
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.get(`/reset-password/${token}`);
        setEmail(res.data.email);
      } catch (err) {
        showToast?.('❌ Link tidak valid atau telah kedaluwarsa.', 'error');
      }
    };
    fetchEmail();
  }, [token, showToast]);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return showToast?.('❌ Mohon isi semua kolom.', 'error');
    }
    if (newPassword.length < 6) {
      return showToast?.('❌ Password harus minimal 6 karakter.', 'error');
    }
    if (newPassword !== confirmPassword) {
      return showToast?.('❌ Password dan konfirmasi tidak cocok.', 'error');
    }

    try {
      setLoading(true);
      await axios.post(`/reset-password/${token}`, { newPassword });
      showToast?.('✅ Password berhasil diubah. Anda akan diarahkan ke login...', 'success');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      showToast?.(err.response?.data?.message || '❌ Gagal mengubah password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border bg-gray-100 text-gray-500 rounded px-3 py-2 cursor-not-allowed"
            />
          </div>

          {/* Password Baru */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password Baru</label>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 pr-10"
              placeholder="Minimal 6 karakter"
              required
              minLength={6}
            />
            <div
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-9 text-gray-600 cursor-pointer"
            >
              {showNew ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Konfirmasi Password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 pr-10"
              required
            />
            <div
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-600 cursor-pointer"
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Menyimpan...' : 'Ubah Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
