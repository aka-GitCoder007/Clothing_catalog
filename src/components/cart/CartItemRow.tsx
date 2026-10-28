import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types/cart';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatPrice } from '../../utils/formatters';
import { FALLBACK_IMAGE } from '../../utils/constants';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { currency, setCartOpen } = useUIStore();

  const maxStock = item.product.stock[item.selectedSize] ?? 10;

  return (
    <div className="flex gap-4 py-4 border-b border-[#1c1c1c] font-mono group">
      {/* Thumbnail */}
      <Link
        to={`/product/${item.product.id}`}
        onClick={() => setCartOpen(false)}
        className="w-20 h-24 sm:w-24 sm:h-30 shrink-0 bg-[#161616] border border-[#222222] overflow-hidden"
      >
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Item Info & Controls */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/product/${item.product.id}`}
              onClick={() => setCartOpen(false)}
              className="text-xs sm:text-sm font-bold text-[#F5F3EE] hover:text-white uppercase truncate transition-colors"
            >
              {item.product.name}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              className="text-[#666666] hover:text-rose-400 p-1 transition-colors shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Variants: Size and Color */}
          <div className="flex items-center gap-3 text-[11px] text-[#888888] mt-1">
            <span className="bg-[#141414] px-1.5 py-0.5 border border-[#262626]">
              SIZE: {item.selectedSize}
            </span>
            <span className="flex items-center gap-1.5 bg-[#141414] px-1.5 py-0.5 border border-[#262626]">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.selectedColor.hex }}
              />
              <span className="truncate max-w-[80px]">{item.selectedColor.code}</span>
            </span>
          </div>
        </div>

        {/* Quantity Stepper & Price */}
        <div className="flex items-center justify-between pt-2">
          {/* Stepper */}
          <div className="flex items-center border border-[#262626] bg-[#121212]">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 text-[#888888] hover:text-[#F5F3EE] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 text-xs text-[#F5F3EE] font-bold select-none">
              {item.quantity}
            </span>
            <button
              disabled={item.quantity >= maxStock}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 text-[#888888] hover:text-[#F5F3EE] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Total Price for Item */}
          <span className="text-xs sm:text-sm font-bold text-[#F5F3EE]">
            {formatPrice(item.product.price * item.quantity, currency)}
          </span>
        </div>
      </div>
    </div>
  );
};

