import api from './api.js';

export const listUniversities = (filters = {}) => api.get('/universities', filters);
export const getUniversity = (slug) => api.get(`/universities/${slug}`);
