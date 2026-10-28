import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Shield, Compass, Plus, X } from 'lucide-react';

interface Hotspot {
  id: string;
  x: string; // percentage
  y: string; // percentage
  title: string;
  tag: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'hood',
    x: '50%',
    y: '18%',
    title: 'ANATOMICAL COWL HOOD',
    tag: '650 GSM LOOPBACK',
    description: 'Double-ply structured drape engineered to hold architectural silhouette without drawcords.',
  },
  {
    id: 'chest',
    x: '46%',
    y: '42%',
    title: 'CRIMSON SPIDER EMBLEM',
    tag: 'HIGH-DENSITY INK',
    description: 'Raised tactile rubberized print with bio-metric radiating web geometry in archival crimson.',
  },
  {
    id: 'sleeve',
    x: '24%',
    y: '56%',
    title: 'ARTICULATED WEB SEAMS',
    tag: 'BIOMETRIC SLEEVE',
    description: 'Ergonomic elbow darting and angular geometric chevron panels for fluid arm movement.',
  },
  {
    id: 'hardware',
    x: '53%',
    y: '55%',
    title: 'TITANIUM AGLETS',
    tag: 'ANODIZED HARDWARE',
    description: 'Solid cylindrical silver aglets laser-engraved with VOID.ARCHIVE serial markers.',
  },
];

