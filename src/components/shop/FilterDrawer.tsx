import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { FilterState } from '../../types/filter';
import { FilterSidebar } from './FilterSidebar';
import { Button } from '../ui/Button';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onReset: () => void;
  productCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filter,
  onFilterChange,
  onReset,
  productCount,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080808]/85 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#0e0e0e] border-r border-[#222222] shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#222222]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold tracking-wider uppercase text-[#F5F3EE]">
                  FILTER ARCHIVE
                </span>
                <span className="text-[10px] font-mono text-[#888888] bg-[#1a1a1a] px-2 py-0.5 border border-[#2a2a2a]">
                  {productCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-[#A0A0A0] hover:text-[#F5F3EE]"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="p-6 overflow-y-auto flex-1">
              <FilterSidebar
                filter={filter}
                onFilterChange={onFilterChange}
                onReset={onReset}
                productCount={productCount}
              />
            </div>

            {/* Footer Apply */}
            <div className="p-4 border-t border-[#222222] bg-[#0c0c0c] flex gap-3">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => {
                  onReset();
                }}
              >
                CLEAR
              </Button>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={onClose}
              >
                APPLY ({productCount})
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

