import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Ruler,
  Star,
  Check,
  ChevronRight,
  Box,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductSize, ProductColor } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useUIStore } from '../store/uiStore';
import { formatPrice } from '../utils/formatters';
import { FALLBACK_IMAGE } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Accordion } from '../components/ui/Accordion';
import { ProductCard } from '../components/product/ProductCard';
import { Product3DViewer } from '../components/product/Product3DViewer';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [viewMode3D, setViewMode3D] = useState(!!product.has3DModel);

  const { currency, setSizeGuideOpen, showToast, addRecentlyViewed, recentlyViewedIds } = useUIStore();
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setSelectedImage(0);
      setSelectedSize(null);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setSizeError(false);
      setViewMode3D(!!product.has3DModel);
      window.scrollTo(0, 0);
    }
  }, [product.id, addRecentlyViewed]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('PLEASE SELECT AN ARCHIVAL SIZE BEFORE RESERVING', 'error');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    showToast(`ADDED ${product.name} [SIZE ${selectedSize}] TO CART`, 'success');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      showToast('PLEASE SELECT A SIZE BEFORE CHECKOUT', 'error');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    const added = toggleWishlist(product.id);
    showToast(
      added ? 'ADDED TO ARCHIVE WISHLIST' : 'REMOVED FROM WISHLIST',
      added ? 'success' : 'info'
    );
  };

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  // Recently viewed products
  const recentProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && recentlyViewedIds.includes(p.id)
  ).slice(0, 4);

  const accordionItems = [
    {
      id: 'design',
      title: '01 // ARCHITECTURAL DESIGN & MATERIALS',
      content: (
        <div className="space-y-3 font-mono text-xs">
          <p className="text-[#A0A0A0] font-sans leading-relaxed">
            {product.description}
          </p>
          <div>
            <span className="text-[#F5F3EE] font-bold block mb-1">PRIMARY TEXTILE LAMINATE:</span>
            <ul className="list-disc list-inside space-y-1 text-[#888888]">
              {product.materials.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'specs',
      title: '02 // TECHNICAL SPECIFICATIONS & HARDWARE',
      content: (
        <ul className="space-y-2 font-mono text-xs text-[#888888]">
          {product.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#9E1B22] font-bold">▪</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: '03 // COMPLIMENTARY SHIPPING & ARCHIVAL CARE',
      content: (
        <div className="space-y-3 font-mono text-xs text-[#888888]">
          <p>
            Complimentary insured global express courier on all acquisitions above $350. Delivered in archival vacuum-sealed anti-static container.
          </p>
          <div>
            <span className="text-[#F5F3EE] font-bold block mb-1">CARE INSTRUCTIONS:</span>
            <ul className="list-disc list-inside space-y-1">
              {product.careInstructions.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-8 sm:py-14 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#777777] uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-[#F5F3EE] transition-colors">INDEX</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-[#F5F3EE] transition-colors">SHOP</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#F5F3EE] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE] truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Hero Grid (Left Gallery / 3D Canvas, Right Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Image Gallery or 3D Spatial Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* 3D Mode Toggle Bar if product has 3D model */}
            {product.has3DModel && (
              <div className="flex items-center justify-between bg-[#0e0e12] border border-[#222228] p-2.5 sm:p-3 font-mono text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#9E1B22] animate-pulse" />
                  <Box className="w-4 h-4 text-[#F5F3EE]" />
                  <span className="text-[#F5F3EE] font-bold tracking-wider uppercase text-[10px] sm:text-[11px]">
                    3D SPATIAL CHASSIS AVAILABLE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setViewMode3D(false)}
                    className={`px-2.5 sm:px-3 py-1.5 border text-[10px] tracking-widest uppercase transition-all ${
                      !viewMode3D
                        ? 'bg-[#F5F3EE] text-[#080808] border-[#F5F3EE] font-bold shadow-md'
                        : 'bg-[#141418] text-[#888899] border-[#26262e] hover:text-[#F5F3EE]'
                    }`}
                  >
                    2D GALLERY
                  </button>
                  <button
                    onClick={() => setViewMode3D(true)}
                    className={`px-2.5 sm:px-3 py-1.5 border text-[10px] tracking-widest uppercase transition-all flex items-center gap-1.5 ${
                      viewMode3D
                        ? 'bg-[#9E1B22] text-[#F5F3EE] border-[#9E1B22] font-bold shadow-[0_0_14px_rgba(158,27,34,0.4)]'
                        : 'bg-[#141418] text-[#888899] border-[#26262e] hover:text-[#F5F3EE] hover:border-[#444455]'
                    }`}
                  >
                    <Box className="w-3 h-3" />
                    <span>3D VIEW</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main Visual Display */}
            {viewMode3D ? (
              <Product3DViewer
                product={product}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            ) : (
              <div className="relative aspect-[3/4] w-full bg-[#121212] border border-[#222222] overflow-hidden group">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isLimitedEdition && (
                    <Badge variant="accent">LIMITED [1/100]</Badge>
                  )}
                  {product.isNewArrival && (
                    <Badge variant="default">AUTUMN / WINTER 2026</Badge>
                  )}
                </div>

                <img
                  src={product.images[selectedImage]}
                  alt={`${product.name} primary angle`}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}

            {/* Thumbnail Strip */}
            {!viewMode3D && product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-[3/4] border overflow-hidden transition-all ${
                      selectedImage === idx
                        ? 'border-[#F5F3EE] ring-1 ring-[#F5F3EE]'
                        : 'border-[#222222] opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Purchasing & Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col font-mono">
            {/* Header / SKU */}
            <div className="flex items-center justify-between text-[11px] text-[#777777] mb-2 tracking-widest">
              <span className="uppercase">{product.collection}</span>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F3EE] uppercase leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-[#888888] mt-1 mb-4">{product.subtitle}</p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-[#1c1c1c]">
              <span className="text-2xl sm:text-3xl font-bold text-[#F5F3EE]">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#666666] line-through">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
            </div>

            {/* Color Variant Selector */}
            <div className="py-6 border-b border-[#1c1c1c]">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[#888888] tracking-widest uppercase">COLOR COATING:</span>
                <span className="text-[#F5F3EE] font-bold">{selectedColor.name}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-2 border text-xs transition-all ${
                      selectedColor.name === c.name
                        ? 'border-[#F5F3EE] bg-[#1a1a1a] text-[#F5F3EE]'
                        : 'border-[#262626] text-[#777777] hover:border-[#444444]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/50"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="py-6 border-b border-[#1c1c1c]">
              <div className="flex items-center justify-between text-xs mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`tracking-widest uppercase ${
                      sizeError && !selectedSize ? 'text-rose-400 font-bold' : 'text-[#888888]'
                    }`}
                  >
                    SELECT SIZE {sizeError && !selectedSize && '— REQUIRED'}:
                  </span>
                  {selectedSize && (
                    <span className="text-[#F5F3EE] font-bold">[{selectedSize}]</span>
                  )}
                </div>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#A0A0A0] hover:text-[#F5F3EE] underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>BIOMETRIC CHART</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const stock = product.stock[size] ?? 0;
                  const isOutOfStock = stock <= 0;
                  const isLow = stock > 0 && stock <= 3;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      disabled={isOutOfStock}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`relative py-3 text-xs border text-center transition-all ${
                        isOutOfStock
                          ? 'border-[#1a1a1a] text-[#444444] cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-[#F5F3EE] bg-[#F5F3EE] text-[#080808] font-bold'
                          : 'border-[#262626] text-[#F5F3EE] hover:border-[#555555]'
                      }`}
                    >
                      <span>{size}</span>
                      {isLow && !isSelected && (
                        <span className="absolute -top-1.5 right-1 bg-amber-500/20 text-amber-400 border border-amber-800/40 text-[8px] px-1 font-bold">
                          {stock} LEFT
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="py-6 border-b border-[#1c1c1c] flex items-center justify-between">
              <span className="text-xs text-[#888888] tracking-widest uppercase">
                QUANTITY ALLOCATION:
              </span>
              <div className="flex items-center border border-[#2a2a2a] bg-[#121212]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-xs text-[#A0A0A0] hover:text-[#F5F3EE]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#F5F3EE]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-xs text-[#A0A0A0] hover:text-[#F5F3EE]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Actions: Add To Cart, Buy Now, Wishlist */}
            <div className="py-6 space-y-3">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={handleAddToCart}
                >
                  ADD TO ARCHIVE CART
                </Button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 border transition-colors ${
                    isFavorited
                      ? 'bg-[#9E1B22] border-[#9E1B22] text-[#F5F3EE]'
                      : 'bg-[#121212] border-[#2a2a2a] text-[#A0A0A0] hover:text-[#F5F3EE]'
                  }`}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <Button
                variant="outline"
                fullWidth
                size="md"
                onClick={handleBuyNow}
              >
                INSTANT VIP CHECKOUT
              </Button>
            </div>

            {/* Reassurance Features */}
            <div className="py-6 border-t border-[#1c1c1c] grid grid-cols-2 gap-4 text-[10px] text-[#777777]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F5F3EE]" />
                <span>COMPLIMENTARY AIR COURIER</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F5F3EE]" />
                <span>LIFETIME ATELIER GUARANTEE</span>
              </div>
            </div>

            {/* Product Accordion (Specs, Design, Shipping) */}
            <div className="pt-4">
              <Accordion items={accordionItems} defaultOpenId="design" />
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#1c1c1c] font-mono">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1c1c1c]">
              <div>
                <span className="text-[10px] tracking-widest text-[#9E1B22] font-bold block mb-1">
                  CLIENT DOSSIER
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#F5F3EE]">
                  VERIFIED PATRON REVIEWS ({product.reviewCount})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#F5F3EE]">{product.rating} / 5.0</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#F5F3EE]">{rev.author}</span>
                    <span className="text-[10px] text-[#666666]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#A0A0A0] font-sans leading-relaxed">
                    "{rev.comment}"
                  </p>
                  {rev.verified && (
                    <div className="mt-4 pt-3 border-t border-[#181818] flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>VERIFIED ARCHIVAL ACQUISITION</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products: Complete The Silhouette */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#1c1c1c]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1c1c1c] font-mono">
              <div>
                <span className="text-[10px] tracking-widest text-[#9E1B22] font-bold block mb-1">
                  CURATED ENSEMBLE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#F5F3EE]">
                  COMPLETE THE SILHOUETTE
                </h3>
              </div>
              <Link to="/shop" className="text-xs text-[#A0A0A0] hover:text-[#F5F3EE] uppercase underline underline-offset-2">
                VIEW CATALOGUE
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#1c1c1c]">
            <div className="mb-8 pb-4 border-b border-[#1c1c1c] font-mono">
              <span className="text-[10px] tracking-widest text-[#777777] uppercase block mb-1">
                SESSION MEMORY
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#F5F3EE]">
                RECENTLY VIEWED SPECIMENS
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

