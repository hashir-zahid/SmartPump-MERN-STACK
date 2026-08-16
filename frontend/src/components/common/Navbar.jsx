import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { Button } from '@components/ui/button';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'
  }`;

const Navbar = () => {
  const { isAuthenticated, logout, admin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { to: '/', label: 'Customer Kiosk' },
    ...(isAuthenticated
      ? [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/stock', label: 'Main Stock' },
        { to: '/fuel-types', label: 'Fuel Types' },
        { to: '/revenue', label: 'Revenue' },
      ]
      : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-wide">
          <span className="text-blue-400 text-xl">⛽</span>
          <span>{admin?.pumpName || 'SmartPump'}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
              <NavLink
                to="/update-admin"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold uppercase">
                  {(admin?.name || 'A').charAt(0)}
                </span>
                <span className="hidden lg:inline">Profile</span>
              </NavLink>

              <Button
                onClick={handleLogout}
                variant="destructive"
                className="text-sm text-white font-medium bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md transition-colors"
              >
                Logout
              </Button>

            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Admin Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 pb-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navLinkClass}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <NavLink to="/update-admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Update Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-left text-sm font-medium bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-fit"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;