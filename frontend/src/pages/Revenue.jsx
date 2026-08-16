import { useState, useEffect } from 'react';
import revenueApi from '../api/endpoints/revenue.api.js';
import machinesApi from '../api/endpoints/machines.api.js';
import fuelTypesApi from '../api/endpoints/fuelTypes.api.js';
import formatCurrency from '../utils/formatCurrency.js';
import Loader from '../components/common/Loader.jsx';

const Revenue = () => {
  const [data, setData] = useState(null);
  const [machines, setMachines] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  const [filters, setFilters] = useState({ machineId: '', fuelTypeId: '', startDate: '', endDate: '' });

  const loadRevenue = async () => {
    const res = await revenueApi.getAnalytics(filters);
    setData(res.data.data);
  };

  useEffect(() => {
    Promise.all([machinesApi.getAll(), fuelTypesApi.getAll()]).then(([resM, resF]) => {
      setMachines(resM.data.data);
      setFuelTypes(resF.data.data);
    });
  }, []);

  useEffect(() => {
    loadRevenue();
  }, [filters]);

  if (!data) return <Loader />;

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 text-white p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-bold text-white">Revenue Analytics</h1>
          <p className="text-sm text-slate-400 mt-0.5">Fuel and slip fee revenue across the station</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Filter bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Machine
            </label>
            <select
              className={inputClass}
              value={filters.machineId}
              onChange={(e) => setFilters({ ...filters, machineId: e.target.value })}
            >
              <option value="">All Machines</option>
              {machines.map((m) => (
                <option key={m._id} value={m._id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Fuel Type
            </label>
            <select
              className={inputClass}
              value={filters.fuelTypeId}
              onChange={(e) => setFilters({ ...filters, fuelTypeId: e.target.value })}
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map((f) => (
                <option key={f._id} value={f._id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              className={`${inputClass} scheme-dark`}
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
              End Date
            </label>
            <input
              type="date"
              className={`${inputClass} scheme-dark`}
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
        </div>

        {/* Revenue summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Total Fuel Revenue</p>
            <p className="text-3xl font-bold text-blue-400 my-2">
              {formatCurrency(data.summary.totalFuelRevenue)}
            </p>
            <p className="text-xs text-slate-500">Strictly fuel sales only</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Total Slip Fee Revenue</p>
            <p className="text-3xl font-bold text-green-400 my-2">
              {formatCurrency(data.summary.totalSlipRevenue)}
            </p>
            <p className="text-xs text-slate-500">Rs. 1 fee per requested slip</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Total Collected</p>
            <p className="text-3xl font-bold text-purple-400 my-2">
              {formatCurrency(data.summary.totalCollected)}
            </p>
            <p className="text-xs text-slate-500">Gross revenue collected</p>
          </div>
        </div>

        {/* Breakdown tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="font-semibold text-white mb-4">Revenue by Machine</h2>
            {data.revenueByMachine.length === 0 ? (
              <p className="text-sm text-slate-500">No data for this range.</p>
            ) : (
              <div className="space-y-3">
                {data.revenueByMachine.map((m) => (
                  <div key={m.machineId} className="flex justify-between border-b border-slate-800 pb-2 text-sm">
                    <span className="text-slate-300">{m.machineName}</span>
                    <span className="font-semibold text-white">{formatCurrency(m.fuelRevenue)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="font-semibold text-white mb-4">Revenue by Fuel Type</h2>
            {data.revenueByFuelType.length === 0 ? (
              <p className="text-sm text-slate-500">No data for this range.</p>
            ) : (
              <div className="space-y-3">
                {data.revenueByFuelType.map((f) => (
                  <div key={f._id} className="flex justify-between border-b border-slate-800 pb-2 text-sm">
                    <span className="text-slate-300">{f._id} ({f.totalLitersSold} L)</span>
                    <span className="font-semibold text-white">{formatCurrency(f.fuelRevenue)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;