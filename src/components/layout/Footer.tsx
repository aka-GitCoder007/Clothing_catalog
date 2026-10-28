import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Send } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export const Footer: React.FC = () => {
  const { showToast, setSizeGuideOpen, replayIntro } = useUIStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentTime, setCurrentTime] = useState({
    tokyo: '',
    paris: '',
    nyc: '',
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setCurrentTime({
        tokyo: now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Tokyo',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        paris: now.toLocaleTimeString('en-US', {
          timeZone: 'Europe/Paris',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        nyc: now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('PLEASE ENTER A VALID EMAIL CIPHER', 'error');
      return;
    }
    setSubscribed(true);
    showToast('ARCHIVAL ACCESS GRANTED: USE CIPHER "VIPFIRST" FOR 15% OFF', 'success');
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] text-[#A0A0A0] pt-16 pb-12 font-mono">
      {/* Upper Features Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#181818]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 border border-[#161616] bg-[#0a0a0a]">
            <ShieldCheck className="w-5 h-5 text-[#F5F3EE] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold">
                LIFETIME ATELIER GUARANTEE
              </h4>
              <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">
                All garments are backed by comprehensive seam, hardware, and membrane restoration.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#161616] bg-[#0a0a0a]">
            <RefreshCw className="w-5 h-5 text-[#F5F3EE] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold">
                COMPLIMENTARY GLOBAL RETURNS
              </h4>
              <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">
                30-day effortless returns with prepaid international courier pickups.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#161616] bg-[#0a0a0a]">
            <Send className="w-5 h-5 text-[#F5F3EE] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold">
                ARCHIVAL DISPATCH SPEED
              </h4>
              <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">
                Orders packaged in archival anti-static boxes within 24 hours of confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Manifesto & Newsletter (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src="/assets/void-archive-logo.png"
                  alt="VOID.ARCHIVE Official Brand Mark"
                  className="w-12 h-12 object-contain mix-blend-screen brightness-110"
                />
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-[#F5F3EE] uppercase leading-tight font-sans">
                    VOID<span className="text-[#9E1B22] font-black">.</span>ARCHIVE
                  </div>
                  <span className="text-[8px] font-mono tracking-[0.38em] text-[#777777] block mt-0.5">
                    CLOTHING BEYOND TIME
                  </span>
                </div>
              </div>
              <p className="text-xs tracking-wider text-[#777777] mt-3 leading-relaxed max-w-md">
                An avant-garde technical research institute and luxury fashion atelier. 
                Deconstructing military utility, architectural brutalism, and technical fabrics into timeless silhouettes.
              </p>

              {/* Newsletter Form */}
              <div className="mt-8">
                <span className="text-[11px] uppercase tracking-widest text-[#F5F3EE] block mb-2 font-bold">
                  ARCHIVE PROTOCOL ACCESS
                </span>
                <p className="text-[11px] text-[#666666] mb-3">
                  Receive private release keys, lookbook drops, and 15% off first acquisition.
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 p-3 bg-[#111111] border border-[#2a2a2a] text-[#F5F3EE] text-xs">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>CIPHER ACTIVATED: CODE "VIPFIRST"</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER CIPHER / EMAIL"
                      aria-label="Email Address for Newsletter"
                      className="bg-[#121212] border border-[#282828] text-xs px-4 py-3 text-[#F5F3EE] placeholder-[#555555] focus:outline-none focus:border-[#F5F3EE] flex-1 font-mono uppercase"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to Protocol"
                      className="bg-[#F5F3EE] text-black px-5 py-3 hover:bg-white text-xs font-bold transition-colors shrink-0 flex items-center justify-center border border-[#F5F3EE]"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Atelier Clocks */}
            <div className="mt-10 pt-6 border-t border-[#181818] grid grid-cols-3 gap-4 text-[10px] text-[#666666]">
              <div>
                <span className="block text-[#888888] font-semibold">TOKYO</span>
                <span className="font-mono text-[#F5F3EE]">{currentTime.tokyo || '00:00:00'}</span>
              </div>
              <div>
                <span className="block text-[#888888] font-semibold">PARIS</span>
                <span className="font-mono text-[#F5F3EE]">{currentTime.paris || '00:00:00'}</span>
              </div>
              <div>
                <span className="block text-[#888888] font-semibold">NYC</span>
                <span className="font-mono text-[#F5F3EE]">{currentTime.nyc || '00:00:00'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-4">
                COLLECTIONS
              </h5>
              <ul className="space-y-2.5 text-xs text-[#888888]">
                <li>
                  <Link to="/shop?collection=SYSTEMIC+SILENCE+FW26" className="hover:text-[#F5F3EE] transition-colors">
                    SYSTEMIC SILENCE FW26
                  </Link>
                </li>
                <li>
                  <Link to="/shop?collection=GENESIS+ARCHIVE" className="hover:text-[#F5F3EE] transition-colors">
                    GENESIS ARCHIVE
                  </Link>
                </li>
                <li>
                  <Link to="/shop?collection=ESSENTIALS+PROTOCOL" className="hover:text-[#F5F3EE] transition-colors">
                    ESSENTIALS PROTOCOL
                  </Link>
                </li>
                <li>
                  <Link to="/shop?collection=STUDIO+EDITION" className="hover:text-[#F5F3EE] transition-colors">
                    STUDIO EDITION
                  </Link>
                </li>
                <li>
                  <Link to="/shop?filter=limited" className="hover:text-[#F5F3EE] transition-colors text-amber-500/80">
                    LIMITED EDITIONS [1/100]
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-4">
                CLIENT SERVICES
              </h5>
              <ul className="space-y-2.5 text-xs text-[#888888]">
                <li>
                  <Link to="/about" className="hover:text-[#F5F3EE] transition-colors">
                    ATELIER MANIFESTO
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="hover:text-[#F5F3EE] transition-colors text-left"
                  >
                    BIOMETRIC SIZING CHART
                  </button>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#F5F3EE] transition-colors">
                    COMPLIMENTARY SHIPPING
                  </Link>
                </li>
                <li>
                  <Link to="/about#sustainability" className="hover:text-[#F5F3EE] transition-colors">
                    MATERIALS & SCIENCE
                  </Link>
                </li>
                <li>
                  <a href="mailto:concierge@void-archive.design" className="hover:text-[#F5F3EE] transition-colors">
                    CONCIERGE DESK
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-4">
                CONNECT
              </h5>
              <ul className="space-y-2.5 text-xs text-[#888888]">
                <li>
                  <a href="#instagram" className="hover:text-[#F5F3EE] transition-colors">
                    INSTAGRAM @VOIDARCHIVE
                  </a>
                </li>
                <li>
                  <a href="#x" className="hover:text-[#F5F3EE] transition-colors">
                    X / DISPATCH
                  </a>
                </li>
                <li>
                  <a href="#discord" className="hover:text-[#F5F3EE] transition-colors">
                    DISCORD COMMUNITY
                  </a>
                </li>
                <li>
                  <a href="#spotify" className="hover:text-[#F5F3EE] transition-colors">
                    RUNWAY SOUNDTRACK
                  </a>
                </li>
                <li>
                  <Link to="/editorial" className="hover:text-[#F5F3EE] transition-colors">
                    DIGITAL LOOKBOOK
                  </Link>
                </li>
                <li>
                  <button
                    onClick={replayIntro}
                    className="hover:text-[#F5F3EE] transition-colors text-left uppercase text-[#9E1B22] font-bold"
                  >
                    ▶ REPLAY 3D INTRO
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Disclaimer */}
        <div className="mt-16 pt-8 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#555555]">
          <p>© {new Date().getFullYear()} VØID ARCHIVE S.A. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 uppercase">
            <span className="hover:text-[#888888] cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-[#888888] cursor-pointer">TERMS OF ARCHIVE</span>
            <span className="hover:text-[#888888] cursor-pointer">ACCESSIBILITY</span>
            <span className="hover:text-[#888888] cursor-pointer">COOKIES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

