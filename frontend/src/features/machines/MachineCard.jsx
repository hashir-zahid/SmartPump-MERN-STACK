import formatCurrency from '../../utils/formatCurrency.js';

const fuelBadgeStyles = {
  Petrol: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  Diesel: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
};

const MachineCard = ({ machine, onEdit, onRefill }) => {
  const fillPercentage = Math.min(
    Math.round((machine.currentQuantity / machine.maxCapacity) * 100),
    100
  );

  const barColor =
    fillPercentage < 15 ? 'bg-red-500' : fillPercentage < 40 ? 'bg-amber-400' : 'bg-green-500';
  const badgeStyle =
    fuelBadgeStyles[machine.fuelType?.name] || 'bg-slate-500/20 text-slate-300 border-slate-400/30';

  return (
    <div className="relative flex flex-col items-center max-w-xs mx-auto w-full">

      {/* Hose + nozzle, curving off the right side */}
      <svg
        className="absolute -right-8 top-24 w-12 h-40 pointer-events-none hidden sm:block z-0"
        viewBox="0 0 50 170"
        fill="none"
      >
        <path
          d="M4 6 C 4 45, 40 55, 36 100 C 33 122, 14 130, 12 150"
          stroke="#1e293b"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="-2" y="144" width="28" height="13" rx="4" fill="#1e293b" />
        <rect x="20" y="139" width="8" height="10" rx="2" fill="#dc2626" />
      </svg>

      {/* Pump body */}
      <div className="relative z-10 w-full bg-white rounded-t-4xl rounded-b-md shadow-sm hover:shadow-md transition border border-slate-200 overflow-hidden">

        {/* Amber canopy strip */}
        <div className="bg-amber-400 h-2.5 w-full" />

        {/* Display head */}
        <div className="bg-slate-900 px-4 pt-3.5 pb-4">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="font-bold text-sm text-white truncate">{machine.name}</h3>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${badgeStyle}`}>
              {machine.fuelType?.name || 'Unassigned'}
            </span>
          </div>

          {/* Meter windows */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black rounded-md border border-slate-700 px-2 py-1.5 text-center">
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Price</p>
              <p className="text-xs font-mono text-green-400">
                {formatCurrency(machine.fuelType?.pricePerLiter)}/L
              </p>
            </div>
            <div className="bg-black rounded-md border border-slate-700 px-2 py-1.5 text-center">
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Level</p>
              <p className="text-xs font-mono text-green-400">{fillPercentage}%</p>
            </div>
          </div>
        </div>

        {/* Stats + gauge */}
        <div className="px-4 py-4">
          <div className="flex justify-between text-sm mb-1.5 text-slate-600">
            <span>Capacity:</span>
            <span className="font-semibold text-slate-800">{machine.maxCapacity} L</span>
          </div>
          <div className="flex justify-between text-sm mb-3 text-slate-600">
            <span>Remaining:</span>
            <span className="font-semibold text-slate-800">{machine.currentQuantity} L</span>
          </div>

          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${fillPercentage}%` }}
            />
          </div>
          {fillPercentage < 15 && (
            <p className="text-xs text-red-600 font-medium mt-1.5">Low fuel — refill recommended</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={() => onRefill(machine)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg text-sm font-medium transition"
          >
            Refill
          </button>
          <button
            onClick={() => onEdit(machine)}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-lg text-sm font-medium transition"
          >
            Config
          </button>
        </div>

        {/* Base plinth */}
        <div className="bg-slate-800 h-3.5 w-[85%] mx-auto rounded-b-sm" />
      </div>

      {/* Floor shadow to sell the "standing machine" look */}
      <div className="w-[70%] h-2 bg-slate-300/50 rounded-full blur-sm -mt-1" />
    </div>
  );
};

export default MachineCard;