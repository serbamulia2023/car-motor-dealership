import React, { useState } from 'react';
import axios from '../axios'; // ✅ Use centralized axios instance
import Toast from '../components/Toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/forgot-password', { email });
      setToast({ type: 'success', message: 'Link reset dikirim ke email Anda.' });
    } catch (err) {
      setToast({ type: 'error', message: 'Gagal mengirim email. Periksa email Anda.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {toast && (
        <div className="absolute top-4 right-4 z-50">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        </div>
      )}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Lupa Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan email Anda"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded ${loading ? 'bg-black text-white py-2 rounded-md' : 'bg-gray-800 transition text-white'}`}
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>
      </div>
    </div>
  );
}
