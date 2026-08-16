import api from '../axios.js';

const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  refreshToken: () => api.post('/auth/refresh-token'),
  updateAdmin: (data) => api.put('/auth/update-admin', data),
};

export default authApi;