import React, { useState, useEffect } from 'react';
import type { ViewRoute } from './types';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { DigitalLibraryPage } from './pages/DigitalLibraryPage';

function routeFromHash(): ViewRoute {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/produit/')) return { name: 'product', slug: hash.replace('/produit/', '') };
  if (hash === '/boutique') return { name: 'shop' };
  if (hash === '/accueil') return { name: 'home' };
  if (hash === '/panier') return { name: 'cart' };
  if (hash === '/checkout') return { name: 'checkout' };
  if (hash === '/a-propos') return { name: 'about' };
  if (hash === '/faq') return { name: 'faq' };
  if (hash.startsWith('/confirmation')) {
    const params = new URLSearchParams(hash.split('?')[1] || '');
    return { name: 'confirmation', orderNumber: params.get('order') || '' };
  }
  return { name: 'digitalLibrary' };
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>(routeFromHash);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const navigateTo = (route: ViewRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    switch (route.name) {
      case 'digitalLibrary': window.location.hash = '/bibliotheque'; break;
      case 'home': window.location.hash = '/accueil'; break;
      case 'shop': window.location.hash = '/boutique'; break;
      case 'product': window.location.hash = `/produit/${route.slug}`; break;
      case 'cart': window.location.hash = '/panier'; break;
      case 'checkout': window.location.hash = '/checkout'; break;
      case 'confirmation': window.location.hash = `/confirmation?order=${encodeURIComponent(route.orderNumber)}`; break;
      case 'about': window.location.hash = '/a-propos'; break;
      case 'faq': window.location.hash = '/faq'; break;
    }
  };

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentRoute(routeFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  if (currentRoute.name === 'digitalLibrary' || currentRoute.name === 'shop') {
    return <DigitalLibraryPage initialTab={currentRoute.name === 'shop' ? 'shop' : 'library'} />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#1D2939] antialiased selection:bg-[#1677FF] selection:text-white">
        <Header currentRoute={currentRoute} onNavigate={navigateTo} onOpenSearch={() => setSearchModalOpen(true)} />
        <main className="flex-1">
          {currentRoute.name === 'home' && <HomePage onNavigate={navigateTo} />}
          {currentRoute.name === 'product' && <ProductDetailPage slug={currentRoute.slug} onNavigate={navigateTo} />}
          {currentRoute.name === 'cart' && <CartPage onNavigate={navigateTo} />}
          {currentRoute.name === 'checkout' && <CheckoutPage onNavigate={navigateTo} />}
          {currentRoute.name === 'confirmation' && <ConfirmationPage orderNumber={currentRoute.orderNumber} onNavigate={navigateTo} />}
          {currentRoute.name === 'about' && <AboutPage onNavigate={navigateTo} />}
          {currentRoute.name === 'faq' && <FaqPage initialCategory={currentRoute.category} onNavigate={navigateTo} />}
        </main>
        <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} onSelectProduct={slug => navigateTo({ name: 'product', slug })} />
        <Toast />
        <Footer onNavigate={navigateTo} />
      </div>
    </CartProvider>
  );
};

export default App;
