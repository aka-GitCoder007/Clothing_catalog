import React from 'react';
import { ShieldCheck, Cpu, Anchor, Zap, Compass, Sparkles } from 'lucide-react';

export const TechSpecsSection: React.FC = () => {
  const specs = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#F5F3EE]" />,
      code: 'SPEC-01',
      title: 'GORE-TEX® PRO 3L LAMINATE',
      desc: '28,000mm hydrostatic head waterproof barrier with RET <6 extreme vapor breathability.',
      metric: '28,000 MM',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#9E1B22]" />,
      code: 'SPEC-02',
      title: 'FIDLOCK® MAGNETIC V-BUCKLES',
      desc: 'Instant intuitive magnetic closure with mechanical sliding lock rated to 70kg tensile load.',
      metric: '70 KG RATED',
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#F5F3EE]" />,
      code: 'SPEC-03',
      title: 'SWISS RIRI AQUAZIP®',
      desc: 'Polyurethane bonded teeth preventing fluid ingress in extreme precipitation.',
      metric: '100% SEALED',
    },
    {
      icon: <Anchor className="w-5 h-5 text-[#F5F3EE]" />,
      code: 'SPEC-04',
      title: '650 GSM FRENCH TERRY',
      desc: 'Custom heavy-gauge knit from long-staple organic cotton. Zero shrinkage, zero sagging.',
      metric: '650 GSM',
    },
    {
      icon: <Compass className="w-5 h-5 text-[#9E1B22]" />,
      code: 'SPEC-05',
      title: 'JAPANESE BETA-TITANIUM',
      desc: 'Ultra-resilient space-grade alloy offering extreme flex memory and 18-gram chassis weight.',
      metric: '18 GRAMS',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#F5F3EE]" />,
      code: 'SPEC-06',
      title: 'VIBRAM® MEGAGRIP COMPOUND',
      desc: 'Sculptural platform lug pattern providing dry and wet surface traction on urban pavement.',
      metric: '65MM SOLE',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-[#1c1c1c] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#1c1c1c] font-mono">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] block mb-2 font-bold">
              04 // ENGINEERING ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase text-[#F5F3EE]">
              MATERIAL MATRIX & HARDWARE
            </h2>
          </div>
          <p className="text-xs text-[#888888] max-w-sm">
            Every garment component is sourced from certified technical pioneers across Switzerland, Germany, and Japan.
          </p>
        </div>

        {/* 6 Spec Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
          {specs.map((item) => (
            <div
              key={item.code}
              className="p-6 bg-[#0a0a0a] border border-[#1e1e1e] hover:border-[#383838] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#141414] border border-[#2a2a2a] group-hover:border-[#444444] transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-[#666666] tracking-widest">{item.code}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#F5F3EE] uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#888888] font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#181818] flex items-center justify-between text-[10px]">
                <span className="text-[#555555]">METRIC SPEC:</span>
                <span className="text-[#F5F3EE] font-bold">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

