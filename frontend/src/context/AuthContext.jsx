import { createContext, useState, useEffect } from 'react';
import authApi from '../api/endpoints/auth.api.js';
import { setAccessToken } from '../api/axios.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authApi.refreshToken();
        const { accessToken } = response.data.data;
        setAccessToken(accessToken);
        // Retain basic state if persisted or re-fetch admin profile if needed
        const savedAdmin = localStorage.getItem('adminInfo');
        if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
      } catch (error) {
        setAdmin(null);
        localStorage.removeItem('adminInfo');
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const { admin, accessToken } = response.data.data;
    setAccessToken(accessToken);
    setAdmin(admin);
    localStorage.setItem('adminInfo', JSON.stringify(admin));
    return response.data;
  };

  const register = async (data) => {
    const response = await authApi.register(data);
    const { admin, accessToken } = response.data.data;
    setAccessToken(accessToken);
    setAdmin(admin);
    localStorage.setItem('adminInfo', JSON.stringify(admin));
    return response.data;
  };

  const logout = () => {
    setAccessToken('');
    setAdmin(null);
    localStorage.removeItem('adminInfo');
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, login, register, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;