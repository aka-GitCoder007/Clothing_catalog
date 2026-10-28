import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid3X3, Grid2X2, LayoutGrid } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { FilterState } from '../types/filter';
import { ProductCategory } from '../types/product';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { FilterDrawer } from '../components/shop/FilterDrawer';
import { SortDropdown } from '../components/shop/SortDropdown';
import { ActiveFilters } from '../components/shop/ActiveFilters';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [visibleCount, setVisibleCount] = useState(12);

  // Initial filter state from URL params
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1600],
    sizes: [],
    colors: [],
    availability: 'all',
    collections: [],
    searchQuery: '',
    sortBy: 'featured',
  });

  // Sync with searchParams when URL changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category');
    const col = searchParams.get('collection');
    const filterTag = searchParams.get('filter');

    const newCats: ProductCategory[] = [];
    if (cat && ['outerwear', 'hoodies', 't-shirts', 'pants', 'footwear', 'accessories'].includes(cat)) {
      newCats.push(cat as ProductCategory);
    }

    const newCols: string[] = [];
    if (col) {
      newCols.push(col);
    }

    let availability: 'all' | 'in-stock' | 'limited' = 'all';
    if (filterTag === 'limited') {
      availability = 'limited';
    }

    let sortBy: FilterState['sortBy'] = 'featured';
    if (filterTag === 'new') {
      sortBy = 'newest';
    }

    setFilters((prev) => ({
      ...prev,
      searchQuery: q,
      categories: newCats,
      collections: newCols,
      availability,
      sortBy,
    }));
  }, [searchParams]);

  // Handle filter resets
  const handleResetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1600],
      sizes: [],
      colors: [],
      availability: 'all',
      collections: [],
      searchQuery: '',
      sortBy: 'featured',
    });
    setSearchParams({});
    setVisibleCount(12);
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchCol = product.collection.toLowerCase().includes(q);
        const matchMaterials = product.materials.some((m) => m.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCategory && !matchCol && !matchMaterials) {
          return false;
        }
      }

      // 2. Category
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) {
          return false;
        }
      }

      // 3. Price Range
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // 4. Sizes
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((s) => product.sizes.includes(s));
        if (!hasSize) return false;
      }

      // 5. Colors
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some((filterColor) =>
          product.colors.some((pc) =>
            pc.name.toLowerCase().includes(filterColor.toLowerCase())
          )
        );
        if (!hasColor) return false;
      }

      // 6. Availability
      if (filters.availability === 'in-stock') {
        const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
        if (totalStock <= 0) return false;
      } else if (filters.availability === 'limited') {
        if (!product.isLimitedEdition) return false;
      }

      // 7. Collections
      if (filters.collections.length > 0) {
        if (!filters.collections.includes(product.collection)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  const paginatedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 pb-6 border-b border-[#1c1c1c] font-mono">
          <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-2">
            <span>INDEX</span>
            <span>/</span>
            <span className="text-[#F5F3EE]">CATALOGUE ARCHIVE</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-[#F5F3EE]">
                TECHNICAL CATALOGUE
              </h1>
              <p className="text-xs text-[#888888] mt-2 max-w-lg font-sans">
                Exploration of engineered technical textiles, articulated patterns, and modular tactical layering systems.
              </p>
            </div>
            <span className="text-xs text-[#666666]">
              SHOWING {paginatedProducts.length} OF {filteredProducts.length} ARCHIVAL PIECES
            </span>
          </div>
        </div>

        {/* Filter Toolbar (Mobile Button, Sort, Layout Switcher) */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#181818] font-mono">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-[#121212] border border-[#2a2a2a] text-xs uppercase text-[#F5F3EE]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>FILTERS</span>
            <span className="bg-[#222222] px-1.5 py-0.2 text-[10px]">
              {filteredProducts.length}
            </span>
          </button>

          {/* Desktop Summary Info */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-[#888888]">
            <span>TOTAL SPECIMENS: <strong className="text-[#F5F3EE]">{filteredProducts.length}</strong></span>
          </div>

          {/* Right Controls: Sort Dropdown & Column Layout Selector */}
          <div className="flex items-center gap-4 ml-auto">
            <SortDropdown
              value={filters.sortBy}
              onChange={(sortBy) => setFilters((prev) => ({ ...prev, sortBy }))}
            />

            {/* Grid Columns Switcher */}
            <div className="hidden sm:flex items-center gap-1 border border-[#262626] bg-[#121212] p-0.5">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 transition-colors ${
                  gridColumns === 2 ? 'bg-[#F5F3EE] text-black' : 'text-[#888888] hover:text-[#F5F3EE]'
                }`}
                aria-label="2 Columns View"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition-colors ${
                  gridColumns === 3 ? 'bg-[#F5F3EE] text-black' : 'text-[#888888] hover:text-[#F5F3EE]'
                }`}
                aria-label="3 Columns View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 transition-colors ${
                  gridColumns === 4 ? 'bg-[#F5F3EE] text-black' : 'text-[#888888] hover:text-[#F5F3EE]'
                }`}
                aria-label="4 Columns View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        <ActiveFilters
          filter={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />

        {/* Main Content Layout: Desktop Sidebar (Left) + Product Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 bg-[#0a0a0a] p-6 border border-[#1e1e1e]">
            <FilterSidebar
              filter={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid Area (9 cols or 12 cols) */}
          <div className="lg:col-span-9">
            <ProductGrid
              products={paginatedProducts}
              columns={gridColumns}
              onResetFilters={handleResetFilters}
            />

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-14 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  LOAD MORE SPECIMENS ({filteredProducts.length - visibleCount} REMAINING)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filter={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        productCount={filteredProducts.length}
      />
    </div>
  );
};
