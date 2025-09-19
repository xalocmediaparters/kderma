import React from 'react';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';
import { mockProducts } from '../../data/products';
import { TrendingUp, Star } from 'lucide-react';

const BestSellersPage: React.FC = () => {
  const cart = useCart();

  // Sort products by reviews (popularity) and rating
  const bestSellers = mockProducts
    .sort((a, b) => {
      // Primary sort by reviews (higher reviews = more popular)
      const aReviews = a.reviews || 0;
      const bReviews = b.reviews || 0;
      if (bReviews !== aReviews) {
        return bReviews - aReviews;
      }
      // Secondary sort by rating
      return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 12); // Top 12 best sellers

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#DCAEE6] text-[#662483] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Best Sellers
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#662483] mb-4 font-serif">
            Most Loved Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the top-rated and most popular Korean beauty products loved by our community
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#662483] to-[#92278F] rounded-2xl p-6 text-white text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3">
              <Star className="w-6 h-6 text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">4.8★</div>
                <div className="text-sm text-purple-200">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-300" />
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-purple-200">Total Reviews</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#662483] font-bold text-sm">TOP</span>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-purple-200">Best Sellers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <div key={product.id} className="relative">
              {/* Best Seller Badge */}
              <div className="absolute -top-2 -left-2 z-10 bg-[#92278F] text-white text-xs font-bold px-2 py-1 rounded-full">
                #{index + 1}
              </div>
              <ProductCard
                product={product}
                onAddToCart={cart.addToCart}
                onToggleWishlist={(product) => console.log('Wishlist toggled:', product)}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Shop All Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BestSellersPage;
