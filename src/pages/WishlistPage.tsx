import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, clearWishlist } = useWishlistStore();
  const { showToast } = useUIStore();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // If empty, suggest some featured pieces
  const suggestedProducts = PRODUCTS.filter((p) => p.isFeatured || p.isNewArrival).slice(0, 4);

  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-[#F5F3EE] transition-colors">INDEX</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE]">CURATED WISHLIST</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1c1c1c] mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#F5F3EE]">
              ARCHIVAL WISHLIST
            </h1>
            <p className="text-xs text-[#888888] mt-1 font-sans">
              Personal dossier of saved specimens for future acquisition.
            </p>
          </div>
          {savedProducts.length > 0 && (
            <button
              onClick={() => {
                clearWishlist();
                showToast('WISHLIST CLEARED', 'info');
              }}
              className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-rose-400 uppercase transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR ALL ({savedProducts.length})</span>
            </button>
          )}
        </div>

        {/* Saved Items or Empty State */}
        {savedProducts.length === 0 ? (
          <div className="py-16 text-center border border-[#1e1e1e] bg-[#0c0c0c] p-8 max-w-xl mx-auto mb-20">
            <div className="w-16 h-16 border border-[#222222] bg-[#121212] flex items-center justify-center text-[#555555] mx-auto mb-4">
              <Heart className="w-7 h-7" />
            </div>
            <span className="text-[10px] text-[#9E1B22] uppercase tracking-widest font-bold block mb-1">
              ZERO SAVED SPECIMENS
            </span>
            <h2 className="text-xl font-bold uppercase text-[#F5F3EE] mb-2">
              YOUR WISHLIST IS VACANT
            </h2>
            <p className="text-xs text-[#888888] font-sans max-w-sm mx-auto mb-6">
              Bookmark technical garments while exploring the shop to monitor availability and assemble capsules.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                DISCOVER ARCHIVE
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Curated Recommendations */}
        {savedProducts.length === 0 && (
          <div className="mt-16 pt-12 border-t border-[#1c1c1c]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1c1c1c]">
              <div>
                <span className="text-[10px] tracking-widest text-[#9E1B22] font-bold block mb-1">
                  RECOMMENDED FOUNDATIONS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#F5F3EE]">
                  SUGGESTED FOR YOUR CAPSULE
                </h3>
              </div>
              <Link to="/shop" className="text-xs text-[#A0A0A0] hover:text-[#F5F3EE] underline underline-offset-4 uppercase">
                VIEW ENTIRE SHOP
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

