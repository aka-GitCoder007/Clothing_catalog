import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Eye } from 'lucide-react';
import { Product, ProductSize, ProductColor } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUIStore } from '../../store/uiStore';
import { formatPrice } from '../../utils/formatters';
import { FALLBACK_IMAGE } from '../../utils/constants';
import { Badge } from '../ui/Badge';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isSizeSelectorOpen, setIsSizeSelectorOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { currency, setQuickViewProduct, showToast } = useUIStore();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    showToast(
      added ? `ADDED TO ARCHIVE WISHLIST` : `REMOVED FROM WISHLIST`,
      added ? 'success' : 'info'
    );
  };

  const handleQuickAdd = (e: React.MouseEvent, size: ProductSize) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, size, selectedColor, 1);
    showToast(`ADDED ${product.name} [SIZE ${size}] TO CART`, 'success');
    setIsSizeSelectorOpen(false);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#0d0d0d] border border-[#1c1c1c] hover:border-[#383838] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsSizeSelectorOpen(false);
      }}
    >
      {/* Top Media Container */}
      <div className="relative aspect-[3/4] w-full bg-[#141414] overflow-hidden">
        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
          {product.isLimitedEdition && (
            <Badge variant="accent">LIMITED [1/100]</Badge>
          )}
          {product.isNewArrival && !product.isLimitedEdition && (
            <Badge variant="default">NEW ARCHIVE</Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="subtle">BEST SELLER</Badge>
          )}
        </div>

        {/* Top Right Actions (Wishlist & Quick View) */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleWishlistToggle}
            className={`p-2 transition-all duration-200 border ${
              isFavorited
                ? 'bg-[#9E1B22] border-[#9E1B22] text-[#F5F3EE]'
                : 'bg-[#080808]/75 border-[#262626] text-[#A0A0A0] hover:text-[#F5F3EE] hover:bg-[#151515]'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleOpenQuickView}
            className="p-2 bg-[#080808]/75 border border-[#262626] text-[#A0A0A0] hover:text-[#F5F3EE] hover:bg-[#151515] transition-all duration-200 opacity-0 group-hover:opacity-100 hidden sm:flex"
            aria-label="Quick preview product"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Images with Hover Transition */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Quick Add Flyout Drawer on Hover */}
        <div className="absolute bottom-0 inset-x-0 z-20 transition-all duration-300">
          {!isSizeSelectorOpen ? (
            <button
              onClick={() => setIsSizeSelectorOpen(true)}
              className="w-full py-3 bg-[#0c0c0c]/90 hover:bg-[#F5F3EE] hover:text-[#080808] border-t border-[#222222] text-[#F5F3EE] text-[11px] font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>QUICK ADD</span>
            </button>
          ) : (
            <div className="bg-[#121212] border-t border-[#333333] p-3 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
                  SELECT SIZE:
                </span>
                <button
                  onClick={() => setIsSizeSelectorOpen(false)}
                  className="text-[10px] font-mono text-[#666666] hover:text-[#F5F3EE]"
                >
                  CANCEL
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((size) => {
                  const stockCount = product.stock[size] ?? 0;
                  const isOutOfStock = stockCount <= 0;
                  return (
                    <button
                      key={size}
                      disabled={isOutOfStock}
                      onClick={(e) => handleQuickAdd(e, size)}
                      className={`py-1.5 text-[10px] font-mono border transition-all ${
                        isOutOfStock
                          ? 'border-[#1e1e1e] text-[#444444] cursor-not-allowed line-through'
                          : 'border-[#2a2a2a] text-[#F5F3EE] hover:border-[#F5F3EE] hover:bg-[#F5F3EE] hover:text-[#080808]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#777777] mb-1.5">
            <span className="uppercase">{product.category}</span>
            {/* Swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                  className={`w-2.5 h-2.5 rounded-full border transition-all ${
                    selectedColor.name === color.name
                      ? 'border-[#F5F3EE] scale-125'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            className="block text-xs sm:text-sm font-semibold tracking-wider text-[#F5F3EE] group-hover:text-white transition-colors uppercase line-clamp-1"
          >
            {product.name}
          </Link>
          <p className="text-[11px] text-[#777777] font-mono truncate mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing Row */}
        <div className="flex items-baseline justify-between pt-2 border-t border-[#181818] font-mono">
          <div className="flex items-baseline gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#F5F3EE]">
              {formatPrice(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#666666] line-through">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
          </div>
          <span className="text-[9px] tracking-widest text-[#555555] uppercase">
            {product.collection.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

