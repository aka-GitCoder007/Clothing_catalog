import React from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../types/filter';
import { ProductCategory, ProductSize } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { useUIStore } from '../../store/uiStore';

interface ActiveFiltersProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onReset: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filter,
  onFilterChange,
  onReset,
}) => {
  const { currency } = useUIStore();

  const removeCategory = (cat: ProductCategory) => {
    onFilterChange({
      ...filter,
      categories: filter.categories.filter((c) => c !== cat),
    });
  };

  const removeSize = (size: ProductSize) => {
    onFilterChange({
      ...filter,
      sizes: filter.sizes.filter((s) => s !== size),
    });
  };

  const removeColor = (color: string) => {
    onFilterChange({
      ...filter,
      colors: filter.colors.filter((c) => c !== color),
    });
  };

  const removeCollection = (col: string) => {
    onFilterChange({
      ...filter,
      collections: filter.collections.filter((c) => c !== col),
    });
  };

  const resetPrice = () => {
    onFilterChange({
      ...filter,
      priceRange: [0, 1600],
    });
  };

  const resetAvailability = () => {
    onFilterChange({
      ...filter,
      availability: 'all',
    });
  };

  const resetSearch = () => {
    onFilterChange({
      ...filter,
      searchQuery: '',
    });
  };

  const hasPills =
    filter.categories.length > 0 ||
    filter.sizes.length > 0 ||
    filter.colors.length > 0 ||
    filter.collections.length > 0 ||
    filter.availability !== 'all' ||
    filter.searchQuery.trim().length > 0 ||
    filter.priceRange[1] < 1600;

  if (!hasPills) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-[11px]">
      <span className="text-[#666666] uppercase tracking-wider text-[10px]">
        ACTIVE CRITERIA:
      </span>

      {filter.searchQuery && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE]">
          <span>QUERY: "{filter.searchQuery}"</span>
          <button onClick={resetSearch} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filter.categories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE] uppercase"
        >
          <span>{cat}</span>
          <button onClick={() => removeCategory(cat)} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filter.sizes.map((s) => (
        <span
          key={s}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE]"
        >
          <span>SIZE: {s}</span>
          <button onClick={() => removeSize(s)} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filter.colors.map((c) => (
        <span
          key={c}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE] uppercase"
        >
          <span>{c}</span>
          <button onClick={() => removeColor(c)} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filter.collections.map((col) => (
        <span
          key={col}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE]"
        >
          <span>{col}</span>
          <button onClick={() => removeCollection(col)} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {filter.availability !== 'all' && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE] uppercase">
          <span>{filter.availability.replace('-', ' ')}</span>
          <button onClick={resetAvailability} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {filter.priceRange[1] < 1600 && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#161616] border border-[#2a2a2a] text-[#F5F3EE]">
          <span>MAX {formatPrice(filter.priceRange[1], currency)}</span>
          <button onClick={resetPrice} className="hover:text-rose-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      <button
        onClick={onReset}
        className="text-[10px] text-[#A0A0A0] hover:text-[#F5F3EE] underline underline-offset-2 ml-2 uppercase"
      >
        CLEAR ALL
      </button>
    </div>
  );
};

