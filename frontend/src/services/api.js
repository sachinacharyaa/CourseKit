import axios from 'axios';

// API Base URL configuration
// In development: use VITE_API_BASE_URL from .env or fallback to localhost
// In production: use VITE_API_BASE_URL from Vercel environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log errors in development
        if (import.meta.env.DEV) {
            console.error('API Error:', error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

// User APIs
export const userSignup = (data) => api.post('/user/signup', data);
export const userSignin = (data) => api.post('/user/signin', data);
export const getUserPurchases = () => api.get('/user/purchases');

// Admin APIs
export const adminSignup = (data) => api.post('/admin/signup', data);
export const adminSignin = (data) => api.post('/admin/signin', data);
export const createCourse = (data) => api.post('/admin/create', data);
export const editCourse = (data) => api.post('/admin/edit', data);
export const deleteCourse = (data) => api.post('/admin/delete', data);
export const getAdminCourses = () => api.post('/admin/course/bulk');

// Course APIs
export const getCourses = () => api.post('/course/preview');
export const purchaseCourse = (courseId) => api.post('/course/purchase', { courseId });

// Feedback API (no authentication required)
export const submitFeedback = (data) => api.post('/feedback', data);

// Health check utility (useful for debugging)
export const checkApiHealth = () => api.get('/health');

export default api;
