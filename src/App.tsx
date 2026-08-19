import React, { useState, useEffect } from 'react';
import type { ViewRoute } from './types';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('/produit/')) {
      const slug = hash.replace('/produit/', '');
      return { name: 'product', slug };
    }
    if (hash === '/boutique') return { name: 'shop' };
    if (hash === '/panier') return { name: 'cart' };
    if (hash === '/checkout') return { name: 'checkout' };
    if (hash === '/a-propos') return { name: 'about' };
    if (hash === '/faq') return { name: 'faq' };
    return { name: 'home' };
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const navigateTo = (route: ViewRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    switch (route.name) {
      case 'home':
        window.location.hash = '/';
        break;
      case 'shop':
        window.location.hash = '/boutique';
        break;
      case 'product':
        window.location.hash = `/produit/${route.slug}`;
        break;
      case 'cart':
        window.location.hash = '/panier';
        break;
      case 'checkout':
        window.location.hash = '/checkout';
        break;
      case 'confirmation':
        window.location.hash = `/confirmation?order=${route.orderNumber}`;
        break;
      case 'about':
        window.location.hash = '/a-propos';
        break;
      case 'faq':
        window.location.hash = '/faq';
        break;
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('/produit/')) {
        const slug = hash.replace('/produit/', '');
        setCurrentRoute({ name: 'product', slug });
      } else if (hash === '/boutique') {
        setCurrentRoute({ name: 'shop' });
      } else if (hash === '/panier') {
        setCurrentRoute({ name: 'cart' });
      } else if (hash === '/checkout') {
        setCurrentRoute({ name: 'checkout' });
      } else if (hash === '/a-propos') {
        setCurrentRoute({ name: 'about' });
      } else if (hash === '/faq') {
        setCurrentRoute({ name: 'faq' });
      } else {
        setCurrentRoute({ name: 'home' });
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#1D2939] antialiased selection:bg-[#1677FF] selection:text-white">
        {/* Header */}
        <Header
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          onOpenSearch={() => setSearchModalOpen(true)}
        />

        {/* Views */}
        <main className="flex-1">
          {currentRoute.name === 'home' && (
            <HomePage onNavigate={navigateTo} />
          )}

          {currentRoute.name === 'shop' && (
            <ShopPage
              initialCategory={currentRoute.category}
              initialAudience={currentRoute.audience}
              initialSearch={currentRoute.search}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute.name === 'product' && (
            <ProductDetailPage
              slug={currentRoute.slug}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute.name === 'cart' && (
            <CartPage onNavigate={navigateTo} />
          )}

          {currentRoute.name === 'checkout' && (
            <CheckoutPage onNavigate={navigateTo} />
          )}

          {currentRoute.name === 'confirmation' && (
            <ConfirmationPage
              orderNumber={currentRoute.orderNumber}
              onNavigate={navigateTo}
            />
          )}

          {currentRoute.name === 'about' && (
            <AboutPage onNavigate={navigateTo} />
          )}

          {currentRoute.name === 'faq' && (
            <FaqPage
              initialCategory={currentRoute.category}
              onNavigate={navigateTo}
            />
          )}
        </main>

        {/* Search */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectProduct={slug => navigateTo({ name: 'product', slug })}
        />

        {/* Toast */}
        <Toast />

        {/* Footer */}
        <Footer onNavigate={navigateTo} />
      </div>
    </CartProvider>
  );
};

export default App;
