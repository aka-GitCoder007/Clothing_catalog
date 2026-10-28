import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FALLBACK_IMAGE } from '../utils/constants';

export const EditorialPage: React.FC = () => {
  const looks = [
    {
      lookNumber: 'LOOK 01',
      title: 'EXOSKELETON PARKA & BALLISTIC CARGO',
      caption: 'Layered GORE-TEX Pro shell with Fidlock magnetic cross-webbing over articulated 12-pocket ripstop pant.',
      location: 'TOKYO SHINJUKU TERMINAL 04:00 AM',
      image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: 'va-01-exoskeleton-parka',
    },
    {
      lookNumber: 'LOOK 02',
      title: 'KINETIC SUBVERSION TRENCH & STRATA BOOT',
      caption: 'Floor-sweeping bonded Italian tech-gabardine duster grounded by sculptural 65mm Vibram® Megagrip chassis.',
      location: 'PARIS PALAIS DE TOKYO 19:30 PM',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: 'va-07-matrix-trench',
    },
    {
      lookNumber: 'LOOK 03',
      title: 'MONOLITH BOMBER & PLEATED WIDE TROUSER',
      caption: 'High-density Teflon Japanese nylon MA-1 silhouette contrasted against flowing fluid Japanese virgin wool pleats.',
      location: 'BERLIN KRAFTWERK RUNWAY',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: 'va-02-monolith-bomber',
    },
    {
      lookNumber: 'LOOK 04',
      title: 'TACTICAL 650GSM HOODIE & TITANIUM SHIELD',
      caption: 'Brutalist double-layered zero-drawstring French terry hooded volume paired with beta-titanium monolithic wrap optics.',
      location: 'MILAN ATELIER VAULT',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      featuredProduct: 'va-03-cyber-hoodie',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-[#F5F3EE] transition-colors">INDEX</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE]">EDITORIAL RUNWAY DOSSIER</span>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-[#1c1c1c] mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] font-bold block mb-2">
            RUNWAY LOOKBOOK // CHAPTER VII
          </span>
          <h1 className="text-3xl sm:text-6xl font-extrabold uppercase text-[#F5F3EE] tracking-tight">
            SYSTEMIC SILENCE
          </h1>
          <p className="text-xs sm:text-sm text-[#888888] font-sans mt-3 max-w-xl leading-relaxed">
            Photographed across nocturnal Tokyo and brutalist concrete complexes in Paris.
            Documenting the interplay between human biomechanics and impenetrable technical armor.
          </p>
        </div>

        {/* Editorial Feed */}
        <div className="space-y-28">
          {looks.map((item, idx) => (
            <div key={item.lookNumber} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Giant Full-Width Editorial Image */}
              <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] bg-[#121212] border border-[#222222] overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#080808]/80 border border-[#333333] px-3 py-1 text-[10px] text-[#A0A0A0]">
                  {item.lookNumber} // DOSSIER ARCHIVE
                </div>
                <div className="absolute bottom-4 left-4 text-[10px] text-[#A0A0A0]">
                  COORDINATES: {item.location}
                </div>
              </div>

              {/* Look Info & Direct Shop CTA */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.25em] text-[#9E1B22] font-bold uppercase block mb-1">
                  RUNWAY SILHOUETTE
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-[#F5F3EE] tracking-tight mb-3">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm font-sans font-light text-[#888888] leading-relaxed mb-8">
                  {item.caption}
                </p>

                <div className="p-4 bg-[#0d0d0d] border border-[#1e1e1e] mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-[#666666] block mb-1">
                    PRIMARY SPECIMEN
                  </span>
                  <p className="text-xs font-bold text-[#F5F3EE] uppercase">
                    {item.title.split('&')[0].trim()}
                  </p>
                </div>

                <Link to={`/product/${item.featuredProduct}`}>
                  <Button
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    ACQUIRE SILHOUETTE
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

