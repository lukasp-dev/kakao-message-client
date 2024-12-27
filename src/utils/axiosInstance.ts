// src/utils/axiosInstance.ts
import axios from 'axios';
console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default axiosInstance;
