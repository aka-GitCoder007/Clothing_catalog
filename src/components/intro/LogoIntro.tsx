import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LogoIntroProps {
  onComplete: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEnding, setIsEnding] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef<boolean>(false);

  // Smooth exit transition into homepage
  const handleComplete = useCallback(() => {
    if (isEnding) return;
    setIsEnding(true);
    setTimeout(() => {
      onComplete();
    }, 750);
  }, [isEnding, onComplete]);

  // Immediate Skip via Button or ESC key
  const handleSkip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleComplete();
  }, [handleComplete]);

  // Keyboard shortcut listener (ESC to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Accessibility: prefers-reduced-motion bypasses intro
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) handleSkip();
  }, [handleSkip]);

  // Touch gesture support: swipe up or tap anywhere to skip/advance on mobile
  useEffect(() => {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        startY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const dy = startY - e.changedTouches[0].clientY;
        if (dy > 50) {
          // Swift swipe up = skip intro
          handleSkip();
        }
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleSkip]);

  // Mobile-bulletproof video autoplay initialization
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Force muted and inline playback attributes for strict mobile browsers (iOS / Chrome Android)
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.playbackRate = 0.85;

      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              // On strict power-saving mobile modes, ensure muted flag and re-attempt
              video.muted = true;
              video.play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Fallback: user interaction will trigger play or skip
                });
            });
        }
      };

      attemptPlay();
    }

    // Maximum duration guard timeout (7.2 seconds total)
    timeoutRef.current = setTimeout(() => {
      handleComplete();
    }, 7200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleComplete]);

  // Hold on final emblem frame briefly before smooth exit
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      if (video.currentTime >= video.duration - 0.15 && !isHoldingRef.current) {
        isHoldingRef.current = true;
        video.pause();
        setTimeout(() => handleComplete(), 650);
      }
    }
  };

  // If mobile autoplay was blocked by low-power mode, tapping screen unpauses
  const handleContainerTap = () => {
    const video = videoRef.current;
    if (video && video.paused && !isHoldingRef.current) {
      video.play().catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {!isEnding && (
        <motion.div
          ref={containerRef}
          key="void-archive-cinematic-video-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleContainerTap}
          className="fixed inset-0 z-[100] w-full h-[100dvh] min-h-[100dvh] bg-[#000000] flex items-center justify-center overflow-hidden select-none font-mono overscroll-none touch-none"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            paddingLeft: 'env(safe-area-inset-left, 0px)',
            paddingRight: 'env(safe-area-inset-right, 0px)',
          }}
        >
          {/* ── Top Header Bar: Responsive Safe-Area Spacing ── */}
          <div className="absolute top-4 left-4 right-4 sm:top-8 sm:left-8 sm:right-8 z-50 flex items-center justify-between pointer-events-auto">
            {/* Brand Prologue Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.28em] text-[#cccccc] bg-[#0a0a0c]/85 border border-[#222226] uppercase shadow-[0_0_24px_rgba(0,0,0,0.95)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-bold text-white tracking-widest">VOID.ARCHIVE</span>
              <span className="text-[#444444] hidden xs:inline">|</span>
              <span className="text-[#888899] font-medium hidden xs:inline">PROLOGUE</span>
            </div>

            {/* Skip Intro Button: Touch-friendly on mobile, keyboard accessible on desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSkip();
              }}
              className="group flex items-center gap-2 px-4 py-2 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-[10px] tracking-widest text-[#a1a1aa] hover:text-[#ffffff] active:text-white bg-[#0c0c10]/90 hover:bg-[#181824] active:bg-[#202030] border border-[#2a2a34] hover:border-[#666677] transition-all uppercase backdrop-blur-md touch-manipulation cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)]"
              aria-label="Skip brand intro"
            >
              <span className="font-semibold">SKIP</span>
              <span className="hidden sm:inline text-[9px] text-[#666677] group-hover:text-[#aaaaaa]">[ESC]</span>
            </button>
          </div>

          {/* ── Atmospheric Ambient Backlight: Dynamically Scales with Device Size ── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[90vw] sm:w-[70vw] max-w-[850px] h-[90vw] sm:h-[70vw] max-h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(148,163,184,0.03)_40%,rgba(0,0,0,0)_75%)] blur-3xl" />
          </div>

          {/* ── Responsive Video Stage ── */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
            {/*
              Responsive Video Styling:
              - On Smartphones in Portrait (e.g. iPhone, Galaxy):
                Uses `object-contain` with `w-full max-h-[85dvh]` so the 4K animation
                is 100% visible, centered, and never cropped on narrow screens.
                Because the video background is #000000, it seamlessly merges with the
                pure black canvas into a true full-bleed visual experience.
              - On Landscape / Tablets / Desktops:
                Switches smoothly to `landscape:object-cover sm:object-cover`
                to fill the entire screen edge-to-edge.
            */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleComplete}
              className="w-full h-full max-w-full max-h-full object-contain landscape:object-cover sm:object-cover select-none pointer-events-none transition-all duration-300"
              style={{
                objectPosition: 'center center',
                mixBlendMode: 'screen',
                filter: 'contrast(1.12) brightness(1.02)',
                WebkitTransform: 'translateZ(0)',
              }}
            >
              <source src="/assets/intro-video-4k.mp4" type="video/mp4" />
              <source src="/assets/intro-video-clean.mp4" type="video/mp4" />
              <source src="/assets/intro-video.mp4" type="video/mp4" />
            </video>

            {/* Seamless Vignette: Blends all edges into void black on any display aspect ratio */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 100px 40px #000000',
              }}
            />
          </div>

          {/* ── Bottom Mobile Hint: Safe area aware ── */}
          <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 flex flex-col items-center justify-center z-40 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: [0, 0.7, 0], y: [5, 0, -4] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.2 }}
              className="text-[8.5px] sm:text-[9.5px] tracking-[0.3em] text-[#666677] uppercase font-mono sm:hidden"
            >
              SWIPE UP TO ENTER
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
