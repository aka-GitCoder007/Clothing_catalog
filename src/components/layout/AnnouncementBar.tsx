import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Globe } from 'lucide-react';
import { ANNOUNCEMENTS } from '../../utils/constants';
import { useUIStore } from '../../store/uiStore';

export const AnnouncementBar: React.FC = () => {
  const { isAnnouncementVisible, setAnnouncementVisible, currency, setCurrency } = useUIStore();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isAnnouncementVisible) return null;

  return (
    <div className="relative z-50 bg-[#0e0e0e] border-b border-[#1e1e1e] text-[#A0A0A0] text-[11px] font-mono tracking-widest px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Region / Currency */}
        <div className="hidden md:flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-[#666666]" />
          <span className="text-[#666666]">ATELIER:</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR' | 'GBP' | 'JPY')}
            className="bg-transparent text-[#F5F3EE] hover:text-white cursor-pointer focus:outline-none uppercase border-none text-[11px] p-0"
            aria-label="Select Currency"
          >
            <option value="USD" className="bg-[#121212] text-white">NYC / USD ($)</option>
            <option value="EUR" className="bg-[#121212] text-white">PARIS / EUR (€)</option>
            <option value="GBP" className="bg-[#121212] text-white">LONDON / GBP (£)</option>
            <option value="JPY" className="bg-[#121212] text-white">TOKYO / JPY (¥)</option>
          </select>
        </div>

        {/* Live Announcement Ticker */}
        <div className="flex-1 text-center truncate px-2">
          <span className="inline-flex items-center gap-2 text-[#F5F3EE] hover:text-white transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E1B22] animate-pulse shrink-0 inline-block" />
            <span className="truncate">{ANNOUNCEMENTS[index]}</span>
            <ChevronRight className="w-3 h-3 text-[#666666] shrink-0 hidden sm:inline" />
          </span>
        </div>

        {/* Close Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="p-1 hover:text-[#F5F3EE] transition-colors"
            aria-label="Close Announcement Bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

