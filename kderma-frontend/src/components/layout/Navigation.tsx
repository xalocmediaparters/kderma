import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import logo from '../../assets/icons/kderma pink version.png';
import { Button } from '../ui/Button';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
  onSearch: (query: string) => void;
  onSignInClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  cartCount,
  onCartClick,
  onProfileClick,
  onSearch,
  onSignInClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
<img src={logo} alt="KDerma Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#662483] transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-[#662483] transition-colors">
              Products
            </Link>
            <Link to="/brands" className="text-gray-700 hover:text-[#662483] transition-colors">
              Brands
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#662483] transition-colors">
              About
            </Link>
          </div>

          {/* Search Bar and Sign In Button */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662483] focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </form>
            <Button variant="primary" size="sm" onClick={onSignInClick} className="bg-[#662483] hover:bg-[#662483]/90 text-white">
              Sign In
            </Button>
          </div>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-[#662483] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#92278F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={onProfileClick}
              className="p-2 text-gray-700 hover:text-[#662483] transition-colors"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#662483] transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearchSubmit} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#662483] focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </form>
              <div className="flex flex-col space-y-2 px-2">
                <Link to="/" className="text-gray-700 hover:text-[#662483] transition-colors py-2">
                  Home
                </Link>
                <Link to="/products" className="text-gray-700 hover:text-[#662483] transition-colors py-2">
                  Products
                </Link>
                <Link to="/brands" className="text-gray-700 hover:text-[#662483] transition-colors py-2">
                  Brands
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-[#662483] transition-colors py-2">
                  About
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
