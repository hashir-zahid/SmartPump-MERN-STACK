import { useState, useEffect } from 'react';
import fuelTypesApi from '../api/endpoints/fuelTypes.api.js';
import FuelTypeModal from '../components/modals/FuelTypeModal.jsx';
import formatCurrency from '../utils/formatCurrency.js';
import Loader from '../components/common/Loader.jsx';

const FuelTypes = () => {
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFuelTypes = async () => {
    try {
      const res = await fuelTypesApi.getAll();
      setFuelTypes(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFuelTypes(); }, []);

  const handleSubmit = async (formData) => {
    if (selectedFuel) {
      await fuelTypesApi.update(selectedFuel._id, formData);
    } else {
      await fuelTypesApi.create(formData);
    }
    setIsModalOpen(false);
    setSelectedFuel(null);
    fetchFuelTypes();
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">Fuel Type Management</h1>
            <p className="text-sm text-slate-400 mt-0.5">Manage fuel types and per-liter pricing</p>
          </div>
          <button
            onClick={() => { setSelectedFuel(null); setIsModalOpen(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition"
          >
            + Add Fuel Type
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {fuelTypes.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-400 mb-4">No fuel types configured yet.</p>
            <button
              onClick={() => { setSelectedFuel(null); setIsModalOpen(true); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition"
            >
              + Add your first fuel type
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-900/80 border-b border-slate-800">
                <tr>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Fuel Name
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Price / Liter
                  </th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wide text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {fuelTypes.map((fuel) => (
                  <tr key={fuel._id} className="hover:bg-slate-800/50 transition">
                    <td className="p-4 font-semibold text-white">{fuel.name}</td>
                    <td className="p-4 text-slate-300">{formatCurrency(fuel.pricePerLiter)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => { setSelectedFuel(fuel); setIsModalOpen(true); }}
                        className="text-blue-400 hover:text-blue-300 font-medium transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FuelTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedFuel}
      />
    </div>
  );
};

export default FuelTypes;