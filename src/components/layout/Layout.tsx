import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { SearchOverlay } from '../search/SearchOverlay';
import { ProductQuickView } from '../product/ProductQuickView';
import { SizeGuideModal } from '../product/SizeGuideModal';
import { ToastContainer } from '../ui/Toast';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F3EE]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Luxury Header */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchOverlay />
      <ProductQuickView />
      <SizeGuideModal />
      <ToastContainer />
    </div>
  );
};

