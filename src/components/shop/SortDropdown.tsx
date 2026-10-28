import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterState } from '../../types/filter';

interface SortDropdownProps {
  value: FilterState['sortBy'];
  onChange: (value: FilterState['sortBy']) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const sortOptions: { id: FilterState['sortBy']; label: string }[] = [
    { id: 'featured', label: 'FEATURED ARCHIVES' },
    { id: 'newest', label: 'NEW ARRIVALS FIRST' },
    { id: 'price-asc', label: 'PRICE: LOW TO HIGH' },
    { id: 'price-desc', label: 'PRICE: HIGH TO LOW' },
    { id: 'rating', label: 'TOP RATED' },
  ];

  return (
    <div className="relative inline-flex items-center font-mono">
      <label htmlFor="shop-sort-select" className="text-[10px] tracking-widest text-[#777777] uppercase mr-2 hidden sm:inline">
        SORT BY:
      </label>
      <div className="relative">
        <select
          id="shop-sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
          aria-label="Sort products by"
          className="appearance-none bg-[#121212] border border-[#262626] hover:border-[#3e3e3e] text-[#F5F3EE] text-xs py-2 pl-3 pr-8 uppercase cursor-pointer focus:outline-none focus:border-[#F5F3EE] transition-colors"
        >
          {sortOptions.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-[#121212] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-[#888888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

