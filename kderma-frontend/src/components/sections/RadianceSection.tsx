import React from 'react';
import { ProductCard } from '../product';
import { mockProducts } from '../../data/products';
import ShinyText from '../ui/ShinyText';

export const RadianceSection: React.FC = () => {
  // Select next 6 products for the slider (after the first 6 used in ObsessionsSection)
  const radianceProducts = mockProducts.slice(6, 12);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <div className="mb-4">
            <ShinyText
              text="Say Hello to Radiance"
              className="text-3xl md:text-4xl"
              style={{ fontFamily: '"Nura", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 300, color: '#36454F' }}
            />
          </div>
          <div>
            <ShinyText
              text="Indulge in our curated mix of new launches and cult favorites."
              className="text-lg max-w-2xl"
              style={{ fontFamily: '"Nura", "Helvetica Neue", Helvetica, Arial, sans-serif', color: '#36454F' }}
            />
          </div>
        </div>

        {/* Horizontal scrollable product row */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {radianceProducts.map((product) => (
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
