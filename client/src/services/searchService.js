import api from './api.js';

export const globalSearch = (q) => api.get('/search', { q });
