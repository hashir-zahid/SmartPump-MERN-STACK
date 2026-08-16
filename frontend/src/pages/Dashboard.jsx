import { useState, useEffect } from 'react';
import machinesApi from '../api/endpoints/machines.api.js';
import fuelTypesApi from '../api/endpoints/fuelTypes.api.js';
import stockApi from '../api/endpoints/stock.api.js';
import MachineCard from '../features/machines/MachineCard.jsx';
import MachineModal from '../components/modals/MachineModal.jsx';
import StockRefillModal from '../components/modals/StockRefillModal.jsx';
import Loader from '../components/common/Loader.jsx';

const Dashboard = () => {
  const [machines, setMachines] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [mainStock, setMainStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isMachineModalOpen, setIsMachineModalOpen] = useState(false);
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [resMachines, resFuel, resStock] = await Promise.all([
        machinesApi.getAll(),
        fuelTypesApi.getAll(),
        stockApi.getMainStock()
      ]);
      setMachines(resMachines.data.data);
      setFuelTypes(resFuel.data.data);
      setMainStock(resStock.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMachineSubmit = async (formData) => {
    if (selectedMachine) {
      await machinesApi.update(selectedMachine._id, formData);
    } else {
      await machinesApi.create(formData);
    }
    setIsMachineModalOpen(false);
    setSelectedMachine(null);
    fetchData();
  };

  const handleRefillSubmit = async ({ machineId, transferAmount }) => {
    await stockApi.transferToMachine({ machineId, transferAmount });
    setIsRefillModalOpen(false);
    setSelectedMachine(null);
    fetchData();
  };

  if (loading) return <Loader />;

  const totalMachines = machines.length;
  const lowFuelCount = machines.filter(
    (m) => m.maxCapacity > 0 && (m.currentQuantity / m.maxCapacity) * 100 < 15
  ).length;
  const totalCapacity = machines.reduce((sum, m) => sum + (Number(m.maxCapacity) || 0), 0);
  const totalRemaining = machines.reduce((sum, m) => sum + (Number(m.currentQuantity) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white">Station Overview & Machines</h1>
            <p className="text-sm text-slate-400 mt-0.5">Live status across all pump machines</p>
          </div>
          <button
            onClick={() => { setSelectedMachine(null); setIsMachineModalOpen(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition"
          >
            + Add Machine
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Machines</p>
            <p className="text-2xl font-bold text-white">{totalMachines}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Low Fuel</p>
            <p className={`text-2xl font-bold ${lowFuelCount > 0 ? 'text-red-400' : 'text-white'}`}>
              {lowFuelCount}
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Capacity</p>
            <p className="text-2xl font-bold text-white">{totalCapacity.toLocaleString()} L</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Fuel On Hand</p>
            <p className="text-2xl font-bold text-white">{totalRemaining.toLocaleString()} L</p>
          </div>
        </div>

        {/* Machine grid */}
        {machines.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-400 mb-4">No machines registered yet.</p>
            <button
              onClick={() => { setSelectedMachine(null); setIsMachineModalOpen(true); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-semibold transition"
            >
              + Add your first machine
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pt-4">
            {machines.map((m) => (
              <MachineCard
                key={m._id}
                machine={m}
                onEdit={(m) => { setSelectedMachine(m); setIsMachineModalOpen(true); }}
                onRefill={(m) => { setSelectedMachine(m); setIsRefillModalOpen(true); }}
              />
            ))}
          </div>
        )}
      </div>

      <MachineModal
        isOpen={isMachineModalOpen}
        onClose={() => setIsMachineModalOpen(false)}
        onSubmit={handleMachineSubmit}
        initialData={selectedMachine}
        fuelTypes={fuelTypes}
      />

      <StockRefillModal
        isOpen={isRefillModalOpen}
        onClose={() => setIsRefillModalOpen(false)}
        onSubmit={handleRefillSubmit}
        machine={selectedMachine}
        mainStockQuantity={
          mainStock.find((s) => s.fuelType?._id === selectedMachine?.fuelType?._id)?.totalQuantity
        }
      />
    </div>
  );
};

export default Dashboard;