import { Product, ProductColor, ProductSize } from './product';

export interface CartItem {
  id: string; // unique item id composed of product.id + size + color.name
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
  minAmount?: number;
}

