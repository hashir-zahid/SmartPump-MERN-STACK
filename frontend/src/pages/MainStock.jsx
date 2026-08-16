import { useState, useEffect } from 'react';
import stockApi from '../api/endpoints/stock.api.js';
import fuelTypesApi from '../api/endpoints/fuelTypes.api.js';
import Loader from '../components/common/Loader.jsx';

const MainStock = () => {
  const [stockList, setStockList] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedFuelId, setSelectedFuelId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [resStock, resFuel] = await Promise.all([
        stockApi.getMainStock(),
        fuelTypesApi.getAll()
      ]);
      setStockList(resStock.data.data);
      setFuelTypes(resFuel.data.data);
      if (resFuel.data.data.length > 0 && !selectedFuelId) {
        setSelectedFuelId(resFuel.data.data[0]._id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAddStock = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await stockApi.addMainStock({ fuelTypeId: selectedFuelId, quantity: Number(quantity) });
      setQuantity('');
      await loadData();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold text-white">Main Fuel Stock</h1>
          <p className="text-sm text-slate-400 mt-0.5">Central reserve supply for all pump machines</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">

          {/* Stock cards */}
          {stockList.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
              <p className="text-slate-400">No fuel stock recorded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stockList.map((item) => (
                <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-xl p-7">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                    {item.fuelType?.name}
                  </h3>
                  <p className="text-4xl font-bold text-blue-400 my-3">
                    {item.totalQuantity.toLocaleString()} L
                  </p>
                  <p className="text-xs text-slate-500">Available station supply</p>
                </div>
              ))}
            </div>
          )}

          {/* Add bulk stock form */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-base font-semibold text-white mb-4">Replenish Main Reserve Stock</h2>
            <form onSubmit={handleAddStock} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  Fuel Type
                </label>
                <select
                  className="w-full bg-slate-800 border border-slate-700 text-white p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedFuelId}
                  onChange={(e) => setSelectedFuelId(e.target.value)}
                >
                  {fuelTypes.map((f) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  Quantity (Liters)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 1000"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !selectedFuelId}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:text-slate-500 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold transition"
              >
                {submitting ? 'Adding...' : 'Add Stock'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MainStock;