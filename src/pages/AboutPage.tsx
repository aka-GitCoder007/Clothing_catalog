import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Anchor, Cpu, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FALLBACK_IMAGE } from '../utils/constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-[#F5F3EE] transition-colors">INDEX</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE]">ATELIER RESEARCH MANIFESTO</span>
        </div>

        {/* Hero Banner */}
        <div className="pb-12 border-b border-[#1c1c1c] mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] font-bold block mb-2">
            RESEARCH INSTITUTE & ATELIER
          </span>
          <h1 className="text-3xl sm:text-6xl font-extrabold uppercase text-[#F5F3EE] tracking-tight leading-[1.05]">
            WEARABLE ARCHITECTURE FOR THE POST-INDUSTRIAL ERA.
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] font-sans mt-4 max-w-2xl leading-relaxed">
            Founded in 2024 as a collaborative experimental design laboratory operating between Minato-ku, Tokyo 
            and Rue du Faubourg Saint-Honoré, Paris. VØID ARCHIVE strips away ephemeral trends to forge permanent structural garments.
          </p>
        </div>

        {/* Split Manifesto Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 pb-20 border-b border-[#181818]">
          <div className="lg:col-span-6 space-y-6 text-xs sm:text-sm font-sans font-light text-[#999999] leading-relaxed">
            <h2 className="font-mono text-xl sm:text-2xl font-bold uppercase text-[#F5F3EE] tracking-wider">
              01 // THE BRUTALIST HYPOTHESIS
            </h2>
            <p>
              Contemporary fashion has succumbed to disposability. VØID ARCHIVE exists in total opposition. 
              We approach each garment not as decorative clothing, but as an exoskeleton—a modular spatial shelter that interfaces between the human body and hostile urban environments.
            </p>
            <p>
              Every pattern line is derived from anatomical mobility studies. Every seam is reinforced with ultrasonic welded tape or military-grade high-tensile aramid threading.
            </p>
            <div className="p-4 bg-[#0d0d0d] border-l-2 border-[#9E1B22] text-xs font-mono text-[#CCCCCC]">
              "If a detail does not elevate mobility, thermal regulation, or structural integrity, it is excised."
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] bg-[#141414] border border-[#222222] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier Workshop Tokyo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#A0A0A0] bg-[#0c0c0c]/80 px-3 py-1 border border-[#222222]">
              ATELIER PROTOTYPING VAULT // TOKYO
            </div>
          </div>
        </div>

        {/* Pillars / Materials Grid */}
        <div id="sustainability" className="mb-24 pb-20 border-b border-[#181818]">
          <div className="mb-12">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#9E1B22] font-bold block mb-1">
              MATERIAL STANDARDS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#F5F3EE] tracking-tight">
              THE THREE FABRICATION PILLARS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <Cpu className="w-6 h-6 text-[#9E1B22] mb-4" />
              <h3 className="text-sm font-bold uppercase text-[#F5F3EE] mb-2">
                01. MONOLITHIC DURABILITY
              </h3>
              <p className="text-xs font-sans text-[#888888] leading-relaxed">
                Zero polyester blends where natural or circular fibers excel. Heavy 650 GSM French loopback organic terry, 500D ballistic Cordura, and Japanese virgin wools designed to patina for decades.
              </p>
            </div>

            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <Anchor className="w-6 h-6 text-[#F5F3EE] mb-4" />
              <h3 className="text-sm font-bold uppercase text-[#F5F3EE] mb-2">
                02. HARDWARE RESTRAINT
              </h3>
              <p className="text-xs font-sans text-[#888888] leading-relaxed">
                We partner directly with AustriAlpin® Austria for patented Cobra buckles, Fidlock® Germany for magnetic closures, and Swiss RiRi for Aquazip teeth. No generic plastics.
              </p>
            </div>

            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <ShieldCheck className="w-6 h-6 text-[#9E1B22] mb-4" />
              <h3 className="text-sm font-bold uppercase text-[#F5F3EE] mb-2">
                03. LIFETIME RESTORATION
              </h3>
              <p className="text-xs font-sans text-[#888888] leading-relaxed">
                Every VØID ARCHIVE piece is backed by our complimentary Atelier Restoration Initiative. Seams, zippers, and membrane re-taping are serviced for the life of the product.
              </p>
            </div>
          </div>
        </div>

        {/* Global Ateliers Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 pb-20 border-b border-[#181818]">
          <div className="p-8 bg-[#0c0c0c] border border-[#1e1e1e]">
            <span className="text-[10px] text-[#9E1B22] font-bold uppercase block mb-1">
              PRIMARY RESEARCH LAB
            </span>
            <h3 className="text-xl font-bold uppercase text-[#F5F3EE] mb-3">
              TOKYO ATELIER
            </h3>
            <p className="text-xs text-[#888888] mb-4">
              Minato-ku, Minami-Aoyama 5-7-22<br />
              Tokyo 107-0062, Japan<br />
              By Private Appointment Only
            </p>
            <span className="text-[10px] text-[#666666]">COORDINATES: 35.6628° N, 139.7154° E</span>
          </div>

          <div className="p-8 bg-[#0c0c0c] border border-[#1e1e1e]">
            <span className="text-[10px] text-[#9E1B22] font-bold uppercase block mb-1">
              COUTURE SHOWROOM
            </span>
            <h3 className="text-xl font-bold uppercase text-[#F5F3EE] mb-3">
              PARIS ATELIER
            </h3>
            <p className="text-xs text-[#888888] mb-4">
              Rue du Faubourg Saint-Honoré 18<br />
              75008 Paris, France<br />
              By Private Appointment Only
            </p>
            <span className="text-[10px] text-[#666666]">COORDINATES: 48.8698° N, 2.3195° E</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-lg mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#F5F3EE] mb-3">
            EXPERIENCE THE ARCHIVE
          </h3>
          <p className="text-xs text-[#888888] font-sans mb-6">
            Review available pieces from the Autumn / Winter 2026 technical collection.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              ACQUIRE FROM CATALOGUE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

