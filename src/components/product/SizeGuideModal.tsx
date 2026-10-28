import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useUIStore } from '../../store/uiStore';
import { Ruler, Info } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setSizeGuideOpen } = useUIStore();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  const topsMeasurements = [
    { size: 'XS', chestCm: '96 - 100', chestIn: '38 - 39.5', lengthCm: '69', lengthIn: '27.2', shoulderCm: '48', shoulderIn: '18.9' },
    { size: 'S', chestCm: '102 - 106', chestIn: '40 - 41.5', lengthCm: '71', lengthIn: '28.0', shoulderCm: '50', shoulderIn: '19.7' },
    { size: 'M', chestCm: '108 - 114', chestIn: '42.5 - 45', lengthCm: '73', lengthIn: '28.7', shoulderCm: '52', shoulderIn: '20.5' },
    { size: 'L', chestCm: '116 - 122', chestIn: '45.5 - 48', lengthCm: '75', lengthIn: '29.5', shoulderCm: '54', shoulderIn: '21.3' },
    { size: 'XL', chestCm: '124 - 130', chestIn: '49 - 51', lengthCm: '77', lengthIn: '30.3', shoulderCm: '56', shoulderIn: '22.0' },
    { size: 'XXL', chestCm: '132 - 138', chestIn: '52 - 54.5', lengthCm: '79', lengthIn: '31.1', shoulderCm: '58', shoulderIn: '22.8' },
  ];

  const bottomsMeasurements = [
    { size: 'S (30)', waistCm: '76 - 80', waistIn: '30 - 31.5', hipCm: '102', hipIn: '40.2', inseamCm: '81', inseamIn: '31.9' },
    { size: 'M (32)', waistCm: '82 - 86', waistIn: '32 - 33.8', hipCm: '108', hipIn: '42.5', inseamCm: '82', inseamIn: '32.3' },
    { size: 'L (34)', waistCm: '88 - 92', waistIn: '34.5 - 36.2', hipCm: '114', hipIn: '44.9', inseamCm: '83', inseamIn: '32.7' },
    { size: 'XL (36)', waistCm: '94 - 98', waistIn: '37 - 38.5', hipCm: '120', hipIn: '47.2', inseamCm: '84', inseamIn: '33.1' },
  ];

  return (
    <Modal
      isOpen={isSizeGuideOpen}
      onClose={() => setSizeGuideOpen(false)}
      title="ARCHITECTURAL SIZING MATRIX"
      subtitle="BIOMETRIC MEASUREMENT ARCHIVE // UNISEX SILHOUETTE"
      maxWidth="xl"
      zIndex="z-[60]"
    >
      <div className="font-mono text-xs text-[#A0A0A0]">
        {/* Unit Toggle & Model Note */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222222]">
          <div className="flex items-center gap-2">
            <span className="text-[#888888] uppercase tracking-wider">UNIT SYSTEM:</span>
            <div className="inline-flex border border-[#2a2a2a] p-0.5">
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-bold transition-colors ${
                  unit === 'cm' ? 'bg-[#F5F3EE] text-[#080808]' : 'text-[#888888] hover:text-[#F5F3EE]'
                }`}
              >
                CENTIMETERS (CM)
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 font-bold transition-colors ${
                  unit === 'in' ? 'bg-[#F5F3EE] text-[#080808]' : 'text-[#888888] hover:text-[#F5F3EE]'
                }`}
              >
                INCHES (IN)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#A0A0A0]">
            <Info className="w-3.5 h-3.5 text-[#F5F3EE] shrink-0" />
            <span>MODEL: 188CM / 6'2" WEARING SIZE L</span>
          </div>
        </div>

        {/* Section 1: Tops & Outerwear */}
        <div className="py-6">
          <h4 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-3">
            01 // TOPS, HOODIES & TECHNICAL OUTERWEAR
          </h4>
          <div className="overflow-x-auto border border-[#222222]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#181818] text-[#F5F3EE] border-b border-[#222222]">
                  <th className="p-3 font-semibold">SIZE</th>
                  <th className="p-3 font-semibold">CHEST ({unit.toUpperCase()})</th>
                  <th className="p-3 font-semibold">LENGTH ({unit.toUpperCase()})</th>
                  <th className="p-3 font-semibold">SHOULDER ({unit.toUpperCase()})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {topsMeasurements.map((m) => (
                  <tr key={m.size} className="hover:bg-[#161616] transition-colors">
                    <td className="p-3 font-bold text-[#F5F3EE]">{m.size}</td>
                    <td className="p-3">{unit === 'cm' ? m.chestCm : m.chestIn}</td>
                    <td className="p-3">{unit === 'cm' ? m.lengthCm : m.lengthIn}</td>
                    <td className="p-3">{unit === 'cm' ? m.shoulderCm : m.shoulderIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Trousers & Cargos */}
        <div className="py-6 border-t border-[#222222]">
          <h4 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-3">
            02 // ARTICULATED CARGOS & TROUSERS
          </h4>
          <div className="overflow-x-auto border border-[#222222]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#181818] text-[#F5F3EE] border-b border-[#222222]">
                  <th className="p-3 font-semibold">SIZE</th>
                  <th className="p-3 font-semibold">WAIST ({unit.toUpperCase()})</th>
                  <th className="p-3 font-semibold">HIP ({unit.toUpperCase()})</th>
                  <th className="p-3 font-semibold">INSEAM ({unit.toUpperCase()})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {bottomsMeasurements.map((m) => (
                  <tr key={m.size} className="hover:bg-[#161616] transition-colors">
                    <td className="p-3 font-bold text-[#F5F3EE]">{m.size}</td>
                    <td className="p-3">{unit === 'cm' ? m.waistCm : m.waistIn}</td>
                    <td className="p-3">{unit === 'cm' ? m.hipCm : m.hipIn}</td>
                    <td className="p-3">{unit === 'cm' ? m.inseamCm : m.inseamIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement Advice */}
        <div className="pt-6 border-t border-[#222222] bg-[#0c0c0c] p-4 border border-[#1e1e1e]">
          <div className="flex items-center gap-2 text-[#F5F3EE] font-bold mb-2">
            <Ruler className="w-4 h-4 text-[#9E1B22]" />
            <span className="uppercase tracking-wider text-xs">SILHOUETTE INTENT</span>
          </div>
          <p className="text-[11px] text-[#888888] leading-relaxed">
            All VØID ARCHIVE garments are patterned with intentional oversized architectural volume.
            If you prefer a closer, tailored proportion, we recommend sizing down one standard increment.
          </p>
        </div>
      </div>
    </Modal>
  );
};

