// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5050/api',
  withCredentials: true, // ✅ REQUIRED to send cookies/session
});

export default instance;
