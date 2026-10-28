import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Download } from 'lucide-react';
import { Order } from '../types/order';
import { formatPrice } from '../utils/formatters';
import { useUIStore } from '../store/uiStore';
import { Button } from '../components/ui/Button';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { currency, showToast } = useUIStore();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fire subtle luxury celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5F3EE', '#9E1B22', '#888888'],
      });
    } catch (e) {
      // ignore
    }

    // Retrieve order from localStorage or create fallback demo order
    if (orderId) {
      const saved = localStorage.getItem(`void_order_${orderId}`);
      if (saved) {
        try {
          setOrder(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      } else {
        // Fallback realistic demo order for direct route visits
        setOrder({
          id: `ord_${Date.now()}`,
          orderNumber: orderId,
          createdAt: new Date().toISOString(),
          status: 'confirmed',
          customer: {
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
          },
          items: [],
          subtotal: 1250,
          shipping: 0,
          discount: 125,
          tax: 90,
          total: 1215,
          shippingMethod: {
            id: 'standard',
            name: 'COMPLIMENTARY ARCHIVAL COURIER',
            description: 'Carbon-neutral insured global delivery',
            price: 0,
            estimatedDays: '3-5 business days',
          },
          paymentMethod: 'credit-card',
          estimatedDelivery: '3-5 business days',
        });
      }
    }
  }, [orderId]);

  const handleDownloadInvoice = () => {
    showToast('DEMO INVOICE PDF GENERATED // DOWNLOADING ARCHIVAL RECEIPT', 'info');
  };

  const steps = [
    { title: 'ACQUISITION AUTHORIZED', desc: 'Payment approved & registered', status: 'completed' },
    { title: 'ARCHIVAL PACKAGING', desc: 'Vacuum sealing in static-free container', status: 'current' },
    { title: 'PRIORITY DISPATCH', desc: 'Courier handover Tokyo / Paris', status: 'upcoming' },
    { title: 'CLIENT DESTINATION', desc: 'Signature delivery', status: 'upcoming' },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#080808] min-h-screen font-mono text-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Confirmation Box */}
        <div className="p-8 sm:p-12 bg-[#0c0c0c] border border-[#222222] text-center mb-10">
          <div className="w-16 h-16 bg-[#161616] border border-[#333333] flex items-center justify-center text-emerald-400 mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E1B22] font-bold block mb-2">
            ACQUISITION PROTOCOL SECURED
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#F5F3EE] tracking-tight mb-2">
            THANK YOU FOR YOUR ORDER
          </h1>
          <p className="text-xs text-[#888888] font-sans max-w-md mx-auto mb-6">
            A confirmation manifest and encrypted tracking key have been dispatched to your contact email.
          </p>

          <div className="inline-flex items-center gap-3 bg-[#141414] border border-[#2e2e2e] py-2.5 px-6">
            <span className="text-[#888888] uppercase tracking-wider text-[11px]">
              ORDER IDENTIFIER:
            </span>
            <span className="text-[#F5F3EE] font-bold text-sm tracking-widest select-all">
              {orderId || 'VA-2026-98471'}
            </span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="p-6 bg-[#0c0c0c] border border-[#222222] mb-10">
          <h3 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-6 pb-3 border-b border-[#1c1c1c]">
            LOGISTICS PROGRESSION STATUS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {steps.map((st, i) => (
              <div
                key={st.title}
                className={`p-4 border ${
                  st.status === 'completed'
                    ? 'border-emerald-500/40 bg-emerald-950/10 text-emerald-300'
                    : st.status === 'current'
                    ? 'border-[#F5F3EE] bg-[#1a1a1a] text-[#F5F3EE]'
                    : 'border-[#1c1c1c] bg-[#090909] text-[#555555]'
                }`}
              >
                <span className="text-[9px] uppercase tracking-widest block mb-1">
                  STAGE 0{i + 1}
                </span>
                <h4 className="text-[11px] font-bold uppercase mb-1">{st.title}</h4>
                <p className="text-[10px] text-[#777777] font-sans">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details & Summary */}
        {order && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Customer Details */}
            <div className="p-6 bg-[#0c0c0c] border border-[#222222]">
              <h3 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-4 pb-3 border-b border-[#1c1c1c]">
                DISPATCH COORDINATES
              </h3>
              <div className="space-y-1.5 text-xs text-[#888888] leading-relaxed">
                <p className="text-[#F5F3EE] font-bold">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p>{order.customer.address} {order.customer.apartment}</p>
                <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
                <p>{order.customer.country}</p>
                <p className="pt-2 text-[#666666]">{order.customer.email} // {order.customer.phone}</p>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-6 bg-[#0c0c0c] border border-[#222222]">
              <h3 className="text-xs uppercase tracking-widest text-[#F5F3EE] font-bold mb-4 pb-3 border-b border-[#1c1c1c]">
                ACQUISITION SUMMARY
              </h3>
              <div className="space-y-2 text-[#888888]">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-[#F5F3EE]">{formatPrice(order.subtotal, currency)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>DISCOUNT</span>
                    <span>-{formatPrice(order.discount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>DISPATCH METHOD</span>
                  <span className="text-[#F5F3EE]">
                    {order.shipping === 0 ? 'COMPLIMENTARY' : formatPrice(order.shipping, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>IMPORT DUTY & TAX</span>
                  <span className="text-[#F5F3EE]">{formatPrice(order.tax, currency)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#F5F3EE] pt-3 border-t border-[#1c1c1c]">
                  <span>TOTAL CHARGED</span>
                  <span>{formatPrice(order.total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/shop">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              EXPLORE MORE SPECIMENS
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownloadInvoice}
            icon={<Download className="w-4 h-4" />}
          >
            DOWNLOAD ATELIER INVOICE (DEMO)
          </Button>
        </div>
      </div>
    </div>
  );
};

