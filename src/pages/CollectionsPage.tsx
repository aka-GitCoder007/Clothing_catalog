import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '../data/products';
import { FALLBACK_IMAGE } from '../utils/constants';
import { Button } from '../components/ui/Button';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-[#F5F3EE] transition-colors">INDEX</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE]">CAPSULES & COLLECTIONS</span>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-[#1c1c1c] mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] font-bold block mb-2">
            ATELIER ARCHIVES
          </span>
          <h1 className="text-3xl sm:text-6xl font-extrabold uppercase text-[#F5F3EE] tracking-tight">
            CAPSULE ARCHIVES
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] font-sans mt-3 max-w-xl leading-relaxed">
            Curated collections representing distinct engineering initiatives, textile breakthroughs, and post-industrial silhouettes.
          </p>
        </div>

        {/* Collections Detailed Stack */}
        <div className="space-y-24">
          {COLLECTIONS.map((col, index) => {
            const colProducts = PRODUCTS.filter((p) => p.collection === col.name);
            const isEven = index % 2 === 0;

            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pb-20 border-b border-[#181818]"
              >
                {/* Image (6 cols) */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] bg-[#141414] border border-[#222222] overflow-hidden group ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={col.image}
                    alt={col.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#080808]/80 border border-[#333333] px-3 py-1 text-[10px] text-[#A0A0A0]">
                    CAPSULE NO. 0{index + 1}
                  </div>
                </div>

                {/* Info (6 cols) */}
                <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#9E1B22] font-bold block mb-1">
                    {col.season}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#F5F3EE] tracking-tight mb-4">
                    {col.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-sans font-light text-[#999999] leading-relaxed mb-6">
                    {col.description}
                  </p>

                  <div className="flex items-center gap-6 mb-8 text-[11px] text-[#777777] border-y border-[#181818] py-3">
                    <span>SPECIMENS: <strong className="text-[#F5F3EE]">{colProducts.length} GARMENTS</strong></span>
                    <span>ORIGIN: <strong className="text-[#F5F3EE]">TOKYO / PARIS</strong></span>
                  </div>

                  <Link to={`/shop?collection=${encodeURIComponent(col.name)}`}>
                    <Button
                      variant="primary"
                      size="md"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      EXPLORE {col.name.split(' ')[0]} CAPSULE
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

