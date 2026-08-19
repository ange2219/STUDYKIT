import React, { useState } from 'react';
import type { Product, ViewRoute } from '../types';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { ProductCard } from '../components/common/ProductCard';
import { BookViewer } from '../components/common/BookViewer';
import { ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: ViewRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Liste ordonnée des livres les plus vendus et intéressants pour le carrousel 4s
  const bestsellerSlugs = [
    'mieux-apprendre-ses-cours',
    'de-la-lecon-a-l-epreuve',
    'guide-preparation-cours-evaluations-prof',
    'banque-10000-epreuves-corriges-prof',
    'fiches-planning-revision-express'
  ];

  const showcaseProducts = bestsellerSlugs
    .map(slug => PRODUCTS.find(p => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  const [activePreviewProduct, setActivePreviewProduct] = useState<Product | null>(null);
  const [initialPreviewPageIndex, setInitialPreviewPageIndex] = useState<number>(0);

  const handleOpenPreview = (product: Product, pageIndex = 0) => {
    setActivePreviewProduct(product);
    setInitialPreviewPageIndex(pageIndex);
  };

  const handleClosePreview = () => {
    setActivePreviewProduct(null);
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('comment-ca-marche');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. HERO : Carrousel dynamique des livres phares (Défilement 4s) */}
      <HeroSection
        products={showcaseProducts}
        onExploreShop={() => onNavigate({ name: 'shop' })}
        onScrollToHowItWorks={scrollToHowItWorks}
        onViewProduct={slug => onNavigate({ name: 'product', slug })}
        onOpenPreview={product => handleOpenPreview(product, 0)}
      />

      {/* 2. CATALOGUE D'EBOOKS : Grille des ressources phares */}
      <section className="section bg-white border-b border-[#EAECF0]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
                CATALOGUE D'EBOOKS & GUIDES
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] mb-2">
                Des ressources conçues pour les profs et les élèves.
              </h2>
              <p className="text-sm md:text-base text-[#667085] max-w-2xl">
                Guides méthodologiques, banques de devoirs corrigés et méthodes de révision pratiques pour les examens.
              </p>
            </div>

            <button
              onClick={() => onNavigate({ name: 'shop' })}
              className="btn btn-secondary btn-sm flex items-center gap-1.5 self-start md:self-end text-xs font-bold"
            >
              <span>Voir tout le catalogue ({PRODUCTS.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 8).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={slug => onNavigate({ name: 'product', slug })}
                onQuickPreview={prod => handleOpenPreview(prod, 0)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMMENT ÇA MARCHE : 3 étapes simples et rassurantes */}
      <HowItWorks />

      {/* 4. AVIS VÉRIFIÉS : Preuve sociale profs & élèves */}
      <ReviewsSection reviews={REVIEWS} />

      {/* Visionneuse d'extraits interactive (Lightbox) */}
      {activePreviewProduct && (
        <BookViewer
          product={activePreviewProduct}
          initialPageIndex={initialPreviewPageIndex}
          isOpen={!!activePreviewProduct}
          onClose={handleClosePreview}
          onNavigateToProduct={slug => onNavigate({ name: 'product', slug })}
        />
      )}
    </div>
  );
};
