import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { FALLBACK_IMAGE } from '../../utils/constants';

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-32 border-b border-[#1c1c1c] bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Tag */}
        <div className="flex items-center gap-2 mb-4 font-mono">
          <span className="w-2 h-2 bg-[#9E1B22]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#888888]">
            03 // VISUAL RESEARCH & PHILOSOPHY
          </span>
        </div>

        {/* Asymmetrical Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Dramatic High-Fashion Editorial Image Showcase (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            {/* Primary Portrait Image */}
            <div className="col-span-8 relative aspect-[4/5] bg-[#141414] border border-[#222222] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=85"
                alt="Editorial Campaign Look 01"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#A0A0A0] bg-[#0c0c0c]/80 px-3 py-1 border border-[#222222]">
                PARIS RUNWAY // SYSTEMIC SILENCE
              </div>
            </div>

            {/* Secondary Inset Image & Specimen Plate */}
            <div className="col-span-4 flex flex-col justify-between gap-4">
              <div className="relative aspect-[3/4] bg-[#141414] border border-[#222222] overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
                  alt="Editorial Campaign Look 02"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Technical Specimen Plate */}
              <div className="p-4 bg-[#101010] border border-[#222222] font-mono text-[10px] text-[#777777] flex flex-col justify-between">
                <div>
                  <span className="text-[#F5F3EE] font-bold block mb-1">
                    PROTOCOL SPECIFICATION
                  </span>
                  <p className="leading-relaxed">
                    Hydrophobic membrane bonded at 240°C with ultrasonic sealed perimeter.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#1c1c1c] text-[#9E1B22] font-bold">
                  TOKYO ATELIER LAB
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Manifesto & Typography (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center font-mono">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A0A0A0] mb-3">
              THE MANIFESTO
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase text-[#F5F3EE] tracking-tight leading-[1.05] mb-6">
              FORM SUBVERTS UTILITY. UTILITY ENFORCES FORM.
            </h3>
            <p className="text-xs sm:text-sm font-sans font-light text-[#999999] leading-relaxed mb-6">
              VØID ARCHIVE was conceived as an antidote to fast fashion decadence. 
              We operate at the nexus of extreme performance technical outerwear and post-industrial haute couture. 
              Every seam is considered a structural load path; every fabric is torture-tested against elemental extremes.
            </p>

            <blockquote className="p-4 bg-[#0d0d0d] border-l-2 border-[#9E1B22] text-xs italic text-[#CCCCCC] mb-8 font-sans">
              "We do not design garments for seasonal cycles; we forge wearable architectures built to outlast civilization."
            </blockquote>

            <div className="flex items-center gap-4">
              <Link to="/about">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Compass className="w-4 h-4" />}
                >
                  READ ATELIER MANIFESTO
                </Button>
              </Link>
              <Link to="/editorial">
                <Button
                  variant="ghost"
                  size="md"
                  icon={<Eye className="w-4 h-4" />}
                >
                  VIEW LOOKBOOK
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

