import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, PromoCode } from '../types/cart';
import { Product, ProductColor, ProductSize } from '../types/product';
import { FREE_SHIPPING_THRESHOLD, PROMO_CODES } from '../utils/constants';

interface CartState {
  items: CartItem[];
  appliedPromo: PromoCode | null;
  shippingCost: number;
  promoError: string | null;

  // Actions
  addItem: (product: Product, size: ProductSize, color: ProductColor, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setShippingCost: (cost: number) => void;

  // Getters
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getEffectiveShipping: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedPromo: null,
      shippingCost: 0,
      promoError: null,

      addItem: (product, size, color, quantity = 1) => {
        const itemId = `${product.id}-${size}-${color.name.toLowerCase().replace(/\s+/g, '-')}`;
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);
          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentItem = updated[existingIndex];
            const maxStock = product.stock[size] ?? 10;
            const newQty = Math.min(currentItem.quantity + quantity, maxStock);
            updated[existingIndex] = { ...currentItem, quantity: newQty };
            return { items: updated };
          } else {
            const newItem: CartItem = {
              id: itemId,
              product,
              selectedSize: size,
              selectedColor: color,
              quantity,
            };
            return { items: [newItem, ...state.items] };
          }
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === itemId) {
              const maxStock = item.product.stock[item.selectedSize] ?? 10;
              return { ...item, quantity: Math.min(quantity, maxStock) };
            }
            return item;
          }),
        }));
      },

      clearCart: () => {
        set({ items: [], appliedPromo: null, promoError: null });
      },

      applyPromoCode: (rawCode: string) => {
        const code = rawCode.trim().toUpperCase();
        const promo = PROMO_CODES[code];
        const subtotal = get().getSubtotal();

        if (!promo) {
          set({ promoError: 'INVALID PROMOTIONAL CIPHER' });
          return false;
        }

        if (promo.minAmount && subtotal < promo.minAmount) {
          set({ promoError: `MINIMUM ORDER VALUE OF $${promo.minAmount} REQUIRED` });
          return false;
        }

        set({ appliedPromo: promo, promoError: null });
        return true;
      },

      removePromoCode: () => {
        set({ appliedPromo: null, promoError: null });
      },

      setShippingCost: (cost: number) => {
        set({ shippingCost: cost });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const promo = get().appliedPromo;
        if (!promo) return 0;
        return (subtotal * promo.discountPercentage) / 100;
      },

      getEffectiveShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) {
          return 0;
        }
        return get().shippingCost > 0 ? get().shippingCost : 25;
      },

      getTaxAmount: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const taxable = Math.max(0, subtotal - discount);
        // Luxury standard 8% estimated duty/tax
        return Math.round(taxable * 0.08);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getEffectiveShipping();
        const tax = get().getTaxAmount();
        return Math.max(0, subtotal - discount + shipping + tax);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'void-archive-cart-storage',
    }
  )
);

