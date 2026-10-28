import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useUIStore } from '../store/uiStore';
import { ShippingAddress, ShippingMethod, PaymentMethodType, Order } from '../types/order';
import { SHIPPING_METHODS, FALLBACK_IMAGE, FREE_SHIPPING_THRESHOLD } from '../utils/constants';
import { formatPrice, generateOrderNumber } from '../utils/formatters';
import { Button } from '../components/ui/Button';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { currency, showToast } = useUIStore();
  const {
    items,
    appliedPromo,
    getSubtotal,
    getDiscountAmount,
    getTaxAmount,
    clearCart,
  } = useCartStore();

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit-card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: 'Kaelen',
    lastName: 'Vance',
    email: 'k.vance@void-archive.design',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Promenade',
    apartment: 'Unit 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States',
  });

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const tax = getTaxAmount();
  const calculatedShipping = shippingMethod.id === 'standard'
    ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25)
    : shippingMethod.price;
  const total = Math.max(0, subtotal - discount + calculatedShipping + tax);

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number required';
    if (!formData.address.trim()) newErrors.address = 'Street address required';
    if (!formData.city.trim()) newErrors.city = 'City required';
    if (!formData.state.trim()) newErrors.state = 'State / Province required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('PLEASE COMPLETE ALL MANDATORY ADDRESS FIELDS', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury order authorization
    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        customer: formData,
        items: [...items],
        subtotal,
        shipping: calculatedShipping,
        discount,
        tax,
        total,
        shippingMethod,
        paymentMethod,
        estimatedDelivery: '3-5 business days',
      };

      // Persist order in localStorage for confirmation page
      localStorage.setItem(`void_order_${orderNumber}`, JSON.stringify(newOrder));
      localStorage.setItem('void_last_order', orderNumber);

      // Clear the cart
      clearCart();

      setIsSubmitting(false);
      showToast('ACQUISITION CONFIRMED // DISPATCH IMMINENT', 'success');
      navigate(`/order-confirmation/${orderNumber}`);
    }, 1500);
  };

  // If cart is empty, redirect prompt
  if (items.length === 0) {
    return (
      <div className="py-24 text-center font-mono text-xs max-w-md mx-auto">
        <p className="text-[#888888] mb-4 uppercase">YOUR SESSION CART IS EMPTY</p>
        <Link to="/shop">
          <Button variant="primary">RETURN TO SHOP</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-[#080808] min-h-screen font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-[#777777] uppercase tracking-widest mb-6">
          <Link to="/cart" className="hover:text-[#F5F3EE] flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            <span>RETURN TO CART</span>
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#F5F3EE]">SECURE VIP CHECKOUT</span>
        </div>

        {/* Demo Notification Banner */}
        <div className="mb-8 p-4 bg-[#141414] border border-[#9E1B22]/50 text-xs text-[#F5F3EE] flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#9E1B22] shrink-0" />
          <div>
            <span className="font-bold uppercase text-[#9E1B22] block">
              PORTFOLIO DEMONSTRATION CHECKOUT MODE
            </span>
            <p className="text-[11px] text-[#A0A0A0] mt-0.5 font-sans">
              No real payments are collected. Sample addresses and test card details are pre-filled for your convenience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Checkout Form Steps (7 cols) */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-10">
            {/* Step 1: Contact Information */}
            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <div className="flex items-center justify-between pb-4 border-b border-[#1c1c1c] mb-6">
                <h2 className="text-sm font-bold uppercase text-[#F5F3EE] tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[10px] text-[#9E1B22]">
                    01
                  </span>
                  <span>CLIENT CONTACT IDENTIFIER</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                    EMAIL CIPHER *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                  />
                  {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                  />
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <div className="flex items-center justify-between pb-4 border-b border-[#1c1c1c] mb-6">
                <h2 className="text-sm font-bold uppercase text-[#F5F3EE] tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[10px] text-[#9E1B22]">
                    02
                  </span>
                  <span>ARCHIVAL DESTINATION ADDRESS</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                    {errors.firstName && <p className="text-[10px] text-rose-400 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                    {errors.lastName && <p className="text-[10px] text-rose-400 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                    STREET ADDRESS *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                  />
                  {errors.address && <p className="text-[10px] text-rose-400 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      SUITE / APT
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      CITY *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                    {errors.city && <p className="text-[10px] text-rose-400 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      STATE / PROV *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                    {errors.state && <p className="text-[10px] text-rose-400 mt-1">{errors.state}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      POSTAL CODE *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                    {errors.postalCode && <p className="text-[10px] text-rose-400 mt-1">{errors.postalCode}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      COUNTRY REGION *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none cursor-pointer"
                    >
                      <option value="United States">United States</option>
                      <option value="Japan">Japan (Tokyo Prefecture)</option>
                      <option value="France">France (Île-de-France)</option>
                      <option value="United Kingdom">United Kingdom (London)</option>
                      <option value="Germany">Germany (Berlin)</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Courier Selection */}
            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <div className="pb-4 border-b border-[#1c1c1c] mb-6">
                <h2 className="text-sm font-bold uppercase text-[#F5F3EE] tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[10px] text-[#9E1B22]">
                    03
                  </span>
                  <span>DISPATCH METHOD</span>
                </h2>
              </div>

              <div className="space-y-3">
                {SHIPPING_METHODS.map((sm) => (
                  <label
                    key={sm.id}
                    onClick={() => setShippingMethod(sm)}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      shippingMethod.id === sm.id
                        ? 'border-[#F5F3EE] bg-[#141414]'
                        : 'border-[#222222] bg-[#0d0d0d] hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={shippingMethod.id === sm.id}
                        onChange={() => setShippingMethod(sm)}
                        className="accent-[#9E1B22]"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#F5F3EE] uppercase block">
                          {sm.name}
                        </span>
                        <span className="text-[11px] text-[#777777] font-sans">
                          {sm.description}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#F5F3EE]">
                      {sm.id === 'standard'
                        ? (subtotal >= 350 ? 'COMPLIMENTARY' : formatPrice(25, currency))
                        : formatPrice(sm.price, currency)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4: Payment Simulation */}
            <div className="p-6 bg-[#0c0c0c] border border-[#1e1e1e]">
              <div className="flex items-center justify-between pb-4 border-b border-[#1c1c1c] mb-6">
                <h2 className="text-sm font-bold uppercase text-[#F5F3EE] tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-[#1c1c1c] border border-[#333333] flex items-center justify-center text-[10px] text-[#9E1B22]">
                    04
                  </span>
                  <span>PAYMENT SIMULATION</span>
                </h2>
                <div className="flex items-center gap-1.5 text-[10px] text-[#666666]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-BIT ENCRYPTED</span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { id: 'credit-card', label: 'CREDIT CARD' },
                  { id: 'apple-pay', label: 'APPLE PAY' },
                  { id: 'crypto', label: 'WEB3 CRYPTO' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as PaymentMethodType)}
                    className={`py-2 text-xs uppercase border text-center transition-all ${
                      paymentMethod === pm.id
                        ? 'border-[#F5F3EE] bg-[#F5F3EE] text-[#080808] font-bold'
                        : 'border-[#262626] text-[#888888] hover:border-[#444444]'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'credit-card' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                      CARD NUMBER (SIMULATED)
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                        EXPIRATION
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-[#888888] mb-1.5">
                        SECURITY CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-[#121212] border border-[#2a2a2a] focus:border-[#F5F3EE] px-3 py-2.5 text-xs text-[#F5F3EE] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-[#121212] border border-[#222222] text-center">
                  <p className="text-xs text-[#A0A0A0] uppercase mb-2">
                    {paymentMethod === 'apple-pay' ? 'TOUCH ID / FACE ID BIOMETRIC READY' : 'USDC / ETH SMART CONTRACT READY'}
                  </p>
                  <p className="text-[11px] text-[#666666]">
                    One-click mock authorization will complete upon placing order.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="xl"
              isLoading={isSubmitting}
            >
              AUTHORIZE & PLACE ARCHIVAL ORDER
            </Button>
          </form>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 bg-[#0c0c0c] border border-[#222222] p-6 lg:sticky lg:top-28">
            <h3 className="text-sm font-bold tracking-wider uppercase text-[#F5F3EE] pb-4 border-b border-[#222222] mb-6">
              RESERVED SPECIMENS ({items.length})
            </h3>

            {/* Item Mini Thumbnails */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-2 pb-4 border-b border-[#1c1c1c]">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                    className="w-14 h-18 object-cover bg-[#161616] border border-[#222222] shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <h4 className="font-bold text-[#F5F3EE] truncate uppercase">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-[#888888] mt-0.5">
                        SIZE: {item.selectedSize} // {item.selectedColor.code} (x{item.quantity})
                      </p>
                    </div>
                    <span className="font-bold text-[#F5F3EE]">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2.5 text-xs text-[#888888] py-4 border-b border-[#1c1c1c]">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-[#F5F3EE]">{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>DISCOUNT ({appliedPromo?.code})</span>
                  <span>-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>DISPATCH METHOD</span>
                <span className="text-[#F5F3EE]">
                  {calculatedShipping === 0 ? 'COMPLIMENTARY' : formatPrice(calculatedShipping, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>IMPORT DUTY & TAX</span>
                <span className="text-[#F5F3EE]">{formatPrice(tax, currency)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline py-4 mb-4">
              <span className="text-sm font-bold text-[#F5F3EE] uppercase">TOTAL CHARGE</span>
              <span className="text-2xl font-bold text-[#F5F3EE]">
                {formatPrice(total, currency)}
              </span>
            </div>

            <div className="text-[10px] text-[#666666] leading-relaxed">
              By authorizing this acquisition, you confirm adherence to the VØID ARCHIVE terms of care and archival storage protocol.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

