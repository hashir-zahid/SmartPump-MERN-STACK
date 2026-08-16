import api from '../axios.js';

const fuelTypesApi = {
  getAll: () => api.get('/fuel-types'),
  create: (data) => api.post('/fuel-types', data),
  update: (id, data) => api.put(`/fuel-types/${id}`, data),
};

export default fuelTypesApi;