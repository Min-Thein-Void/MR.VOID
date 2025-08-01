// src/Helper/axios.js (or wherever you're using it)
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ e.g., http://localhost:9000
  withCredentials: true, // ✅ send cookies like jwt
});

export default instance;