export const HeroProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [activeColor, setActiveColor] = useState<'obsidian' | 'crimson' | 'bone'>('obsidian');

  // Smooth mouse tilt parallax
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 14, // tilt pitch
      y: x * 18,  // tilt yaw
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[660px] flex items-center justify-center select-none font-mono overflow-visible"
    >
      {/* ========================================================
          ATMOSPHERIC EDITORIAL LIGHTING & AURA
          ======================================================== */}
      {/* Primary Radial Spotlight Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            background:
              activeColor === 'crimson'
                ? 'radial-gradient(circle at center, rgba(158, 27, 34, 0.22) 0%, rgba(224, 27, 45, 0.08) 40%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, rgba(158, 27, 34, 0.08) 35%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle Floor Ground Shadow Reflection */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-12 rounded-full pointer-events-none blur-xl opacity-80"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(10,10,12,0.6) 50%, transparent 80%)',
        }}
      />

      {/* ========================================================
          TOP EDITORIAL STATUS BADGE
          ======================================================== */}
      <div className="absolute top-2 left-2 sm:left-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 bg-[#0a0a0c]/85 border border-[#222228] backdrop-blur-md flex items-center gap-2.5 text-[9px] tracking-[0.24em] text-[#a0a0aa] shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B22] animate-pulse" />
          <span className="text-[#F5F3EE] font-bold">SP-01</span>
          <span className="text-[#444450]">|</span>
          <span>SPIDER TECH HOODIE</span>
        </div>
      </div>

      {/* TOP-RIGHT LIMITED SPECIMEN TAG */}
      <div className="absolute top-2 right-2 sm:right-4 z-20 hidden sm:flex items-center gap-2 pointer-events-auto">
        <div className="px-3 py-1.5 bg-[#0a0a0c]/85 border border-[#222228] backdrop-blur-md text-[9px] tracking-widest uppercase text-[#888899] shadow-xl">
          <span>EDITION [01/100]</span>
        </div>
      </div>

      {/* ========================================================
          THE MAIN HOODIE SPECIMEN (Smooth 3D Perspective Parallax)
          ======================================================== */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: isHovered ? -6 : [0, -8, 0],
        }}
        transition={{
          rotateX: { type: 'spring', stiffness: 220, damping: 26 },
          rotateY: { type: 'spring', stiffness: 220, damping: 26 },
          y: isHovered
            ? { duration: 0.3 }
            : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-10 flex items-center justify-center max-w-[92%] max-h-[90%]"
      >
        {/* Crisp High-Resolution Hoodie Image */}
        <img
          src="/assets/products/void-archive-spider-hoodie-hero.png"
          alt="SP-01 SPIDER TECH HOODIE"
          className="w-auto h-[400px] sm:h-[480px] lg:h-[530px] max-w-[92vw] sm:max-w-[490px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] transition-all duration-500"
          style={{
            filter:
              activeColor === 'crimson'
                ? 'contrast(1.1) drop-shadow(0 0 28px rgba(158,27,34,0.35))'
                : 'contrast(1.05)',
          }}
        />

        {/* ========================================================
            INTERACTIVE TECHNICAL CALLOUT HOTSPOTS
            ======================================================== */}
        {HOTSPOTS.map((spot) => {
          const isActive = activeHotspot?.id === spot.id;
          return (
            <div
              key={spot.id}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
            >
              {/* Hotspot Target Pin */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isActive ? null : spot);
                }}
                onMouseEnter={() => setActiveHotspot(spot)}
                className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
                aria-label={spot.title}
              >
                {/* Outer Ping Wave */}
                <span className="absolute w-5 h-5 rounded-full bg-[#9E1B22]/40 animate-ping opacity-75" />
                {/* Border Ring */}
                <span
                  className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center backdrop-blur-sm ${
                    isActive
                      ? 'border-[#ffffff] bg-[#9E1B22] scale-110 shadow-[0_0_12px_#ff2a3a]'
                      : 'border-[#F5F3EE]/80 bg-[#0a0a0c]/80 hover:border-[#ffffff] hover:bg-[#9E1B22]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </button>

              {/* Popover Specification Card */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 bottom-full sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 mb-2 sm:mb-0 w-64 p-3 bg-[#0c0c10]/95 border border-[#33333d] shadow-[0_15px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl z-40 text-left pointer-events-auto"
                  >
                    <div className="flex items-center justify-between border-b border-[#22222a] pb-1.5 mb-2">
                      <span className="text-[9px] text-[#ff3344] font-bold tracking-widest uppercase">
                        {spot.tag}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-[#666677] hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <h4 className="text-[11px] font-bold text-[#F5F3EE] uppercase tracking-wider mb-1">
                      {spot.title}
                    </h4>
                    <p className="text-[10px] text-[#8e8e9c] leading-relaxed font-sans font-light">
                      {spot.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      {/* ========================================================
          BOTTOM EDITORIAL BAR (Material Swatches & Quick Link)
          ======================================================== */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Color Coating Selector */}
        <div className="flex items-center gap-2 bg-[#0c0c10]/85 border border-[#222228] px-3 py-1.5 backdrop-blur-md">
          <span className="text-[9px] text-[#666677] uppercase tracking-wider hidden sm:inline">
            COATING:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveColor('obsidian')}
              className={`flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-wider uppercase border transition-all ${
                activeColor === 'obsidian'
                  ? 'border-[#F5F3EE] bg-[#222228] text-white font-bold'
                  : 'border-[#222228] text-[#71717a] hover:text-[#ded8cc]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#0a0a0c] border border-[#555566]" />
              <span>OBSIDIAN</span>
            </button>

            <button
              onClick={() => setActiveColor('crimson')}
              className={`flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-wider uppercase border transition-all ${
                activeColor === 'crimson'
                  ? 'border-[#9E1B22] bg-[#9E1B22]/20 text-rose-300 font-bold'
                  : 'border-[#222228] text-[#71717a] hover:text-[#ded8cc]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#9E1B22] border border-rose-400" />
              <span>CRIMSON</span>
            </button>

            <button
              onClick={() => setActiveColor('bone')}
              className={`flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-wider uppercase border transition-all ${
                activeColor === 'bone'
                  ? 'border-[#ded8cc] bg-[#ded8cc]/20 text-[#ded8cc] font-bold'
                  : 'border-[#222228] text-[#71717a] hover:text-[#ded8cc]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ded8cc] border border-white" />
              <span>BONE</span>
            </button>
          </div>
        </div>

        {/* View Specimen Atelier Link */}
        <Link
          to="/product/sp-01-spider-hoodie"
          className="group flex items-center gap-2 px-3.5 py-1.5 bg-[#0e0e12]/90 hover:bg-[#181822] border border-[#2a2a34] hover:border-[#666677] text-[10px] tracking-widest uppercase text-[#F5F3EE] backdrop-blur-md transition-all shadow-xl"
        >
          <span>SPECIMEN DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#9E1B22] group-hover:text-white transition-colors" />
        </Link>
      </div>
    </div>
  );
};

