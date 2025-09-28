import { useState, useMemo } from 'react';
import { Search, X, ShoppingCart, Heart, Star, Grid, List } from 'lucide-react';
import LogoLoop from '../LogoLoop';

import anuaLogo from '../../assets/images/brand section/anua.png';
import innisfreeLogo from '../../assets/images/brand section/innisfree.png';
import medicubeLogo from '../../assets/images/brand section/medicube.png';
import cosrxLogo from '../../assets/images/brand section/cosrx.png';
import etudeLogo from '../../assets/images/brand section/etude.png';
import beautyOfJoseonLogo from '../../assets/images/brand section/beauty of joeson.png';
import tonymolyLogo from '../../assets/images/brand section/tonymoly.png';
import skin1004Logo from '../../assets/images/brand section/skin1004.png';

const BrandsPage = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Brand data with logos
  const brands = [
    { name: 'anua', logo: anuaLogo, color: '#E8F5E8' },
    { name: 'innisfree', logo: innisfreeLogo, color: '#E8F8E8' },
    { name: 'medicube', logo: medicubeLogo, color: '#F0F8FF' },
    { name: 'cosrx', logo: cosrxLogo, color: '#FFF5F5' },
    { name: 'etude', logo: etudeLogo, color: '#FFF0F8' },
    { name: 'beauty of joseon', logo: beautyOfJoseonLogo, color: '#F8F5E8' },
    { name: 'tonymoly', logo: tonymolyLogo, color: '#F5F8FF' },
    { name: 'skin1004', logo: skin1004Logo, color: '#F8F8F0' }
  ];

  // Mock products data
  const mockProducts = [
    { id: 1, name: 'Heartleaf 77% Soothing Toner', brand: 'anua', price: 25.99, originalPrice: 32.99, rating: 4.8, reviews: 1234, image: '/api/placeholder/250/250', category: 'Toner', isNew: true },
    { id: 2, name: 'Green Tea Seed Serum', brand: 'innisfree', price: 18.99, originalPrice: null, rating: 4.6, reviews: 856, image: '/api/placeholder/250/250', category: 'Serum', isNew: false },
    { id: 3, name: 'Red Foam Cleanser', brand: 'medicube', price: 22.50, originalPrice: 28.00, rating: 4.7, reviews: 642, image: '/api/placeholder/250/250', category: 'Cleanser', isNew: true },
    { id: 4, name: 'Advanced Snail 96 Mucin Power Essence', brand: 'cosrx', price: 16.99, originalPrice: null, rating: 4.9, reviews: 2341, image: '/api/placeholder/250/250', category: 'Essence', isNew: false },
    { id: 5, name: 'SoonJung pH 6.5 Whip Cleanser', brand: 'etude', price: 12.99, originalPrice: 15.99, rating: 4.5, reviews: 432, image: '/api/placeholder/250/250', category: 'Cleanser', isNew: false },
    { id: 6, name: 'Glow Deep Serum', brand: 'beauty of joseon', price: 21.99, originalPrice: null, rating: 4.8, reviews: 1876, image: '/api/placeholder/250/250', category: 'Serum', isNew: true },
    { id: 7, name: 'Wonder Miracle Patch', brand: 'tonymoly', price: 8.99, originalPrice: 11.99, rating: 4.3, reviews: 298, image: '/api/placeholder/250/250', category: 'Treatment', isNew: false },
    { id: 8, name: 'Centella Asiatica Calming Toner', brand: 'skin1004', price: 19.99, originalPrice: null, rating: 4.7, reviews: 1045, image: '/api/placeholder/250/250', category: 'Toner', isNew: true },
  ];

  // Filter brands based on search
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  // Filter products based on selected brands and product search
  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      products = products.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by product search
    if (productSearch) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.category.toLowerCase().includes(productSearch.toLowerCase()) ||
        product.brand.toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    return products;
  }, [selectedBrands, productSearch]);

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brandName)) {
        return prev.filter(b => b !== brandName);
      } else {
        return [...prev, brandName];
      }
    });
  };

  const handleAllBrands = () => {
    setSelectedBrands([]);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setBrandSearch('');
    setProductSearch('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#662483] via-[#92278F] to-[#662483] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Discover K-Beauty Brands
            </h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              Explore authentic Korean beauty products from the most trusted brands
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bars */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#662483] focus:border-transparent w-full sm:w-64"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#662483] focus:border-transparent w-full sm:w-64"
                />
              </div>
            </div>

            {/* View Mode and Filters */}
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-[#662483]' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-[#662483]' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {(selectedBrands.length > 0 || brandSearch || productSearch) && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-[#662483] transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {selectedBrands.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-medium">Selected brands:</span>
              {selectedBrands.map(brand => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#662483] text-white text-sm rounded-full"
                >
                  {brand}
                  <button
                    onClick={() => handleBrandToggle(brand)}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Brands Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">The KDerma Brands</h2>
          <p className="text-gray-600 mb-6">A handpicked collection of Korea's most loved skincare and beauty labels.</p>

          <div style={{ height: '120px', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
            <LogoLoop
              logos={brands.map(brand => ({
                src: brand.logo,
                alt: brand.name,
                title: brand.name,
                href: `#${brand.name}`
              }))}
              speed={80}
              direction="left"
              logoHeight={40}
              gap={30}
              pauseOnHover
              scaleOnHover
              fadeOut
              ariaLabel="Brand logos"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* All Brands Button */}
            <button
              onClick={handleAllBrands}
              className={`group relative overflow-hidden rounded-xl p-6 text-center transition-all duration-300 hover:scale-105 ${
                selectedBrands.length === 0
                  ? 'bg-gradient-to-br from-[#662483] to-[#92278F] text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-dashed border-gray-300 hover:border-[#662483]'
              }`}
            >
              <div className="text-lg font-bold mb-2">ALL</div>
              <div className="text-sm opacity-80">
                {mockProducts.length} Products
              </div>
            </button>

            {/* Brand Cards */}
            {filteredBrands.map(brand => {
              const brandProducts = mockProducts.filter(p => p.brand === brand.name);
              const isSelected = selectedBrands.includes(brand.name);
              
              return (
                <button
                  key={brand.name}
                  onClick={() => handleBrandToggle(brand.name)}
                  className={`group relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#662483] to-[#92278F] text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-[#662483]'
                  }`}
                  style={{ backgroundColor: !isSelected ? brand.color : undefined }}
                >
                  <div className="mb-3">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-16 h-10 object-contain mx-auto"
                    />
                  </div>
                  <div className="text-sm font-semibold capitalize mb-1">
                    {brand.name}
                  </div>
                  <div className="text-xs opacity-75">
                    {brandProducts.length} Products
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg font-semibold text-gray-900">
            {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
            {selectedBrands.length > 0 && (
              <span className="text-sm text-gray-600 font-normal ml-2">
                from {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === 'list' ? 'h-full' : 'h-64'
                    }`}
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-[#662483] text-white px-2 py-1 text-xs font-semibold rounded-full">
                      NEW
                    </span>
                  )}
                  <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                  <div>
                    <div className="text-xs text-[#662483] font-semibold uppercase tracking-wide mb-2">
                      {product.brand}
                    </div>
                    <h3 className={`font-semibold text-gray-900 mb-2 line-clamp-2 ${
                      viewMode === 'list' ? 'text-lg' : 'text-sm'
                    }`}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-between ${
                    viewMode === 'list' ? 'mt-4' : ''
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#662483]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="bg-[#662483] text-white p-2 rounded-lg hover:bg-[#4A1A4A] transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or selected brands
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-[#662483] text-white rounded-lg hover:bg-[#4A1A4A] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
