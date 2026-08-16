import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/common/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <Navbar />
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;