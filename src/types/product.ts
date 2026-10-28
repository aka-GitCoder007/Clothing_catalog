export type ProductCategory =
  | 'outerwear'
  | 'hoodies'
  | 't-shirts'
  | 'pants'
  | 'footwear'
  | 'accessories';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'OS';

export interface ProductColor {
  name: string;
  hex: string;
  code: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  sku: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description: string;
  details: string[];
  materials: string[];
  careInstructions: string[];
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: Record<string, number>; // e.g. { "S": 3, "M": 12 }
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  collection: string;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  has3DModel?: boolean;
  modelType?: 'jacket' | 'hoodie' | 'coat' | 'pants' | 'accessory';
  image3D?: string;
}

