import api from './api.js';

export const listScholarships = (filters = {}) => api.get('/scholarships', filters);
export const getScholarship = (slug) => api.get(`/scholarships/${slug}`);
export const listScholarshipCategories = () => api.get('/scholarships/categories');
