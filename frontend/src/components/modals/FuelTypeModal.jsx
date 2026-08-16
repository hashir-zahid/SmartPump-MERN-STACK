import { useState, useEffect } from 'react';

const FuelTypeModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({ name: '', pricePerLiter: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({ name: initialData.name, pricePerLiter: initialData.pricePerLiter });
    } else {
      setFormData({ name: '', pricePerLiter: '' });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const hasPrice = Number(formData.pricePerLiter) > 0;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm my-8">
        
        {/* Decorative fuel drip SVG */}
        <svg
          className="absolute -left-10 top-16 w-14 h-56 pointer-events-none hidden sm:block"
          viewBox="0 0 60 220"
          fill="none"
        >
          <path
            d="M50 8 C 50 55, 10 70, 14 130 C 17 158, 40 168, 44 190"
            stroke="#1e293b"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="48" cy="195" r="6" fill="#dc2626" opacity="0.7"/>
          <circle cx="52" cy="205" r="4" fill="#dc2626" opacity="0.5"/>
          <circle cx="49" cy="212" r="3" fill="#dc2626" opacity="0.3"/>
        </svg>

        {/* Fuel type card body */}
        <div className="relative z-10 bg-white rounded-t-[2.5rem] rounded-b-md shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Rounded cap / top bar */}
          <div className="bg-amber-400 h-3 w-full" />

          {/* Header / Display section */}
          <div className="bg-slate-900 text-white px-6 pt-4 pb-5">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xl">⛽</span>
              <h2 className="text-base font-bold tracking-wide">
                {initialData ? 'Edit Fuel Type' : 'New Fuel Type'}
              </h2>
            </div>

            {/* Two "meter window" readouts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black rounded-lg border border-slate-700 px-3 py-2 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Fuel</p>
                <p className="text-sm font-mono text-green-400 truncate">
                  {formData.name || '--'}
                </p>
              </div>
              <div className="bg-black rounded-lg border border-slate-700 px-3 py-2 text-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Price</p>
                <p className="text-sm font-mono text-green-400">
                  {hasPrice ? `Rs.${formData.pricePerLiter}` : '--'}
                </p>
              </div>
            </div>
          </div>

          {/* Price indicator bar */}
          <div className="px-6 pt-4">
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  hasPrice ? 'bg-green-500' : 'bg-slate-300'
                }`}
                style={{ width: hasPrice ? '100%' : '20%' }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>Price</span>
              <span>{hasPrice ? `Rs.${formData.pricePerLiter}/L` : 'Not set'}</span>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={(e) => { 
            e.preventDefault(); 
            onSubmit({
              ...formData,
              pricePerLiter: Number(formData.pricePerLiter)
            }); 
          }}>
            <div className="p-6 pt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                  Fuel Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Petrol, Diesel, CNG"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
                  Price per Liter (Rs.)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g. 280.50"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  value={formData.pricePerLiter}
                  onChange={(e) => setFormData({ ...formData, pricePerLiter: e.target.value })}
                />
              </div>

              {/* Price preview card */}
              {hasPrice && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-700 font-medium text-center">
                    Current Price: <span className="font-bold">Rs. {Number(formData.pricePerLiter).toFixed(2)}</span> per liter
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
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
                className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition"
              >
                {initialData ? 'Save Changes' : 'Add Fuel Type'}
              </button>
            </div>
          </form>

          {/* Base plinth */}
          <div className="bg-slate-800 h-4 -mx-2 rounded-b-sm" />
        </div>
      </div>
    </div>
  );
};

export default FuelTypeModal;