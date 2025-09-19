import type { Product } from './product';

export type { Product } from './product';
export type { CartItem, Cart, CartActions, UserAddress } from './cart';

export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  brand?: string;
  inStock?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  products: Product[];
}
