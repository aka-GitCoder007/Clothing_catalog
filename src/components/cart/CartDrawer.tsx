import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { CartItemRow } from './CartItemRow';
import { Button } from '../ui/Button';
import { formatPrice } from '../../utils/formatters';
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { isCartOpen, setCartOpen, currency, showToast } = useUIStore();
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
    getItemCount,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getEffectiveShipping();
  const tax = getTaxAmount();
  const total = getTotal();
  const itemCount = getItemCount();

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const ok = applyPromoCode(promoInput);
    if (ok) {
      showToast(`PROMO CIPHER APPLIED: ${appliedPromo?.code ?? promoInput}`, 'success');
      setPromoInput('');
    } else {
      showToast('INVALID PROMOTIONAL CIPHER', 'error');
    }
  };

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#080808]/85 backdrop-blur-md"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0e0e0e] border-l border-[#222222] shadow-2xl flex flex-col justify-between z-10 font-mono"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#222222] bg-[#0c0c0c]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#F5F3EE]" />
                  <span className="text-sm font-bold tracking-wider uppercase text-[#F5F3EE]">
                    ARCHIVE CART ({itemCount})
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 text-[#A0A0A0] hover:text-[#F5F3EE] transition-colors"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="mt-4 pt-3 border-t border-[#1a1a1a]">
                <div className="flex justify-between text-[11px] text-[#888888] mb-1.5">
                  <span>
                    {amountNeededForFreeShipping === 0
                      ? 'FREE WORLDWIDE COURIER UNLOCKED'
                      : `ADD ${formatPrice(amountNeededForFreeShipping, currency)} FOR FREE SHIPPING`}
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-1 bg-[#1c1c1c] overflow-hidden">
                  <div
                    className="h-full bg-[#F5F3EE] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Items List / Empty State */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 border border-[#222222] bg-[#121212] flex items-center justify-center text-[#555555] mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold uppercase text-[#F5F3EE] mb-1">
                    YOUR CART IS EMPTY
                  </h4>
                  <p className="text-xs text-[#777777] mb-6 max-w-xs">
                    No archival pieces currently reserved. Explore the latest capsule releases.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setCartOpen(false);
                      navigate('/shop');
                    }}
                  >
                    EXPLORE COLLECTION
                  </Button>
                </div>
              ) : (
                <div className="space-y-1">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#222222] bg-[#0c0c0c]">
                {/* Promo Code Input */}
                <div className="mb-4">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-[#141414] border border-[#282828] text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#9E1B22]" />
                        <span className="text-[#F5F3EE] font-bold">{appliedPromo.code}</span>
                        <span className="text-[10px] text-emerald-400">
                          (-{appliedPromo.discountPercentage}%)
                        </span>
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
                        placeholder="PROMO CIPHER (VOID10)"
                        aria-label="Enter promotional cipher"
                        className="bg-[#121212] border border-[#262626] text-xs px-3 py-2 text-[#F5F3EE] placeholder-[#555555] focus:outline-none focus:border-[#F5F3EE] flex-1 font-mono uppercase"
                      />
                      <button
                        type="submit"
                        className="bg-[#222222] text-[#F5F3EE] px-4 py-2 hover:bg-[#333333] text-xs font-bold border border-[#262626] uppercase transition-colors"
                      >
                        APPLY
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[10px] text-rose-400 mt-1 uppercase">{promoError}</p>
                  )}
                </div>

                {/* Calculation Rows */}
                <div className="space-y-1.5 text-xs text-[#888888] pb-4 border-b border-[#1c1c1c]">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="text-[#F5F3EE] font-medium">{formatPrice(subtotal, currency)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>PROMO DISCOUNT</span>
                      <span>-{formatPrice(discount, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>COURIER SHIPPING</span>
                    <span className="text-[#F5F3EE] font-medium">
                      {shipping === 0 ? 'COMPLIMENTARY' : formatPrice(shipping, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESTIMATED IMPORT DUTY</span>
                    <span className="text-[#F5F3EE] font-medium">{formatPrice(tax, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#F5F3EE] pt-2 border-t border-[#1a1a1a]">
                    <span>ESTIMATED TOTAL</span>
                    <span className="text-base">{formatPrice(total, currency)}</span>
                  </div>
                </div>

                {/* Checkout & Bag Buttons */}
                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant="primary"
                    fullWidth
                    size="md"
                    onClick={handleCheckout}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    size="sm"
                    onClick={handleViewCart}
                  >
                    VIEW DEDICATED CART PAGE
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

