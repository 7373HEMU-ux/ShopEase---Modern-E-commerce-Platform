import axios from 'axios';

const API = axios.create({ 
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://YOUR-RAILWAY-URL.railway.app/api'  // Replace with your actual Railway URL
    : 'http://localhost:5000/api' 
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;



