import api from '../axios.js';

const revenueApi = {
  getAnalytics: (params) => api.get('/revenue', { params }),
};

export default revenueApi;