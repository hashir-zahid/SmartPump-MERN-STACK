import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import authApi from '../api/endpoints/auth.api.js';

const UpdateAdmin = () => {
  const { admin, setAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: admin?.name || '',
    pumpName: admin?.pumpName || '',
    location: admin?.location || '',
    description: admin?.description || ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name || '',
        pumpName: admin.pumpName || '',
        location: admin.location || '',
        description: admin.description || ''
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const response = await authApi.updateAdmin(formData);
      const updatedAdmin = response.data?.data;

      if (updatedAdmin) {
        setAdmin(updatedAdmin);
        localStorage.setItem('adminInfo', JSON.stringify(updatedAdmin));
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error('UPDATE ERROR:', err.response || err);
      setError(err.response?.data?.message || err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-center text-white">Update Profile</h2>
        <p className="text-sm text-slate-400 text-center mb-6">Update your admin and station details</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg mb-4 text-sm font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className={inputClass}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Pump Name
            </label>
            <input
              type="text"
              name="pumpName"
              required
              className={inputClass}
              value={formData.pumpName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className={inputClass}
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className={inputClass}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:text-slate-500 text-white py-2.5 rounded-lg font-semibold transition"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdmin;