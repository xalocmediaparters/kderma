export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  inStock: boolean;
  isFeatured?: boolean;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
}
