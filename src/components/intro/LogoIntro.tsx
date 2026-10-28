import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LogoIntroProps {
  onComplete: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isEnding, setIsEnding] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef<boolean>(false);

  // Smooth exit transition into homepage
  const handleComplete = useCallback(() => {
    if (isEnding) return;
    setIsEnding(true);
    setTimeout(() => {
      onComplete();
    }, 850);
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
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Accessibility: prefers-reduced-motion bypasses intro
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      handleSkip();
    }
  }, [handleSkip]);

  // Auto-play video on mount with cinematic slow pacing (+2 seconds total duration ~7.1s)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Slow cinematic playback rate (0.78x) gives an extra ~1.4s of fluid motion
      video.playbackRate = 0.78;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(true);
          });
      }
    }

    // Safety timeout increased by exactly 2.1s (from 5.1s to 7.2s)
    timeoutRef.current = setTimeout(() => {
      handleComplete();
    }, 7200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleComplete]);

  // Track playback to hold on the final brand lockup before fading out
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      // When reaching the end, hold on the completed emblem for 0.7s before smoothly fading out
      if (video.currentTime >= video.duration - 0.12 && !isHoldingRef.current) {
        isHoldingRef.current = true;
        video.pause();
        setTimeout(() => {
          handleComplete();
        }, 700);
      }
    }
  };

  return (
    <AnimatePresence>
      {!isEnding && (
        <motion.div
          key="void-archive-cinematic-video-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#000000] flex flex-col items-center justify-center overflow-hidden select-none font-mono"
        >
          {/* Top Editorial Status & Skip Bar */}
          <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-40 flex items-center justify-between pointer-events-auto">
            {/* Brand Prologue Indicator */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 text-[9px] tracking-[0.28em] text-[#cccccc] bg-[#0a0a0c]/80 border border-[#222226] uppercase hidden sm:flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,0,0,0.9)] backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="font-bold text-white tracking-widest">VOID.ARCHIVE</span>
                <span className="text-[#555555]">|</span>
                <span className="text-[#a1a1aa] font-semibold">CINEMATIC PROLOGUE</span>
              </div>
            </div>

            {/* Skip Intro Button */}
            <button
              onClick={handleSkip}
              className="group flex items-center gap-2 px-3.5 py-1.5 text-[10px] tracking-widest text-[#a1a1aa] hover:text-[#ffffff] bg-[#0c0c10]/90 hover:bg-[#181822] border border-[#2a2a34] hover:border-[#555566] transition-all uppercase backdrop-blur-md"
              aria-label="Skip brand intro"
            >
              <span>SKIP INTRO</span>
              <span className="text-[9px] text-[#666677] group-hover:text-[#aaaaaa]">[ESC]</span>
            </button>
          </div>

          {/* Atmospheric Soft Studio Ambient Backlight behind the logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[88vw] max-w-[850px] h-[88vw] max-h-[850px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(148,163,184,0.03)_38%,rgba(0,0,0,0)_72%)] blur-3xl" />
          </div>

          {/* Fullscreen Cinematic Video — fills entire viewport, no letterbox */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* The Cinematic Intro Video Element — true fullscreen cover */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleComplete}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{
                mixBlendMode: 'screen',
                filter: 'contrast(1.14) brightness(1.02)',
              }}
            >
              <source src="/assets/intro-video-4k.mp4" type="video/mp4" />
              <source src="/assets/intro-video-clean.mp4" type="video/mp4" />
              <source src="/assets/intro-video.mp4" type="video/mp4" />
            </video>

            {/* Soft cinematic vignette — blends all 4 edges into black for seamless feel */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                boxShadow: 'inset 0 0 140px 60px #000000',
                pointerEvents: 'none',
              }}
            />

            {/* Watermark Shield — bottom-right, scaled for fullscreen position */}
            <div
              aria-hidden="true"
              className="absolute bottom-[5%] right-[4%] w-32 h-32 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,0,0,1) 35%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0) 80%)',
                pointerEvents: 'none',
              }}
            />
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
};
