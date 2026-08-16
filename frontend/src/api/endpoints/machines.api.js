import api from '../axios.js';

const machinesApi = {
  getAll: () => api.get('/machines'),
  create: (data) => api.post('/machines', data),
  update: (id, data) => api.put(`/machines/${id}`, data),
};

export default machinesApi;