import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { formatPrice } from '../../utils/formatters';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { setCartOpen, setSearchOpen, isMobileMenuOpen, setMobileMenuOpen, currency } = useUIStore();
  const itemCount = useCartStore((state) => state.getItemCount());
  const subtotal = useCartStore((state) => state.getSubtotal());
  const wishlistCount = useWishlistStore((state) => state.getWishlistCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const navLinks = [
    { label: 'SHOP', path: '/shop' },
    { label: 'NEW ARRIVALS', path: '/shop?filter=new' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'EDITORIAL', path: '/editorial' },
    { label: 'ATELIER', path: '/about' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#1e1e1e] py-3.5'
            : 'bg-[#080808]/60 backdrop-blur-sm border-b border-[#181818] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Trigger & Main Desktop Nav */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 text-[#F5F3EE] hover:text-[#A0A0A0] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path.split('?')[0];
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                        isActive
                          ? 'text-[#F5F3EE] font-semibold'
                          : 'text-[#A0A0A0] hover:text-[#F5F3EE]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#F5F3EE]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 text-center lg:flex-initial">
              <Link
                to="/"
                className="inline-block group focus:outline-none"
                aria-label="VOID.ARCHIVE Home"
              >
                <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/void-archive-logo.png"
                      alt="VOID.ARCHIVE Logo Emblem"
                      className="w-full h-full object-contain mix-blend-screen filter brightness-110 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-extrabold text-base sm:text-xl tracking-[0.22em] text-[#F5F3EE] group-hover:text-white transition-colors uppercase leading-none">
                      VOID<span className="text-[#9E1B22] font-black">.</span>ARCHIVE
                    </span>
                    <span className="text-[7px] sm:text-[7.5px] font-mono tracking-[0.38em] text-[#777777] hidden sm:block mt-1">
                      CLOTHING BEYOND TIME
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#A0A0A0] hover:text-[#F5F3EE] transition-colors hover:bg-[#181818] rounded-none border border-transparent hover:border-[#2a2a2a]"
                aria-label="Open search drawer"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Wishlist Trigger */}
              <Link
                to="/wishlist"
                className="relative p-2 text-[#A0A0A0] hover:text-[#F5F3EE] transition-colors hover:bg-[#181818] rounded-none border border-transparent hover:border-[#2a2a2a]"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-3.5 h-3.5 text-[9px] font-mono font-bold bg-[#9E1B22] text-[#F5F3EE] rounded-none leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 py-2 px-2.5 sm:px-3 text-[#F5F3EE] bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#3e3e3e] transition-all group"
                aria-label={`Shopping Cart (${itemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform" />
                <span className="font-mono text-xs font-semibold">{itemCount}</span>
                {itemCount > 0 && (
                  <span className="hidden md:inline font-mono text-[11px] text-[#A0A0A0] pl-1 border-l border-[#2e2e2e]">
                    {formatPrice(subtotal, currency)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#080808]/85 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#0e0e0e] border-r border-[#222222] p-6 flex flex-col justify-between shadow-2xl z-10 animate-fade-in">
            <div>
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between pb-6 border-b border-[#222222]">
                <span className="font-extrabold text-base tracking-[0.25em] text-[#F5F3EE]">
                  VØID ARCHIVE
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#A0A0A0] hover:text-[#F5F3EE]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col py-8 gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="flex items-center justify-between text-base font-mono tracking-widest text-[#F5F3EE] hover:text-white py-2 border-b border-[#181818]"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#666666]" />
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between text-base font-mono tracking-widest text-[#A0A0A0] hover:text-white py-2"
                >
                  <span>WISHLIST ({wishlistCount})</span>
                  <Heart className="w-4 h-4 text-[#666666]" />
                </Link>
              </div>
            </div>

            {/* Bottom Atelier Info */}
            <div className="pt-6 border-t border-[#222222]">
              <p className="text-[10px] font-mono tracking-widest text-[#666666] uppercase mb-2">
                ATELIER HQ
              </p>
              <p className="text-xs font-mono text-[#A0A0A0]">
                Minato-ku, Tokyo 107-0062 / Rue du Faubourg Saint-Honoré, Paris
              </p>
              <div className="mt-4 flex gap-4 text-xs font-mono text-[#666666]">
                <a href="#instagram" className="hover:text-white">IG</a>
                <a href="#twitter" className="hover:text-white">X</a>
                <a href="#discord" className="hover:text-white">DISCORD</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

