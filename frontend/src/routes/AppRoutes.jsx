import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import UpdateAdmin from '../pages/UpdateAdmin.jsx';
import CustomerKiosk from '../pages/CustomerKiosk.jsx';
import FuelTypes from '../pages/FuelTypes.jsx';
import MainStock from '../pages/MainStock.jsx';
import ReceiptPage from '../pages/ReceiptPage.jsx';
import Revenue from '../pages/Revenue.jsx';

const AppRoutes = () => (
  <Routes>
    {/* Public & Customer Kiosk Routes */}
    <Route path="/" element={<CustomerKiosk />} />
    <Route path="/receipt" element={<ReceiptPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected Admin Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/update-admin" element={<UpdateAdmin />} />
      <Route path="/stock" element={<MainStock />} />
      <Route path="/fuel-types" element={<FuelTypes />} />
      <Route path="/revenue" element={<Revenue />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;