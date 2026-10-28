import { CartItem } from './cart';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
};

export type PaymentMethodType = 'credit-card' | 'apple-pay' | 'klarna' | 'crypto';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  estimatedDelivery: string;
}

