import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useUIStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { ProductSize, ProductColor } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { FALLBACK_IMAGE } from '../../utils/constants';
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductQuickView: React.FC = () => {
  const navigate = useNavigate();
  const { quickViewProduct, setQuickViewProduct, currency, showToast, setSizeGuideOpen } = useUIStore();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [errorPrompt, setErrorPrompt] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(null);
      setSelectedColor(quickViewProduct.colors[0]);
      setActiveImageIndex(0);
      setQuantity(1);
      setErrorPrompt(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorPrompt(true);
      showToast('PLEASE SELECT A SIZE BEFORE ADDING', 'error');
      return;
    }
    if (!selectedColor) return;

    addItem(quickViewProduct, selectedSize, selectedColor, quantity);
    showToast(`ADDED ${quickViewProduct.name} [${selectedSize}] TO CART`, 'success');
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setErrorPrompt(true);
      showToast('PLEASE SELECT A SIZE BEFORE CHECKOUT', 'error');
      return;
    }
    if (!selectedColor) return;

    addItem(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(quickViewProduct.id);
    showToast(added ? 'ADDED TO ARCHIVE WISHLIST' : 'REMOVED FROM WISHLIST', added ? 'success' : 'info');
  };

  return (
    <Modal
      isOpen={!!quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
      maxWidth="2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Showcase */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[3/4] w-full bg-[#181818] overflow-hidden border border-[#222222]">
            <img
              src={quickViewProduct.images[activeImageIndex]}
              alt={quickViewProduct.name}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className="w-full h-full object-cover"
            />
            {/* Prev/Next arrows if multiple */}
            {quickViewProduct.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? quickViewProduct.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#080808]/70 hover:bg-[#151515] text-[#F5F3EE] border border-[#2e2e2e]"
                  aria-label="Previous view"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      (prev + 1) % quickViewProduct.images.length
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#080808]/70 hover:bg-[#151515] text-[#F5F3EE] border border-[#2e2e2e]"
                  aria-label="Next view"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail list */}
          <div className="flex gap-2">
            {quickViewProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-18 border overflow-hidden transition-all ${
                  activeImageIndex === idx ? 'border-[#F5F3EE]' : 'border-[#222222] opacity-50'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="flex flex-col justify-between font-mono">
          <div>
            <div className="flex items-center justify-between text-[10px] tracking-widest text-[#777777] mb-1">
              <span className="uppercase">{quickViewProduct.category}</span>
              <span>SKU: {quickViewProduct.sku}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold tracking-wider text-[#F5F3EE] uppercase">
              {quickViewProduct.name}
            </h2>
            <p className="text-xs text-[#888888] mt-0.5">{quickViewProduct.subtitle}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 my-4">
              <span className="text-xl font-bold text-[#F5F3EE]">
                {formatPrice(quickViewProduct.price, currency)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-[#666666] line-through">
                  {formatPrice(quickViewProduct.originalPrice, currency)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#A0A0A0] leading-relaxed mb-6 font-sans">
              {quickViewProduct.description}
            </p>

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#888888] tracking-widest uppercase">COLOR:</span>
                <span className="text-[#F5F3EE] font-bold">{selectedColor?.name}</span>
              </div>
              <div className="flex gap-2">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${
                      selectedColor?.name === c.name
                        ? 'border-[#F5F3EE] bg-[#1e1e1e] text-[#F5F3EE]'
                        : 'border-[#282828] text-[#888888] hover:border-[#444444]'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/40"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`tracking-widest uppercase ${errorPrompt && !selectedSize ? 'text-rose-400 font-bold' : 'text-[#888888]'}`}>
                  SIZE {errorPrompt && !selectedSize && '— REQUIRED'}:
                </span>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[11px] text-[#A0A0A0] hover:text-[#F5F3EE] underline underline-offset-2"
                >
                  SIZING GUIDE
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {quickViewProduct.sizes.map((s) => {
                  const stock = quickViewProduct.stock[s] ?? 0;
                  const isOut = stock <= 0;
                  return (
                    <button
                      key={s}
                      disabled={isOut}
                      onClick={() => {
                        setSelectedSize(s);
                        setErrorPrompt(false);
                      }}
                      className={`py-2 text-xs border text-center transition-all ${
                        isOut
                          ? 'border-[#1a1a1a] text-[#444444] cursor-not-allowed line-through'
                          : selectedSize === s
                          ? 'border-[#F5F3EE] bg-[#F5F3EE] text-[#080808] font-bold'
                          : 'border-[#282828] text-[#F5F3EE] hover:border-[#555555]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-[#888888] tracking-widest uppercase">QTY:</span>
              <div className="flex items-center border border-[#282828]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-xs text-[#A0A0A0] hover:text-[#F5F3EE]"
                >
                  -
                </button>
                <span className="px-3 text-xs text-[#F5F3EE] font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-xs text-[#A0A0A0] hover:text-[#F5F3EE]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#1e1e1e]">
            <div className="flex gap-2">
              <Button
                variant="primary"
                fullWidth
                onClick={handleAddToCart}
              >
                ADD TO CART
              </Button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3.5 border transition-colors ${
                  isFavorited
                    ? 'bg-[#9E1B22] border-[#9E1B22] text-[#F5F3EE]'
                    : 'bg-[#181818] border-[#2e2e2e] text-[#A0A0A0] hover:text-[#F5F3EE]'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={handleBuyNow}
            >
              INSTANT CHECKOUT
            </Button>

            {/* View Full Product Page */}
            <button
              onClick={() => {
                setQuickViewProduct(null);
                navigate(`/product/${quickViewProduct.id}`);
              }}
              className="text-center text-[11px] text-[#888888] hover:text-[#F5F3EE] tracking-widest uppercase mt-2 flex items-center justify-center gap-1.5 py-1"
            >
              <span>EXPLORE COMPLETE ARCHIVAL DOSSIER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

