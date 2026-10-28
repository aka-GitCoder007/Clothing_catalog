import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '../../data/products';
import { FALLBACK_IMAGE } from '../../utils/constants';

export const FeaturedCollections: React.FC = () => {
  return (
    <section id="featured-collections" className="py-20 sm:py-28 border-b border-[#1c1c1c] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#1c1c1c]">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#9E1B22] block mb-2 font-bold">
              01 // CAPSULE INDEX
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-[#F5F3EE]">
              FEATURED COLLECTIONS
            </h2>
          </div>
          <p className="text-xs font-mono text-[#888888] max-w-sm">
            Strict brutalist volumes and technical fabrics grouped by architectural ethos and production batch.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, index) => (
            <Link
              key={col.id}
              to={`/shop?collection=${encodeURIComponent(col.name)}`}
              className="group relative flex flex-col justify-between aspect-[3/4] bg-[#121212] border border-[#222222] hover:border-[#444444] p-6 overflow-hidden transition-all duration-500 font-mono"
            >
              {/* Background Photography with Dimming & Scale */}
              <div className="absolute inset-0 z-0">
                <img
                  src={col.image}
                  alt={col.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover grayscale contrast-125 opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
              </div>

              {/* Card Top: Season Tag & Arrow */}
              <div className="relative z-10 flex items-center justify-between text-[10px] tracking-widest text-[#A0A0A0]">
                <span>NO. 0{index + 1}</span>
                <div className="w-8 h-8 rounded-none border border-[#333333] group-hover:border-[#F5F3EE] bg-[#080808]/80 flex items-center justify-center text-[#F5F3EE] group-hover:bg-[#F5F3EE] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Bottom: Headline & Description */}
              <div className="relative z-10">
                <span className="text-[9px] tracking-widest text-[#9E1B22] uppercase block mb-1 font-bold">
                  {col.season}
                </span>
                <h3 className="text-lg font-bold uppercase text-[#F5F3EE] tracking-wider leading-snug group-hover:text-white transition-colors">
                  {col.name}
                </h3>
                <p className="text-[11px] text-[#A0A0A0] font-sans mt-2 line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#666666]">
                  <span>ARCHIVE UNITS:</span>
                  <span className="text-[#F5F3EE] font-bold">{col.itemCount} SPECIMENS</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

