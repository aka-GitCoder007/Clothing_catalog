import React, { useState } from 'react';
import { ArrowRight, Check, Shield } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Button } from '../ui/Button';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useUIStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('PLEASE ENTER A VALID EMAIL CIPHER', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('ARCHIVAL MEMBERSHIP GRANTED: USE CODE "VIPFIRST" AT CHECKOUT', 'success');
  };

  return (
    <section className="py-24 sm:py-32 border-b border-[#1c1c1c] bg-[#080808] relative overflow-hidden font-mono">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-5 editorial-noise pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] font-bold block mb-3">
          PRIVATE ARCHIVE NETWORK
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F5F3EE] tracking-tight mb-4">
          ACQUIRE EARLY RELEASE KEYS
        </h2>
        <p className="text-xs sm:text-sm font-sans font-light text-[#888888] max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribers receive priority allocation access 24 hours prior to global public drop, 
          invitations to private showroom appointments in Tokyo & Paris, and immediate 15% off first acquisition.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-[#121212] border border-[#2a2a2a] max-w-md mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold uppercase mb-2">
              <Check className="w-5 h-5" />
              <span>CIPHER VERIFIED & GRANTED</span>
            </div>
            <p className="text-xs text-[#CCCCCC] mb-3">
              YOUR 15% OFF DISCOUNT CODE IS:
            </p>
            <div className="bg-[#1c1c1c] border border-[#333333] py-2 px-4 text-base font-bold text-[#F5F3EE] tracking-widest inline-block select-all">
              VIPFIRST
            </div>
            <p className="text-[10px] text-[#666666] mt-3">
              Code copied to clipboard. Apply in cart or checkout summary.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER PERSONAL EMAIL CIPHER"
              aria-label="Email address for private releases"
              className="bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-4 py-3 text-xs text-[#F5F3EE] placeholder-[#555555] uppercase focus:outline-none flex-1 font-mono"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              JOIN PROTOCOL
            </Button>
          </form>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-[#555555]">
          <Shield className="w-3.5 h-3.5" />
          <span>ZERO SPAM. ONLY AUTHENTIC DROP NOTIFICATIONS & PRIVATE KEYS.</span>
        </div>
      </div>
    </section>
  );
};

