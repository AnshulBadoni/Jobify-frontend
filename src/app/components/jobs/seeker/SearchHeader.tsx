import React from 'react';
import { Search, MapPin, Briefcase, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../../../constant';

interface SearchHeaderProps {
  onSearch: (keyword: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch, selectedCategory, onCategoryChange }) => {
  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 transition-colors rounded-xl">
      <div className=" mx-auto px-2 py-3 space-y-3">
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center pr-12 lg:pr-14">
          <div className="flex gap-2 w-full lg:flex-1">
            <div className="flex-1 relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-4.5 h-4.5 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search jobs, skills, companies..."
                className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:border-blue-300 dark:focus:border-blue-600 focus:bg-white dark:focus:bg-neutral-800 transition-all text-[14px] placeholder:text-neutral-400 dark:text-neutral-200 font-medium"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            {/* Search Button beside input on phone */}
            <button className="lg:hidden px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm active:scale-95 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden lg:flex gap-2 shrink-0">
            <div className="w-44 relative group">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-4 h-4" />
              <select className="w-full pl-10 pr-8 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg appearance-none focus:outline-none focus:bg-white dark:focus:bg-neutral-800 transition-all text-[13px] font-bold text-neutral-700 dark:text-neutral-300 cursor-pointer">
                <option>All Types</option>
                <option>Freelancer</option>
                <option>Full Time</option>
                <option>Remote</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
            </div>

            <div className="w-48 relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:bg-white dark:focus:bg-neutral-800 transition-all text-[13px] dark:text-neutral-200 font-medium"
              />
            </div>
          </div>

          <button className="hidden lg:block px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-display font-bold rounded-lg transition-all text-sm shadow-sm active:scale-[0.98]">
            Search
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar -mx-2 px-2">
          {CATEGORIES.map((cat: any) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 whitespace-nowrap border rounded-full text-[11px] font-bold transition-all font-display ${selectedCategory === cat
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;