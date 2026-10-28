import { PromoCode } from '../types/cart';
import { ShippingMethod } from '../types/order';

export const BRAND_NAME = 'VØID ARCHIVE';
export const BRAND_TAGLINE = 'Avant-Garde Streetwear & Technical Haute Couture';
export const FREE_SHIPPING_THRESHOLD = 350;

export const PROMO_CODES: Record<string, PromoCode> = {
  VOID10: {
    code: 'VOID10',
    discountPercentage: 10,
    description: '10% off entire order for archival members',
  },
  ARCHIVE20: {
    code: 'ARCHIVE20',
    discountPercentage: 20,
    description: '20% off orders over $500',
    minAmount: 500,
  },
  VIPFIRST: {
    code: 'VIPFIRST',
    discountPercentage: 15,
    description: '15% off first order for newsletter subscriber',
  },
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'COMPLIMENTARY ARCHIVAL COURIER',
    description: 'Carbon-neutral insured global delivery. 3-5 business days.',
    price: 0,
    estimatedDays: '3-5 business days',
  },
  {
    id: 'express',
    name: 'PRIORITY AIR DISPATCH',
    description: 'Direct air courier with white-glove signature tracking. 1-2 business days.',
    price: 45,
    estimatedDays: '1-2 business days',
  },
];

export const ANNOUNCEMENTS = [
  'COMPLIMENTARY WORLDWIDE ARCHIVAL COURIER ON ORDERS OVER $350',
  'AUTUMN / WINTER 2026: SYSTEMIC SILENCE CHAPTER VII NOW LIVE',
  'TOKYO & PARIS ATELIER PROTOTYPE ARCHIVES RELEASED',
  'SUBSCRIBE TO THE PROTOCOL FOR EXCLUSIVE EARLY ACCESS CODES',
];

export const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'%3e%3crect width='800' height='1000' fill='%23121212'/%3e%3cpath d='M200 500 L600 500' stroke='%23222222' stroke-width='2'/%3e%3ctext x='50%25' y='48%25' fill='%23666666' font-family='monospace' font-size='14' text-anchor='middle' letter-spacing='6'%3eVØID ARCHIVE%3c/text%3e%3ctext x='50%25' y='54%25' fill='%239E1B22' font-family='monospace' font-size='11' text-anchor='middle' letter-spacing='4'%3eARCHIVAL SPECIMEN%3c/text%3e%3c/svg%3e";


