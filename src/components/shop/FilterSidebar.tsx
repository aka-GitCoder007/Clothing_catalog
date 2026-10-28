import React from 'react';
import { FilterState } from '../../types/filter';
import { ProductCategory, ProductSize } from '../../types/product';
import { CATEGORIES, COLLECTIONS } from '../../data/products';
import { formatPrice } from '../../utils/formatters';
import { useUIStore } from '../../store/uiStore';
import { RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onReset: () => void;
  productCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filter,
  onFilterChange,
  onReset,
  productCount,
}) => {
  const { currency } = useUIStore();

  const allSizes: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'OS'];

  const colorPalette = [
    { label: 'Obsidian', hex: '#0a0a0a' },
    { label: 'Titanium', hex: '#8c8d8f' },
    { label: 'Chalk', hex: '#EBE8DF' },
    { label: 'Blood', hex: '#631015' },
    { label: 'Ash', hex: '#2c2d30' },
    { label: 'Silver', hex: '#C2C5CC' },
  ];

  const handleCategoryToggle = (catSlug: string) => {
    if (catSlug === 'all') {
      onFilterChange({ ...filter, categories: [] });
      return;
    }
    const cat = catSlug as ProductCategory;
    const exists = filter.categories.includes(cat);
    const updated = exists
      ? filter.categories.filter((c) => c !== cat)
      : [...filter.categories, cat];
    onFilterChange({ ...filter, categories: updated });
  };

  const handleSizeToggle = (size: ProductSize) => {
    const exists = filter.sizes.includes(size);
    const updated = exists
      ? filter.sizes.filter((s) => s !== size)
      : [...filter.sizes, size];
    onFilterChange({ ...filter, sizes: updated });
  };

  const handleColorToggle = (colorLabel: string) => {
    const exists = filter.colors.includes(colorLabel);
    const updated = exists
      ? filter.colors.filter((c) => c !== colorLabel)
      : [...filter.colors, colorLabel];
    onFilterChange({ ...filter, colors: updated });
  };

  const handleCollectionToggle = (colName: string) => {
    const exists = filter.collections.includes(colName);
    const updated = exists
      ? filter.collections.filter((c) => c !== colName)
      : [...filter.collections, colName];
    onFilterChange({ ...filter, collections: updated });
  };

  const handlePriceChange = (maxPrice: number) => {
    onFilterChange({ ...filter, priceRange: [filter.priceRange[0], maxPrice] });
  };

  const hasActiveFilters =
    filter.categories.length > 0 ||
    filter.sizes.length > 0 ||
    filter.colors.length > 0 ||
    filter.collections.length > 0 ||
    filter.availability !== 'all' ||
    filter.priceRange[1] < 1600;

  return (
    <aside className="w-full font-mono text-xs select-none">
      {/* Header with Results Count & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#222222] mb-6">
        <div>
          <span className="text-[10px] tracking-widest text-[#777777] uppercase block">
            INDEXED SPECIMENS
          </span>
          <span className="text-sm font-bold text-[#F5F3EE]">
            {productCount} GARMENTS
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-[11px] text-[#A0A0A0] hover:text-[#F5F3EE] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        )}
      </div>

      {/* 01. Categories */}
      <div className="mb-8">
        <h4 className="text-[11px] tracking-widest text-[#F5F3EE] uppercase font-bold mb-3">
          CATEGORIES
        </h4>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected =
              cat.slug === 'all'
                ? filter.categories.length === 0
                : filter.categories.includes(cat.slug as ProductCategory);

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryToggle(cat.slug)}
                className={`flex items-center justify-between w-full py-1 text-left transition-colors ${
                  isSelected
                    ? 'text-[#F5F3EE] font-bold'
                    : 'text-[#888888] hover:text-[#CCCCCC]'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 bg-[#9E1B22]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 02. Price Range */}
      <div className="mb-8 pt-6 border-t border-[#1e1e1e]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[11px] tracking-widest text-[#F5F3EE] uppercase font-bold">
            MAX PRICE
          </h4>
          <span className="text-xs font-bold text-[#F5F3EE]">
            {formatPrice(filter.priceRange[1], currency)}
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="1600"
          step="50"
          value={filter.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-[#F5F3EE] bg-[#222222] h-1 rounded-none appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#666666] mt-2">
          <span>{formatPrice(200, currency)}</span>
          <span>{formatPrice(1600, currency)}</span>
        </div>
      </div>

      {/* 03. Sizing Matrix */}
      <div className="mb-8 pt-6 border-t border-[#1e1e1e]">
        <h4 className="text-[11px] tracking-widest text-[#F5F3EE] uppercase font-bold mb-3">
          SIZES
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {allSizes.map((size) => {
            const isSelected = filter.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-1.5 text-center border text-[11px] transition-all ${
                  isSelected
                    ? 'border-[#F5F3EE] bg-[#F5F3EE] text-[#080808] font-bold'
                    : 'border-[#262626] text-[#888888] hover:border-[#444444] hover:text-[#F5F3EE]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 04. Color Swatches */}
      <div className="mb-8 pt-6 border-t border-[#1e1e1e]">
        <h4 className="text-[11px] tracking-widest text-[#F5F3EE] uppercase font-bold mb-3">
          TONAL PALETTE
        </h4>
        <div className="flex flex-wrap gap-2">
          {colorPalette.map((c) => {
            const isSelected = filter.colors.includes(c.label);
            return (
              <button
                key={c.label}
                onClick={() => handleColorToggle(c.label)}
                className={`flex items-center gap-2 px-2.5 py-1.5 border text-[10px] transition-all ${
                  isSelected
                    ? 'border-[#F5F3EE] bg-[#1a1a1a] text-[#F5F3EE]'
                    : 'border-[#262626] text-[#777777] hover:border-[#444444]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/50"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="uppercase">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 05. Availability */}
      <div className="mb-8 pt-6 border-t border-[#1e1e1e]">
        <h4 className="text-[11px] tracking-widest text-[#F5F3EE] uppercase font-bold mb-3">
          AVAILABILITY
        </h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'ALL ARCHIVE' },
            { id: 'in-stock', label: 'IN STOCK ONLY' },
            { id: 'limited', label: 'LIMITED EDITION [1/100]' },
          ].map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 cursor-pointer text-[#888888] hover:text-[#CCCCCC]"
            >
              <input
                type="radio"
                name="availability"
                checked={filter.availability === item.id}
                onChange={() =>
                  onFilterChange({
                    ...filter,
                    availability: item.id as 'all' | 'in-stock' | 'limited',
                  })
                }
                className="accent-[#9E1B22]"
              />
              <span className="text-xs uppercase">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 06. Collections */}
      <div className="pt-6 border-t border-[#1e1e1e]">
        <h4 className="text-[11px] tracking-widest text-[#F5F3EE] uppercase font-bold mb-3">
          COLLECTIONS
        </h4>
        <div className="space-y-1.5">
          {COLLECTIONS.map((col) => {
            const isSelected = filter.collections.includes(col.name);
            return (
              <button
                key={col.id}
                onClick={() => handleCollectionToggle(col.name)}
                className={`block w-full text-left py-1 text-xs truncate transition-colors ${
                  isSelected
                    ? 'text-[#F5F3EE] font-bold'
                    : 'text-[#888888] hover:text-[#CCCCCC]'
                }`}
              >
                {col.name}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

