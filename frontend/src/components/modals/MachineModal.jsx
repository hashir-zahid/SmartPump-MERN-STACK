import { useState, useEffect } from 'react';

const MachineModal = ({ isOpen, onClose, onSubmit, initialData, fuelTypes }) => {
  const [formData, setFormData] = useState({
    name: '',
    fuelTypeId: '',
    maxCapacity: '',
    currentQuantity: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        fuelTypeId: initialData.fuelType?._id || '',
        maxCapacity: initialData.maxCapacity,
        currentQuantity: initialData.currentQuantity
      });
    } else {
      setFormData({ name: '', fuelTypeId: fuelTypes[0]?._id || '', maxCapacity: 500, currentQuantity: 0 });
    }
  }, [initialData, fuelTypes]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fuelTypeId || fuelTypes.length === 0) return;
    onSubmit({
      ...formData,
      fuelTypeId: formData.fuelTypeId,
      maxCapacity: Number(formData.maxCapacity),
      currentQuantity: Number(formData.currentQuantity)
    });
  };

  const hasFuelTypes = fuelTypes.length > 0;
  const max = Number(formData.maxCapacity) || 0;
  const current = Number(formData.currentQuantity) || 0;
  const fillPct = max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0;
  const selectedFuel = fuelTypes.find((f) => f._id === formData.fuelTypeId);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm my-8">

        {/* Hose + nozzle, swooping off the right side of the pump */}
        <svg
          className="absolute -right-10 top-16 w-14 h-56 pointer-events-none hidden sm:block"
          viewBox="0 0 60 220"
          fill="none"
        >
          <path
            d="M4 8 C 4 55, 48 70, 44 130 C 41 158, 18 168, 14 190"
            stroke="#1e293b"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="-2" y="182" width="34" height="16" rx="5" fill="#1e293b" />
          <rect x="24" y="176" width="10" height="12" rx="2" fill="#dc2626" />
        </svg>

        {/* Pump body */}
        <div className="relative z-10 bg-white rounded-t-[2.5rem] rounded-b-md shadow-2xl border border-slate-200 overflow-hidden">

          {/* Rounded cap / top of the pump */}
          <div className="bg-amber-400 h-3 w-full" />

          {/* Digital display head */}
          <div className="bg-slate-900 text-white px-6 pt-4 pb-5">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xl">⛽</span>
              <h2 className="text-base font-bold tracking-wide">
                {initialData ? 'Edit Machine' : 'New Machine'}
              </h2>
            </div>

            {/* Two "meter window" readouts, like a real pump display */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black rounded-lg border border-slate-700 px-3 py-2 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Fuel</p>
                <p className="text-sm font-mono text-green-400 truncate">
                  {selectedFuel?.name || '--'}
                </p>
              </div>
              <div className="bg-black rounded-lg border border-slate-700 px-3 py-2 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Level</p>
                <p className="text-sm font-mono text-green-400">{fillPct.toFixed(0)}%</p>
              </div>
            </div>
          </div>

          {/* Fill gauge strip */}
          <div className="px-6 pt-4">
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  fillPct < 15 ? 'bg-red-500' : fillPct < 40 ? 'bg-amber-400' : 'bg-green-500'
                }`}
                style={{ width: `${fillPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0 L</span>
              <span>{current.toLocaleString()} / {max.toLocaleString()} L</span>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                  Machine Name / Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pump 03"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                  Fuel Type
                </label>
                {!hasFuelTypes ? (
                  <div className="border border-amber-300 bg-amber-50 text-amber-700 text-sm rounded-lg p-3">
                    No fuel types found. Add one from the Fuel Types page first.
                  </div>
                ) : (
                  <select
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    value={formData.fuelTypeId}
                    onChange={(e) => setFormData({ ...formData, fuelTypeId: e.target.value })}
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((fuelType) => (
                      <option key={fuelType._id} value={fuelType._id}>
                        {fuelType.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Capacity (L)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                    Current (L)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    value={formData.currentQuantity}
                    onChange={(e) => setFormData({ ...formData, currentQuantity: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 px-6 py-4 bg-slate-50 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!hasFuelTypes}
                className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
              >
                {initialData ? 'Save Changes' : 'Add Machine'}
              </button>
            </div>
          </form>

          {/* Base plinth, wider than body, like a pump's floor mount */}
          <div className="bg-slate-800 h-4 -mx-2 rounded-b-sm" />
        </div>
      </div>
    </div>
  );
};

export default MachineModal;