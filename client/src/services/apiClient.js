// client/src/services/apiClient.js
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY || "claveadmin123";

// Crear instancia Axios
const instance = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor para agregar token de usuario si existe
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// ===============================
// Funciones IA
// ===============================

export const sendCodeToAI = async (code, mode = "analizar") => {
  const response = await instance.post('/ai/analyze', { code, mode }, {
    headers: { 'x-admin-key': ADMIN_KEY }
  });
  return response.data;
};

export const generateCodeAI = async (instructions, language = "JS") => {
  const response = await instance.post('/ai/generate', { instructions, language }, {
    headers: { 'x-admin-key': ADMIN_KEY }
  });
  return response.data;
};

export const analyzeFileAI = async (filePath) => {
  const response = await instance.post('/ai/analyze-file', { filePath }, {
    headers: { 'x-admin-key': ADMIN_KEY }
  });
  return response.data;
};

export const saveFileAI = async (filePath, content) => {
  const response = await instance.post('/ai/save-file', { filePath, content }, {
    headers: { 'x-admin-key': ADMIN_KEY }
  });
  return response.data;
};

export default instance;
