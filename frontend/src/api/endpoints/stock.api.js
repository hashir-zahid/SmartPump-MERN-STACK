import api from '../axios.js';

const stockApi = {
  getMainStock: () => api.get('/stock'),
  addMainStock: (data) => api.post('/stock/add', data),
  transferToMachine: (data) => api.post('/stock/transfer', data),
};

export default stockApi;