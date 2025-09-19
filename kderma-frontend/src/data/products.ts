import type { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: "COSRX Advanced Snail 96 Mucin Power Essence",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 1234,
    category: "Essence",
    brand: "COSRX",
    description: "A concentrated essence with 96% snail secretion filtrate that helps repair and rejuvenate damaged skin.",
    inStock: true
  },
  {
    id: '2',
    name: "Beauty of Joseon Glow Replenishing Rice Milk",
    price: 1899,
    originalPrice: 2299,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 856,
    category: "Toner",
    brand: "Beauty of Joseon",
    description: "A nourishing toner enriched with rice bran and alpha arbutin for glowing, hydrated skin.",
    inStock: true
  },
  {
    id: '3',
    name: "Innisfree Green Tea Seed Serum",
    price: 3199,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 642,
    category: "Serum",
    brand: "Innisfree",
    description: "Fresh serum with green tea seeds that provides deep moisturization and antioxidant protection.",
    inStock: true
  },
  {
    id: '4',
    name: "Laneige Water Sleeping Mask",
    price: 2799,
    originalPrice: 3299,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 1567,
    category: "Mask",
    brand: "Laneige",
    description: "Overnight sleeping mask that deeply hydrates and revitalizes skin while you sleep.",
    inStock: true
  },
  {
    id: '5',
    name: "The Ordinary Hyaluronic Acid 2% + B5",
    price: 1599,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1619451334792-150cd52c4d16?w=300&h=300&fit=crop",
    rating: 4.5,
    reviews: 923,
    category: "Serum",
    brand: "The Ordinary",
    description: "Multiple types of hyaluronic acid and vitamin B5 for intense hydration and plumping.",
    inStock: false
  },
  {
    id: '6',
    name: "Etude House SoonJung pH 6.5 Whip Cleanser",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 445,
    category: "Cleanser",
    brand: "Etude House",
    description: "Gentle, low-pH cleanser perfect for sensitive skin with a soft, whipped texture.",
    inStock: true
  },
  {
    id: '7',
    name: "MISSHA Time Revolution Night Repair Ampoule",
    price: 4299,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 782,
    category: "Ampoule",
    brand: "MISSHA",
    description: "Anti-aging night ampoule with fermented ingredients for skin renewal and repair.",
    inStock: true
  },
  {
    id: '8',
    name: "Dr. Jart+ Ceramidin Cream",
    price: 3899,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 623,
    category: "Moisturizer",
    brand: "Dr. Jart+",
    description: "Rich ceramide cream that strengthens skin barrier and provides long-lasting moisture.",
    inStock: true
  },
  {
    id: '9',
    name: "Some By Mi Red Tea Tree Spot Treatment",
    price: 1799,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1619451334792-150cd52c4d16?w=300&h=300&fit=crop",
    rating: 4.4,
    reviews: 891,
    category: "Treatment",
    brand: "Some By Mi",
    description: "Targeted spot treatment with red tea tree extract for acne-prone and troubled skin.",
    inStock: true
  },
  {
    id: '10',
    name: "Klairs Freshly Juiced Vitamin Drop",
    price: 2899,
    originalPrice: 3399,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 1045,
    category: "Serum",
    brand: "Klairs",
    description: "Vitamin C serum that brightens skin tone and provides antioxidant protection.",
    inStock: true
  },
  {
    id: '11',
    name: "Banila Co Clean It Zero Cleansing Balm",
    price: 2299,
    originalPrice: 2699,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 1234,
    category: "Cleanser",
    brand: "Banila Co",
    description: "Sherbet-textured cleansing balm that melts away makeup and impurities.",
    inStock: true
  },
  {
    id: '12',
    name: "Purito Centella Unscented Serum",
    price: 1999,
    originalPrice: undefined,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 567,
    category: "Serum",
    brand: "Purito",
    description: "Gentle, fragrance-free serum with centella asiatica for sensitive and irritated skin.",
    inStock: false
  }
];

// Helper functions
export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductsByBrand = (brand: string): Product[] => {
  return mockProducts.filter(product => 
    product.brand?.toLowerCase() === brand.toLowerCase()
  );
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  return mockProducts
    .filter(product => product.rating && product.rating >= 4.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand?.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};

export const products = mockProducts;
