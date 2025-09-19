import React from 'react';
import { ProductCard } from '../product';
import { mockProducts } from '../../data/products';

export const ObsessionsSection: React.FC = () => {
  // Select first 6 products for the slider
  const obsessionProducts = mockProducts.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4" style={{ fontFamily: '"Nura", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 300 }}>
            This Week's K-Beauty Obsessions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl" style={{ fontFamily: '"Nura", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            Discover the cult-favorites everyone's talking about.
          </p>
        </div>

        {/* Horizontal scrollable product row */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {obsessionProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
