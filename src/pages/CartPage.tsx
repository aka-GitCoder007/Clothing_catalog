import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Tag, ShieldCheck, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { CartItemRow } from '../components/cart/CartItemRow';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../utils/formatters';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { currency, showToast } = useUIStore();
  const {
    items,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    promoError,
    getSubtotal,
    getDiscountAmount,
    getEffectiveShipping,
    getTaxAmount,
    getTotal,
    clearCart,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getEffectiveShipping();
  const tax = getTaxAmount();
  const total = getTotal();

  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const ok = applyPromoCode(promoInput);
    if (ok) {
      showToast(`PROMO CIPHER ACTIVATED`, 'success');
      setPromoInput('');
    } else {
      showToast('INVALID PROMO CIPHER', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 sm:py-36 bg-[#080808] min-h-[75vh] flex items-center justify-center font-mono">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 border border-[#222222] bg-[#121212] flex items-center justify-center text-[#555555] mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <span className="text-[10px] tracking-[0.25em] text-[#9E1B22] font-bold uppercase block mb-2">
            ARCHIVE IS VACANT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F3EE] uppercase tracking-tight mb-3">
            YOUR CART IS EMPTY
          </h1>
          <p className="text-xs text-[#888888] font-sans leading-relaxed mb-8">
            You currently have zero garments reserved in your session manifest. Explore the autumn/winter catalogue.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              EXPLORE CATALOGUE
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-[#F5F3EE] transition-colors">INDEX</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE]">SESSION CART</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1c1c1c] mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#F5F3EE]">
              ARCHIVE CART MANIFEST
            </h1>
            <p className="text-xs text-[#888888] mt-1 font-sans">
              All selected pieces are temporarily reserved for your session.
            </p>
          </div>
          <button
            onClick={() => {
              clearCart();
              showToast('CART MANIFEST EMPTIED', 'info');
            }}
            className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-rose-400 transition-colors uppercase self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>EMPTY BAG</span>
          </button>
        </div>

        {/* Free Shipping Progress Box */}
        <div className="mb-10 p-5 bg-[#0e0e0e] border border-[#222222]">
          <div className="flex justify-between text-xs text-[#A0A0A0] mb-2">
            <span>
              {amountNeeded === 0
                ? 'FREE WORLDWIDE INSURED COURIER UNLOCKED'
                : `ADD ${formatPrice(amountNeeded, currency)} MORE FOR COMPLIMENTARY EXPRESS DELIVERY`}
            </span>
            <span className="text-[#F5F3EE] font-bold">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#1c1c1c] overflow-hidden">
            <div
              className="h-full bg-[#F5F3EE] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Items List (8 cols) */}
          <div className="lg:col-span-8">
            <div className="border-t border-[#1c1c1c]">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center text-xs text-[#888888] pt-4 border-t border-[#1a1a1a]">
              <Link to="/shop" className="hover:text-[#F5F3EE] underline underline-offset-4 uppercase">
                ← CONTINUE BROWSING CATALOGUE
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout (4 cols) */}
          <div className="lg:col-span-4 bg-[#0d0d0d] border border-[#222222] p-6 lg:sticky lg:top-28">
            <h3 className="text-sm font-bold tracking-wider uppercase text-[#F5F3EE] pb-4 border-b border-[#222222] mb-6">
              ORDER SUMMARY
            </h3>

            {/* Promo Code Input */}
            <div className="mb-6">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-[#141414] border border-[#2a2a2a] text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#9E1B22]" />
                    <span className="text-[#F5F3EE] font-bold">{appliedPromo.code}</span>
                    <span className="text-emerald-400">(-{appliedPromo.discountPercentage}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-[10px] text-[#888888] hover:text-rose-400 uppercase"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="CIPHER (VOID10)"
                    aria-label="Promotional Code"
                    className="bg-[#121212] border border-[#262626] text-xs px-3 py-2.5 text-[#F5F3EE] placeholder-[#555555] uppercase focus:outline-none focus:border-[#F5F3EE] flex-1 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-[#222222] text-[#F5F3EE] px-4 py-2.5 hover:bg-[#333333] text-xs font-bold border border-[#262626] uppercase transition-colors"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[10px] text-rose-400 mt-1 uppercase">{promoError}</p>
              )}
            </div>

            {/* Financial Rows */}
            <div className="space-y-3 text-xs text-[#888888] pb-6 border-b border-[#1c1c1c]">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-[#F5F3EE] font-bold">{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>DISCOUNT ({appliedPromo?.code})</span>
                  <span>-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ESTIMATED SHIPPING</span>
                <span className="text-[#F5F3EE] font-medium">
                  {shipping === 0 ? 'COMPLIMENTARY' : formatPrice(shipping, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ESTIMATED IMPORT DUTY (8%)</span>
                <span className="text-[#F5F3EE] font-medium">{formatPrice(tax, currency)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline py-4 border-b border-[#1c1c1c] mb-6">
              <span className="text-sm font-bold text-[#F5F3EE] uppercase">ESTIMATED TOTAL</span>
              <span className="text-xl font-bold text-[#F5F3EE]">{formatPrice(total, currency)}</span>
            </div>

            {/* Checkout CTA */}
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => navigate('/checkout')}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              PROCEED TO CHECKOUT
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#666666]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CARBON NEUTRAL DISPATCH // 30-DAY ATELIER RETURNS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

