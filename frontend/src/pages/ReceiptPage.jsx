import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../store/store.js';
import ReceiptSlip from '../features/receipts/ReceiptSlip.jsx';

const ReceiptPage = () => {
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const txn = store.getTransaction();
    if (!txn) {
      navigate('/');
    } else {
      setTransaction(txn);
    }
  }, [navigate]);

  if (!transaction) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-slip, #receipt-slip * { visibility: visible; }
          #receipt-slip { position: absolute; top: 0; left: 50%; transform: translateX(-50%); }
        }
      `}</style>

      {/* Success indicator */}
      <div className="flex flex-col items-center mb-6 print:hidden">
        <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-3">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white">Transaction complete</h1>
        <p className="text-sm text-slate-400 mt-1">Here's your receipt</p>
      </div>

      <ReceiptSlip transaction={transaction} />

      <div className="flex gap-4 mt-8 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition"
        >
          Print / Download Slip
        </button>
        <button
          onClick={() => {
            store.clearTransaction();
            navigate('/');
          }}
          className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm transition"
        >
          Done / Next Sale
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;