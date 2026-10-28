import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, Compass, Sparkles, Layers, Sliders } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroProductShowcase } from './HeroProductShowcase';
import { useUIStore } from '../../store/uiStore';

export const HeroSection: React.FC = () => {
  const { heroTransitionStyle, setHeroTransitionStyle, replayIntro } = useUIStore();
  const [showStyleMenu, setShowStyleMenu] = useState(false);

  const scrollToCollections = () => {
    const el = document.getElementById('featured-collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Transition variants mapping
  const transitionVariants = {
    'cinematic-lens': {
      initial: { opacity: 0, scale: 1.05, filter: 'blur(16px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
    },
    'horizon-rise': {
      initial: { opacity: 0, y: 70, filter: 'blur(6px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
    'shutter-wipe': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    'light-expansion': {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const currentTransition = transitionVariants[heroTransitionStyle];

  const transitionList = [
    {
      id: 'cinematic-lens',
      name: 'Cinematic Lens Unblur',
      tag: 'Apple Pro / Prada',
      desc: 'Deep focus optical zoom with staggered masked typography.',
    },
    {
      id: 'shutter-wipe',
      name: 'Architectural Shutter Split',
      tag: 'Balenciaga / A-COLD-WALL*',
      desc: 'Dual brutalist titanium shutters slicing open from center.',
    },
    {
      id: 'horizon-rise',
      name: 'Monolithic Horizon Rise',
      tag: 'Rick Owens / Saint Laurent',
      desc: 'Monumental vertical ascent from darkness with depth parallax.',
    },
    {
      id: 'light-expansion',
      name: 'Laser Grid Expansion',
      tag: 'Sci-Fi Haute Couture',
      desc: 'Anamorphic light beam expanding outward to illuminate layout.',
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between border-b border-[#1c1c1c] overflow-hidden bg-[#080808]">
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-10 editorial-noise pointer-events-none" />

      {/* SHUTTER-WIPE TRANSITION OVERLAY */}
      {heroTransitionStyle === 'shutter-wipe' && (
        <>
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 inset-x-0 h-1/2 bg-[#050505] z-50 border-b border-[#222222] pointer-events-none"
          />
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#050505] z-50 border-t border-[#222222] pointer-events-none"
          />
        </>
      )}

      {/* LIGHT-EXPANSION TRANSITION BEAM */}
      {heroTransitionStyle === 'light-expansion' && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1.4, 2.0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute top-1/2 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent shadow-[0_0_25px_#ffffff] z-50 pointer-events-none"
        />
      )}

      {/* Main Grid: Editorial Typography Left + 3D Spatial Canvas Right */}
      <motion.div
        key={heroTransitionStyle}
        initial={currentTransition.initial}
        animate={currentTransition.animate}
        transition={currentTransition.transition}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Monumental Editorial Narrative (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10 font-mono">
            {/* Top Season Protocol Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#9E1B22] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#A0A0A0]">
                AUTUMN / WINTER 2026
              </span>
              <span className="text-[10px] text-[#555555]">
                // CHAPTER VII
              </span>
            </motion.div>

            {/* Giant Architectural Headline with Masked Line Stagger */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-[-0.04em] text-[#F5F3EE] uppercase leading-[0.92] mb-6">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  SYSTEMIC
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-stroke text-stroke-hover transition-all">SILENCE</span>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                >
                  ARCHIVE.
                </motion.div>
              </div>
            </h1>

            {/* Editorial Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm text-[#888888] font-sans font-light leading-relaxed max-w-lg mb-8"
            >
              Avant-garde technical research meets brutalist architectural tailoring. 
              Engineered with 3-layer GORE-TEX Pro, titanium hardware, and ballistic Cordura for post-industrial conditions.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  ACQUIRE ARCHIVE
                </Button>
              </Link>

              <Link to="/editorial">
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Compass className="w-4 h-4" />}
                >
                  RUNWAY DOSSIER
                </Button>
              </Link>
            </motion.div>

            {/* Technical Metadata Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-12 pt-6 border-t border-[#1a1a1a] grid grid-cols-3 gap-4 text-[10px] text-[#666666]"
            >
              <div>
                <span className="block text-[#888888] font-semibold">MEMBRANE</span>
                <span className="text-[#F5F3EE]">GORE-TEX PRO 3L</span>
              </div>
              <div>
                <span className="block text-[#888888] font-semibold">HARDWARE</span>
                <span className="text-[#F5F3EE]">GERMAN FIDLOCK®</span>
              </div>
              <div>
                <span className="block text-[#888888] font-semibold">EDITION</span>
                <span className="text-[#9E1B22] font-bold">100 SERIALIZED</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Seamless Editorial Hoodie Showcase (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full relative z-10 flex items-center justify-center"
          >
            <HeroProductShowcase />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Atelier Bar with Interactive Transition Selector */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-[#666666]">
        {/* Transition Selector Pill */}
        <div className="relative flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0e0e12] border border-[#26262e] text-[#a0a0aa]">
            <Sparkles className="w-3 h-3 text-[#F5F3EE]" />
            <span className="uppercase text-[9px] tracking-wider text-[#888899]">TRANSITION:</span>
            <button
              onClick={() => setShowStyleMenu(!showStyleMenu)}
              className="text-[#F5F3EE] hover:text-white uppercase font-bold tracking-widest flex items-center gap-1.5"
            >
              <span>{transitionList.find((t) => t.id === heroTransitionStyle)?.name}</span>
              <span className="text-[#666677]">▾</span>
            </button>
          </div>

          <button
            onClick={replayIntro}
            title="Replay intro to see the transition in action"
            className="px-2.5 py-1.5 bg-[#121218] border border-[#2a2a34] text-[#888899] hover:text-[#F5F3EE] hover:border-[#444455] uppercase text-[9px] tracking-widest transition-colors"
          >
            TEST REPLAY
          </button>

          {/* Transition Dropdown Menu */}
          <AnimatePresence>
            {showStyleMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-0 mb-2 w-80 bg-[#0c0c10] border border-[#2a2a34] shadow-2xl p-2 z-50 divide-y divide-[#1a1a22]"
              >
                <div className="px-3 py-2 text-[9px] text-[#666677] uppercase tracking-widest font-bold">
                  SELECT HERO ENTRANCE STYLE
                </div>
                {transitionList.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setHeroTransitionStyle(t.id as any);
                      setShowStyleMenu(false);
                      replayIntro();
                    }}
                    className={`w-full text-left p-2.5 transition-colors flex flex-col gap-0.5 ${
                      heroTransitionStyle === t.id
                        ? 'bg-[#181824] text-white border-l-2 border-[#9E1B22]'
                        : 'hover:bg-[#14141c] text-[#a0a0aa] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t.name}</span>
                      <span className="text-[8px] text-[#777788] px-1.5 py-0.5 bg-[#08080a] border border-[#1e1e26]">
                        {t.tag}
                      </span>
                    </div>
                    <span className="text-[8.5px] text-[#666677] leading-tight mt-0.5">{t.desc}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Anchor */}
        <button
          onClick={scrollToCollections}
          className="flex items-center gap-2 hover:text-[#F5F3EE] transition-colors uppercase tracking-widest group"
        >
          <span>EXPLORE CAPSULES</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
