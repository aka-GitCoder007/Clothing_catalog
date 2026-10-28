import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 3,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center border border-[#1e1e1e] bg-[#0c0c0c] p-8 max-w-xl mx-auto my-8">
        <span className="text-[10px] font-mono tracking-widest text-[#9E1B22] uppercase block mb-2">
          NO ARCHIVE RECORDS FOUND
        </span>
        <h3 className="text-lg font-bold font-mono uppercase text-[#F5F3EE] mb-2">
          ZERO MATCHING SPECIMENS
        </h3>
        <p className="text-xs font-mono text-[#888888] mb-6 max-w-sm mx-auto">
          No garments match the current combination of filters or search parameters. Try expanding your parameters.
        </p>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            RESET ALL FILTERS
          </Button>
        )}
      </div>
    );
  }

  const columnClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${columnClass} gap-4 sm:gap-6`}>
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.4) }}
        >
          <ProductCard product={product} priority={idx < 4} />
        </motion.div>
      ))}
    </div>
  );
};

