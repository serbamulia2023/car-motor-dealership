import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Toast from '../components/Toast';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  // ✅ Fetch email from token
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.get(`/reset-password/${token}`);
        setEmail(res.data.email);
      } catch (err) {
        setToast({
          type: 'error',
          message: 'Link tidak valid atau telah kedaluwarsa.',
        });
      }
    };
    fetchEmail();
  }, [token]);

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return setToast({ type: 'error', message: 'Mohon isi semua kolom.' });
    }
    if (newPassword.length < 6) {
      return setToast({ type: 'error', message: 'Password harus minimal 6 karakter.' });
    }
    if (newPassword !== confirmPassword) {
      return setToast({ type: 'error', message: 'Password dan konfirmasi tidak cocok.' });
    }

    try {
      setLoading(true);
      const res = await axios.post(`/reset-password/${token}`, { newPassword });

      if (res.status === 200) {
        setToast({
          type: 'success',
          message: 'Password berhasil diubah..',
        });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        throw new Error('Unexpected server response');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengubah password.';
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      {toast && (
        <div className="absolute top-4 right-4 z-50">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}

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
              loading ? 'bg-black text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? 'Menyimpan...' : 'Ubah Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
