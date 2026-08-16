import { useState } from 'react';

const StockRefillModal = ({ isOpen, onClose, onSubmit, machine, mainStockQuantity }) => {
  const [transferAmount, setTransferAmount] = useState('');

  if (!isOpen || !machine) return null;

  const maxPossible = Math.min(
    machine.maxCapacity - machine.currentQuantity,
    mainStockQuantity || 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ machineId: machine._id, transferAmount: Number(transferAmount) });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-2">Refill {machine.name}</h2>
        <p className="text-sm text-gray-600 mb-4">Fuel: {machine.fuelType?.name}</p>
        <div className="text-sm mb-4 bg-gray-50 p-3 rounded">
          <p>Machine Remaining: <strong>{machine.currentQuantity} L</strong></p>
          <p>Machine Capacity: <strong>{machine.maxCapacity} L</strong></p>
          <p>Main Stock Available: <strong>{mainStockQuantity} L</strong></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Transfer Amount (Liters)</label>
            <input
              type="number"
              max={maxPossible}
              min="1"
              required
              className="w-full border p-2 rounded"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Transfer Stock</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockRefillModal;