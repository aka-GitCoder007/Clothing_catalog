import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductGrid } from '../product/ProductGrid';
import { Button } from '../ui/Button';

export const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'outerwear' | 'hoodies' | 'pants' | 'footwear'>('all');

  const tabs: { id: 'all' | 'outerwear' | 'hoodies' | 'pants' | 'footwear'; label: string }[] = [
    { id: 'all', label: 'ALL BEST SELLERS' },
    { id: 'outerwear', label: 'OUTERWEAR' },
    { id: 'hoodies', label: 'HOODIES' },
    { id: 'pants', label: 'CARGOS & TROUSERS' },
    { id: 'footwear', label: 'FOOTWEAR' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.isBestSeller || p.isFeatured;
    return p.category === activeTab && (p.isBestSeller || p.isFeatured);
  }).slice(0, 6);

  return (
    <section className="py-20 sm:py-28 border-b border-[#1c1c1c] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#9E1B22] block mb-2 font-bold">
              02 // FLAGSHIP PIECES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-[#F5F3EE]">
              ICONIC ACQUISITIONS
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider border transition-all ${
                  activeTab === tab.id
                    ? 'border-[#F5F3EE] bg-[#F5F3EE] text-[#080808] font-bold'
                    : 'border-[#222222] text-[#888888] hover:border-[#444444] hover:text-[#F5F3EE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} columns={3} />

        {/* Bottom CTA to Shop */}
        <div className="mt-14 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <p className="text-xs text-[#777777]">
            SHOWING {filteredProducts.length} OF {PRODUCTS.length} TOTAL ARCHIVE SPECIMENS
          </p>
          <Link to="/shop">
            <Button
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              EXPLORE COMPLETE SHOP (18 PIECES)
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

