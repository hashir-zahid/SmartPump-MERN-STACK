import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await login({ email, password });
      if (response) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Original SVG forecourt-at-night background */}
      {/* Original SVG forecourt-at-night background */}
      {/* Original SVG forecourt-at-night background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1445" />
            <stop offset="45%" stopColor="#1e2a63" />
            <stop offset="75%" stopColor="#3d2b5f" />
            <stop offset="100%" stopColor="#5b3a52" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="lampGlowLeft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="horizonGlow" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1200" height="800" fill="url(#sky)" />
        <rect y="500" width="1200" height="300" fill="url(#horizonGlow)" />

        <circle cx="1040" cy="110" r="140" fill="url(#moonGlow)" />
        <circle cx="1040" cy="110" r="40" fill="#f0f9ff" />
        <circle cx="1040" cy="110" r="40" fill="#7dd3fc" opacity="0.25" />

        {Array.from({ length: 90 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 137) % 1200}
            cy={(i * 53 + 20) % 420}
            r={i % 6 === 0 ? 2.2 : 1.1}
            fill="#f8fafc"
            opacity={i % 3 === 0 ? 0.9 : 0.5}
          />
        ))}

        <rect y="540" width="1200" height="260" fill="url(#ground)" />

        {/* Left canopy + pumps */}
        <rect x="30" y="360" width="330" height="16" rx="4" fill="#475569" />
        <rect x="20" y="374" width="350" height="11" fill="#fbbf24" />
        <rect x="60" y="385" width="14" height="150" fill="#475569" />
        <rect x="300" y="385" width="14" height="150" fill="#475569" />
        <ellipse cx="190" cy="395" rx="220" ry="70" fill="url(#lampGlowLeft)" />
        {[130, 250].map((x, i) => (
          <g key={`l-${i}`}>
            <rect x={x - 24} y="450" width="48" height="90" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x={x - 16} y="463" width="32" height="18" rx="3" fill="#0f172a" />
            <rect x={x - 12} y="467" width="24" height="4" fill="#4ade80" />
            <rect x={x - 4} y="443" width="8" height="10" fill="#fbbf24" />
          </g>
        ))}

        {/* Right canopy + pumps */}
        <rect x="840" y="360" width="330" height="16" rx="4" fill="#475569" />
        <rect x="830" y="374" width="350" height="11" fill="#fbbf24" />
        <rect x="886" y="385" width="14" height="150" fill="#475569" />
        <rect x="1126" y="385" width="14" height="150" fill="#475569" />
        <ellipse cx="1010" cy="395" rx="220" ry="70" fill="url(#lampGlowLeft)" />
        {[950, 1070].map((x, i) => (
          <g key={`r-${i}`}>
            <rect x={x - 24} y="450" width="48" height="90" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x={x - 16} y="463" width="32" height="18" rx="3" fill="#0f172a" />
            <rect x={x - 12} y="467" width="24" height="4" fill="#4ade80" />
            <rect x={x - 4} y="443" width="8" height="10" fill="#fbbf24" />
          </g>
        ))}

        <ellipse cx="190" cy="560" rx="200" ry="26" fill="#fbbf24" opacity="0.1" />
        <ellipse cx="1010" cy="560" rx="200" ry="26" fill="#fbbf24" opacity="0.1" />

        <g opacity="0.25">
          <rect x="460" y="700" width="60" height="10" fill="#f8fafc" />
          <rect x="600" y="700" width="60" height="10" fill="#f8fafc" />
          <rect x="740" y="700" width="60" height="10" fill="#f8fafc" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-slate-950/15" />

      {/* Glass login card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <span className="text-3xl mb-1">⛽</span>
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <p className="text-sm text-slate-400 mt-1">Sign in to manage your station</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
                <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <input
                type="email"
                required
                placeholder="you@gmail.com"
                className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
              </svg>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-10-8-10-8a18.6 18.6 0 015.06-5.94M9.9 4.24A10.4 10.4 0 0112 4c7 0 10 8 10 8a18.5 18.5 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 1l22 22" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 font-medium">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:text-slate-500 text-white py-2.5 rounded-lg font-semibold transition"
          >
            {isSubmitting ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 font-medium hover:text-blue-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;