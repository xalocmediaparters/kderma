import React, { useState } from 'react';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';
import { mockProducts } from '../../data/products';
import { NAVIGATION_ITEMS } from '../../utils/constants';

const HairPage: React.FC = () => {
  const cart = useCart();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts.filter(product =>
    product.category.toLowerCase().includes('hair')
  ));
  const [selectedCategory, setSelectedCategory] = useState<string>('Hair');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const filtered = mockProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#662483] mb-4 font-serif">
            Hair Care Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nourish and style your hair with our premium products
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button
              variant={selectedCategory === 'Hair' ? "primary" : "outline"}
              onClick={() => {
                setSelectedCategory('Hair');
                setFilteredProducts(mockProducts.filter(product =>
                  product.category.toLowerCase().includes('hair')
                ));
              }}
            >
              Hair
            </Button>
            {NAVIGATION_ITEMS.categories.filter(cat => cat !== 'Hair').map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={cart.addToCart}
              onToggleWishlist={(product) => console.log('Wishlist toggled:', product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HairPage;
