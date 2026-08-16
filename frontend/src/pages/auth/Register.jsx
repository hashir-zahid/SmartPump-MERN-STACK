import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pumpName: '',
    location: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(formData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-500 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Forecourt-at-night background */}
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

      {/* Glass register card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/35 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 my-8">
        <div className="flex flex-col items-center mb-6">
          <span className="text-3xl mb-1">⛽</span>
          <h2 className="text-2xl font-bold text-white">Admin Register</h2>
          <p className="text-sm text-slate-400 mt-1">Set up your station's admin account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className={inputClass}
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={inputClass}
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={inputClass}
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pumpName"
            placeholder="Pump Name"
            required
            className={inputClass}
            value={formData.pumpName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            className={inputClass}
            value={formData.location}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            className={inputClass}
            value={formData.description}
            onChange={handleChange}
          />

          {/* DO NOT add onClick={() => navigate('/login')} here */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:text-slate-500 text-white py-2.5 rounded-lg font-semibold transition"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;