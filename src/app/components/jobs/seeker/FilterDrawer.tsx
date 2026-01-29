"use client"
import React, { useState, useMemo } from 'react';
import { X, RotateCcw, MapPin, Briefcase, IndianRupee, Search, Check } from 'lucide-react';
import { FILTER_OPTIONS } from '../../../constant';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const [minVal, setMinVal] = useState(5);
  const [maxVal, setMaxVal] = useState(100);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const min = 0;
  const max = 100;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 5);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 5);
    setMaxVal(value);
  };

  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  const toggleMode = (mode: string) => {
    setSelectedModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const filteredLocationOptions = useMemo(() => {
    const query = locationSearch.toLowerCase().trim();
    if (!query) return FILTER_OPTIONS.locations;
    return FILTER_OPTIONS.locations.filter(loc =>
      loc.toLowerCase().includes(query)
    );
  }, [locationSearch]);

  const resetFilters = () => {
    setMinVal(5);
    setMaxVal(100);
    setSelectedModes([]);
    setSelectedLocations([]);
    setLocationSearch('');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-neutral-900/40 dark:bg-black/80 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[340px] md:w-[380px] bg-white dark:bg-neutral-900 z-[70] shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-r border-neutral-200 dark:border-neutral-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-display font-bold text-neutral-900 dark:text-white">Refine Search</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Salary Section */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] font-display font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em]">Expected Salary (LPA)</h3>
              <IndianRupee className="w-3.5 h-3.5 text-neutral-400" />
            </div>
            <div className="px-2 pt-2 pb-6">
              <div className="relative h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-8">
                <div
                  className="absolute h-1 bg-blue-500 rounded-full z-[1]"
                  style={{
                    left: `${getPercent(minVal)}%`,
                    width: `${getPercent(maxVal) - getPercent(minVal)}%`
                  }}
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={minVal}
                  step={1}
                  onChange={handleMinChange}
                  className="range-input"
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={maxVal}
                  step={1}
                  onChange={handleMaxChange}
                  className="range-input"
                />
              </div>
              <div className="flex justify-between items-center bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                <div className="text-center">
                  <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-tighter mb-1">Min (₹)</span>
                  <span className="text-base font-bold text-neutral-800 dark:text-neutral-100 font-display">{minVal}L</span>
                </div>
                <div className="w-6 h-px bg-neutral-300 dark:bg-neutral-600" />
                <div className="text-center">
                  <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-tighter mb-1">Max (₹)</span>
                  <span className="text-base font-bold text-neutral-800 dark:text-neutral-100 font-display">
                    {maxVal === max ? '1Cr+' : `${maxVal}L`}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Work Mode Chips */}
          <section>
            <h3 className="text-[11px] font-display font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4">Work Mode</h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.workModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => toggleMode(mode)}
                  className={`px-4 py-2 text-[12px] font-bold rounded-xl border transition-all ${selectedModes.includes(mode)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-blue-400'
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </section>

          {/* Scalable Multi-select Searchable Location */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[11px] font-display font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em]">Locations</h3>
              <MapPin className="w-3 h-3 text-neutral-400" />
            </div>

            {/* Search box inside the drawer */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search for cities..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-sm dark:text-neutral-200"
              />
            </div>

            {/* Selected Cities Display */}
            {selectedLocations.length > 0 && (
              <div className="flex flex-wrap gap-2 p-1">
                {selectedLocations.map(loc => (
                  <span key={loc} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[11px] font-bold rounded-lg border border-blue-100 dark:border-blue-800/50 group">
                    {loc}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                      onClick={() => toggleLocation(loc)}
                    />
                  </span>
                ))}
              </div>
            )}

            {/* Filterable List with scroll */}
            <div className="max-h-[220px] overflow-y-auto pr-1 custom-scrollbar space-y-1">
              {filteredLocationOptions.length > 0 ? (
                filteredLocationOptions.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => toggleLocation(loc)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-[13px] font-medium transition-all group ${selectedLocations.includes(loc)
                        ? 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-600 dark:text-neutral-500'
                      }`}
                  >
                    <span>{loc}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedLocations.includes(loc)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-neutral-200 dark:border-neutral-700'
                      }`}>
                      {selectedLocations.includes(loc) && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-[12px] text-neutral-400 italic">No cities found matching "{locationSearch}"</p>
                </div>
              )}
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h3 className="text-[11px] font-display font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-4">Experience Level</h3>
            <div className="space-y-3">
              {FILTER_OPTIONS.experienceLevels.map((level) => (
                <label key={level} className="flex items-center justify-between p-3 border border-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors group">
                  <span className="text-[13px] text-neutral-700 dark:text-neutral-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{level}</span>
                  <input type="radio" name="exp" className="w-4 h-4 border-neutral-300 dark:border-neutral-700 bg-transparent text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-display font-bold rounded-2xl shadow-lg shadow-blue-600/10 transition-all active:scale-[0.98]"
          >
            Show Results
          </button>
          <button
            onClick={resetFilters}
            className="px-5 py-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-2xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all active:scale-[0.98]"
            title="Reset Filters"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;