import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { UtilityHeader } from './components/layout/UtilityHeader';
import { SecondaryNavigation } from './components/layout/SecondaryNavigation';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import ProductsPage from './components/pages/ProductsPage';
import BrandsPage from './components/pages/BrandsPage';
import AboutPage from './components/pages/AboutPage';
import BestSellersPage from './components/pages/BestSellersPage';
import MakeupPage from './components/pages/MakeupPage';
import SkinPage from './components/pages/SkinPage';
import HairPage from './components/pages/HairPage';
import AppliancesPage from './components/pages/AppliancesPage';
import BathBodyPage from './components/pages/BathBodyPage';
import NaturalPage from './components/pages/NaturalPage';
import MomBabyPage from './components/pages/MomBabyPage';
import HealthWellnessPage from './components/pages/HealthWellnessPage';
import MenPage from './components/pages/MenPage';
import FragrancePage from './components/pages/FragrancePage';
import LingerieAccessoriesPage from './components/pages/LingerieAccessoriesPage';
import OffersPage from './components/pages/OffersPage';
import { useCart } from './hooks/useCart';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const cart = useCart();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate('/products'); // Navigate to products page with search
    }
  };

  const handleCartClick = () => {
    console.log('Cart clicked:', cart.items);
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  const handleSignInClick = () => {
    console.log('Sign In clicked');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <UtilityHeader />
      <Navigation
        cartCount={cart.totalItems}
        onCartClick={handleCartClick}
        onProfileClick={handleProfileClick}
        onSearch={handleSearch}
        onSignInClick={handleSignInClick}
      />
      <SecondaryNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/best-sellers" element={<BestSellersPage />} />
        <Route path="/makeup" element={<MakeupPage />} />
        <Route path="/skin" element={<SkinPage />} />
        <Route path="/hair" element={<HairPage />} />
        <Route path="/appliances" element={<AppliancesPage />} />
        <Route path="/bath-body" element={<BathBodyPage />} />
        <Route path="/natural" element={<NaturalPage />} />
        <Route path="/mom-baby" element={<MomBabyPage />} />
        <Route path="/health-wellness" element={<HealthWellnessPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/fragrance" element={<FragrancePage />} />
        <Route path="/lingerie-accessories" element={<LingerieAccessoriesPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
