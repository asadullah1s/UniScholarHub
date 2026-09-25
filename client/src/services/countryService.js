import api from './api.js';

export const listCountries = () => api.get('/countries');
export const getCountry = (id) => api.get(`/countries/${id}`);
