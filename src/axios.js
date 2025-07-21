// src/axios.js
import axios from 'axios';

// ------------------ AXIOS INSTANCE CONFIG ------------------
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050/api',
  withCredentials: true, // ✅ Required for sending cookies/session
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ------------------ RESPONSE INTERCEPTORS ------------------
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const res = error?.response;

    // 🔴 Centralized logging
    console.error(
      '[Axios Error]',
      res?.status,
      res?.statusText,
      res?.data?.message || error.message
    );

    // Optional: custom behavior
    if (res?.status === 401) {
      // Optionally trigger logout or redirect
      console.warn('⚠️ Unauthorized. User may be logged out.');
    }

    return Promise.reject(error);
  }
);

export default instance;
