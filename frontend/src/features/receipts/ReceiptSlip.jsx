import formatCurrency from '../../utils/formatCurrency.js';

const ReceiptSlip = ({ transaction }) => {
  if (!transaction) return null;

  return (
    <div className="w-80 mx-auto font-mono">
      <div
        id="receipt-slip"
        className="bg-white text-slate-800 p-6 pt-7"
        style={{
          clipPath:
            'polygon(0% 2%, 4% 0%, 8% 2%, 12% 0%, 16% 2%, 20% 0%, 24% 2%, 28% 0%, 32% 2%, 36% 0%, 40% 2%, 44% 0%, 48% 2%, 52% 0%, 56% 2%, 60% 0%, 64% 2%, 68% 0%, 72% 2%, 76% 0%, 80% 2%, 84% 0%, 88% 2%, 92% 0%, 96% 2%, 100% 0%, 100% 98%, 96% 100%, 92% 98%, 88% 100%, 84% 98%, 80% 100%, 76% 98%, 72% 100%, 68% 98%, 64% 100%, 60% 98%, 56% 100%, 52% 98%, 48% 100%, 44% 98%, 40% 100%, 36% 98%, 32% 100%, 28% 98%, 24% 100%, 20% 98%, 16% 100%, 12% 98%, 8% 100%, 4% 98%, 0% 100%)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
        }}
      >
        {/* Header */}
        <div className="text-center border-b border-dashed border-slate-300 pb-3 mb-3">
          <p className="text-lg">⛽</p>
          <h2 className="text-lg font-bold tracking-widest">FUEL RECEIPT</h2>
          <p className="text-[11px] text-slate-500 mt-1">
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Transaction details */}
        <div className="text-xs space-y-1.5 mb-3">
          <div className="flex justify-between">
            <span className="text-slate-500">Txn ID</span>
            <span className="font-bold tracking-tight">{transaction.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Fuel</span>
            <span>{transaction.fuelTypeNameSnap}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Quantity</span>
            <span>{transaction.quantity} L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Price / Liter</span>
            <span>{formatCurrency(transaction.pricePerLiter)}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-slate-300 my-2" />

        {/* Totals */}
        <div className="text-xs space-y-1.5 my-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Fuel Amount</span>
            <span>{formatCurrency(transaction.fuelAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Slip Fee</span>
            <span>{formatCurrency(transaction.slipFee)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm border-t border-slate-800 pt-2 mt-2">
            <span>Total Paid</span>
            <span>{formatCurrency(transaction.totalPaid)}</span>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-5 flex justify-center gap-0.5">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-800"
              style={{ width: (i * 7) % 3 === 0 ? '2px' : '1px', height: '28px' }}
            />
          ))}
        </div>
        <p className="text-center text-[9px] tracking-[0.2em] text-slate-400 mt-1">
          {transaction.transactionId}
        </p>

        <div className="text-center text-[11px] text-slate-400 mt-4">
          Thank you for choosing our station!
        </div>
      </div>
    </div>
  );
};

export default ReceiptSlip;