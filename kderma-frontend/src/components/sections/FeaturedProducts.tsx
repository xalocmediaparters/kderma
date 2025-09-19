import React from 'react';
import { ProductGrid } from '../product';
import { getFeaturedProducts } from '../../data';

export const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};
