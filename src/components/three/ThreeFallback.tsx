import React from 'react';
import { Cpu } from 'lucide-react';
import { FALLBACK_IMAGE } from '../../utils/constants';

interface ThreeFallbackProps {
  onRetry?: () => void;
}

export const ThreeFallback: React.FC<ThreeFallbackProps> = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-gradient-to-b from-[#0c0c0c] to-[#050505] border border-[#222222] p-8 overflow-hidden select-none">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-15 editorial-noise" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#F5F3EE]/30 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#F5F3EE]/30 to-transparent" />

      {/* Center 2.5D Layered Graphic */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        <div className="relative w-72 h-80 sm:w-80 sm:h-96 flex items-center justify-center">
          {/* Circular HUD coordinate ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#444444] animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute inset-6 rounded-full border border-[#2e2e2e]" />

          {/* Central Silhouette Photo */}
          <img
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85"
            alt="M-01 EXOSKELETON PARKA ARCHIVE"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className="w-56 h-72 object-cover grayscale contrast-125 border border-[#333333] shadow-2xl relative z-10"
          />

          {/* Technical Data Badges */}
          <div className="absolute -top-2 -left-4 bg-[#141414] border border-[#333333] px-3 py-1 text-[9px] font-mono tracking-widest text-[#F5F3EE]">
            FIG 01.1 // GORE-TEX 3L
          </div>
          <div className="absolute -bottom-2 -right-4 bg-[#141414] border border-[#333333] px-3 py-1 text-[9px] font-mono tracking-widest text-[#9E1B22]">
            FIDLOCK® V-BUCKLE
          </div>
        </div>

        {/* Caption */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#888888] uppercase mb-1">
            <Cpu className="w-3.5 h-3.5 text-[#9E1B22]" />
            SPATIAL 2.5D HIGH-RESOLUTION FALLBACK ACTIVE
          </div>
          <p className="text-xs font-mono text-[#A0A0A0] max-w-xs">
            Exoskeleton M-01 Shell shown in full archival studio specification.
          </p>
        </div>
      </div>
    </div>
  );
};

