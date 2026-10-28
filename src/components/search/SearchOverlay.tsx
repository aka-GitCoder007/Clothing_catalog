import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { FALLBACK_IMAGE } from '../../utils/constants';

export const SearchOverlay: React.FC = () => {
  const navigate = useNavigate();
  const { isSearchOpen, setSearchOpen, currency } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickTags = ['GORE-TEX', 'CARGO', 'HOODIE', '650GSM', 'VIBRAM', 'BOMBER', 'VEST'];

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const matched = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q)) ||
        p.collection.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
  };

  const handleSelectProduct = (productId: string) => {
    setSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col font-mono">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 bg-[#080808]/95 backdrop-blur-xl"
          />

          {/* Search Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 flex flex-col max-h-screen"
          >
            {/* Header / Input */}
            <div className="relative border-b-2 border-[#F5F3EE] pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Search className="w-6 h-6 text-[#A0A0A0] shrink-0" />
                <form onSubmit={handleSubmit} className="flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="SEARCH ARCHIVE BY NAME, MEMBRANE, OR CATEGORY..."
                    aria-label="Search archive"
                    className="w-full bg-transparent text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#F5F3EE] placeholder-[#444444] focus:outline-none"
                  />
                </form>
              </div>

              <div className="flex items-center gap-3">
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs text-[#888888] hover:text-[#F5F3EE] p-1 uppercase"
                  >
                    CLEAR
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-[#A0A0A0] hover:text-[#F5F3EE] border border-[#2a2a2a] hover:border-[#F5F3EE] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-4 pb-6">
              <span className="text-[10px] text-[#666666] uppercase tracking-widest">
                TRENDING CIPHERS:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSelectTag(tag)}
                  className="px-2.5 py-1 text-[10px] text-[#A0A0A0] hover:text-[#F5F3EE] border border-[#222222] hover:border-[#444444] transition-colors uppercase"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Live Search Results */}
            <div className="flex-1 overflow-y-auto mt-4 pr-2">
              {query.trim() && (
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1c1c1c]">
                  <span className="text-xs text-[#888888] uppercase tracking-wider">
                    FOUND {results.length} SPECIMEN{results.length === 1 ? '' : 'S'}
                  </span>
                  {results.length > 0 && (
                    <button
                      onClick={() => handleSubmit()}
                      className="inline-flex items-center gap-1.5 text-xs text-[#F5F3EE] hover:underline uppercase"
                    >
                      <span>VIEW ALL IN SHOP</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-sm text-[#888888] uppercase mb-2">
                    NO CORRESPONDING ARCHIVES FOUND FOR "{query}"
                  </p>
                  <p className="text-xs text-[#555555]">
                    Verify the spelling or search using broader technical parameters.
                  </p>
                </div>
              )}

              {results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex gap-4 p-3 bg-[#111111] hover:bg-[#181818] border border-[#222222] hover:border-[#444444] cursor-pointer transition-all group"
                    >
                      <div className="w-16 h-20 bg-[#161616] overflow-hidden shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <span className="text-[9px] text-[#777777] uppercase tracking-widest block">
                            {product.category}
                          </span>
                          <h4 className="text-xs font-bold text-[#F5F3EE] truncate uppercase mt-0.5">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-[#888888] truncate mt-0.5">
                            {product.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold text-[#F5F3EE]">
                          <span>{formatPrice(product.price, currency)}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-[#F5F3EE] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

