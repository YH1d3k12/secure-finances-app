import axios from 'axios';
import { getToken, removeToken } from '../utils/auth';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // removeToken();
            // window.location.href = `${import.meta.env.BASE_URL}login`;
        }
        return Promise.reject(error);
    }
);

export default api;
