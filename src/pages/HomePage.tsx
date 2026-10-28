import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCollections } from '../components/home/FeaturedCollections';
import { BestSellers } from '../components/home/BestSellers';
import { EditorialSection } from '../components/home/EditorialSection';
import { TechSpecsSection } from '../components/home/TechSpecsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Hero Section with 3D Spatial Canvas */}
      <HeroSection />

      {/* 2. Featured Capsule Collections */}
      <FeaturedCollections />

      {/* 3. Best-Selling Products Showcase */}
      <BestSellers />

      {/* 4. Brand Editorial & High Fashion Manifesto */}
      <EditorialSection />

      {/* 5. Technical Architecture & Materials Matrix */}
      <TechSpecsSection />

      {/* 6. VIP Archival Protocol Newsletter Access */}
      <NewsletterSection />
    </div>
  );
};

