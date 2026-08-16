import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import store from '../store/store.js';
import formatCurrency from '../utils/formatCurrency.js';

const CustomerKiosk = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [quantity, setQuantity] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [wantSlip, setWantSlip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/user/machines').then((res) => {
      setMachines(res.data.data);
      if (res.data.data.length > 0) setSelectedMachine(res.data.data[0]);
    });
  }, []);

  const handlePurchase = async () => {
    if (!selectedMachine) return;
    try {
      const res = await api.post('/user/purchase', {
        machineId: selectedMachine._id,
        quantity: Number(quantity),
        paymentMethod,
        wantSlip
      });

      const txn = res.data.data;
      store.setTransaction(txn);

      if (wantSlip) {
        navigate('/receipt');
      } else {
        alert('Transaction Successful! Thank you.');
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Transaction failed');
    }
  };

  const currentPrice = selectedMachine?.fuelType?.pricePerLiter || 0;
  const fuelAmount = quantity * currentPrice;
  const slipFee = wantSlip ? 1 : 0;
  const totalPaid = fuelAmount + slipFee;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-2xl max-w-xl w-full border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Self-Service Fueling Kiosk</h1>

        {/* Machine Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-slate-300">Select Dispensing Unit</label>
          <div className="grid grid-cols-2 gap-2">
            {machines.map((m) => (
              <button
                key={m._id}
                onClick={() => setSelectedMachine(m)}
                className={`p-3 rounded-lg border text-left ${
                  selectedMachine?._id === m._id
                    ? 'border-blue-500 bg-blue-900/40 text-blue-300'
                    : 'border-slate-700 bg-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold">{m.name}</div>
                <div className="text-xs text-slate-400">{m.fuelType?.name} ({m.currentQuantity} L left)</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-300">Quantity (Liters)</label>
          <input
            type="number"
            min="1"
            max={selectedMachine?.currentQuantity || 100}
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white font-mono text-xl"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-slate-300">Payment Method</label>
          <select
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Digital">Digital Payment</option>
          </select>
        </div>

        {/* Slip Request Checkbox */}
        <div className="mb-6 flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-700">
          <input
            type="checkbox"
            id="slip"
            className="w-5 h-5 text-blue-600 rounded"
            checked={wantSlip}
            onChange={(e) => setWantSlip(e.target.checked)}
          />
          <label htmlFor="slip" className="text-sm cursor-pointer">
            Create/Download Transaction Slip (+ Rs. 1 Fee)
          </label>
        </div>

        {/* Calculations Split */}
        <div className="bg-slate-900 p-4 rounded-lg space-y-2 mb-6 font-mono text-sm border border-slate-700">
          <div className="flex justify-between text-slate-400">
            <span>Fuel Cost ({quantity} L × {currentPrice}/L):</span>
            <span>{formatCurrency(fuelAmount)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Slip Fee:</span>
            <span>{formatCurrency(slipFee)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-white border-t border-slate-800 pt-2">
            <span>Total Payable:</span>
            <span className="text-green-400">{formatCurrency(totalPaid)}</span>
          </div>
        </div>

        <button
          onClick={handlePurchase}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default CustomerKiosk;