import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import type { Product } from '../../types/product';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!onAddToCart) return;
    setIsAddingToCart(true);
    try {
      await onAddToCart(product);
      // Simulate API delay
      setTimeout(() => setIsAddingToCart(false), 500);
    } catch (error) {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = () => {
    setIsLiked(!isLiked);
    onToggleWishlist?.(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#92278F] text-white px-2 py-1 rounded-full text-xs font-medium">
            {discount}% OFF
          </div>
        )}

        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200"
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating ?? 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-[#1E1E1E] mb-2 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Brand */}
        {product.brand && <p className="text-xs text-gray-500 mb-2">{product.brand}</p>}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-[#662483]">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
          loading={isAddingToCart}
          disabled={!product.inStock || !onAddToCart}
        >
          {product.inStock && onAddToCart ? (isAddingToCart ? 'Adding...' : 'Add to Cart') : product.inStock ? 'Not Available' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export { ProductCard };
