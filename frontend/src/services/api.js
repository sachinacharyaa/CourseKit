import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

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

export default api;
