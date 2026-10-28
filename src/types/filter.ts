import { ProductCategory, ProductSize } from './product';

export interface FilterState {
  categories: ProductCategory[];
  priceRange: [number, number];
  sizes: ProductSize[];
  colors: string[];
  availability: 'all' | 'in-stock' | 'limited';
  collections: string[];
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

