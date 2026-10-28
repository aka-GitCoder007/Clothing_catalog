import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-36 bg-[#080808] min-h-[75vh] flex items-center justify-center font-mono">
      <div className="max-w-md mx-auto text-center px-4">
        <span className="text-6xl sm:text-8xl font-black text-[#222222] block mb-4 select-none">
          404
        </span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] font-bold block mb-2">
          ERROR // COORDINATES UNREACHABLE
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#F5F3EE] mb-3">
          SPECIMEN NOT FOUND
        </h1>
        <p className="text-xs text-[#888888] font-sans leading-relaxed mb-8">
          The requested archival dossier does not exist in the VØID ARCHIVE registry or has been expunged from the permanent collection.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
              RETURN TO INDEX
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" size="md" icon={<Compass className="w-4 h-4" />}>
              BROWSE CATALOGUE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

