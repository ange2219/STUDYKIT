import React, { useState, useEffect } from 'react';
import type { Product } from '../../types';
import { BookCover } from '../common/BookCover';
import { ArrowRight, Star, ShieldCheck, Zap, BookOpen, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  products?: Product[];
  featuredProduct?: Product;
  onExploreShop: () => void;
  onScrollToHowItWorks?: () => void;
  onViewProduct: (slug: string) => void;
  onOpenPreview: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  products = [],
  onExploreShop,
  onViewProduct,
  onOpenPreview
}) => {
  // Limité à exactement 5 livres phares
  const showcaseBooks = products.slice(0, 5);
  const total = showcaseBooks.length || 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Défilement automatique toutes les 4 secondes avec barre de progression fluide
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const intervalTime = 40; // 60fps update
    const step = (intervalTime / 4000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % total);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  const currentBook = showcaseBooks[currentIndex] || showcaseBooks[0];
  const activeAccent = currentBook?.coverTheme?.accentColor || '#1677FF';

  // Positionnement : Rien à gauche du livre actif, et UNIQUEMENT le prochain livre à droite
  const getSlideStyle = (idx: number) => {
    let diff = idx - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // 1. LIVRE ACTUEL AU PREMIER PLAN (Aucun élément à sa gauche)
    if (diff === 0) {
      return {
        transform: 'translateX(-30px) scale(1)',
        opacity: 1,
        zIndex: 30,
        filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.4))',
        pointerEvents: 'auto' as const,
        cursor: 'pointer'
      };
    }

    // 2. PROCHAIN LIVRE EN RETRAIT SUR LA DROITE (Prêt à glisser)
    if (diff === 1) {
      return {
        transform: 'translateX(110px) translateY(8px) scale(0.86) rotateY(-8deg)',
        opacity: 0.68,
        zIndex: 20,
        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))',
        pointerEvents: 'auto' as const,
        cursor: 'pointer'
      };
    }

    // 3. LIVRE QUI SORT OU AUTRES : SORTIE PROPRE SANS S'AFFICHER À GAUCHE
    if (diff === -1) {
      return {
        transform: 'translateX(-80px) scale(0.8) opacity(0)',
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none' as const
      };
    }

    return {
      transform: 'translateX(180px) scale(0.7) opacity(0)',
      opacity: 0,
      zIndex: 10,
      pointerEvents: 'none' as const
    };
  };

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 md:pt-16 md:pb-22 border-b border-[#EAECF0]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Colonne Gauche : Titres & CTA (Élargi à 7 colonnes pour garantir 2 lignes) */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#EBF3FF] border border-[#BAE0FF] px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]" />
              <span className="text-xs font-bold text-[#1677FF] tracking-wider uppercase font-mono">
                LIBRAIRIE D'EBOOKS & MÉTHODES
              </span>
            </div>

            {/* Titre STRICTEMENT sur 2 lignes */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-extrabold text-[#111111] leading-[1.18] tracking-tight">
              <span className="block sm:whitespace-nowrap">
                Librairie de <span className="text-[#1677FF]">performance</span> :
              </span>
              <span className="block mt-1">
                Profs & <span className="text-[#1677FF]">Élèves</span>.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#475467] leading-relaxed">
              Matrices pédagogiques et banques d'épreuves pour enseignants, guides de mémorisation et méthodes d'examen pour élèves. L'excellence académique à portée de main.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreShop}
                className="btn btn-primary btn-lg shadow-md flex items-center justify-center gap-2 font-bold"
              >
                <span>Voir le catalogue</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="https://wa.me/2290199563785?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20maison%20en%20matières%20scientifiques."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg shadow-md flex items-center justify-center gap-2 font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-all hover:scale-[1.02] border-none"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Cours de maison</span>
              </a>
            </div>

            <div className="pt-6 border-t border-[#EAECF0] grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                  <span className="text-xs font-bold text-[#111111] ml-1">4.9 / 5</span>
                </div>
                <div className="text-xs text-[#667085]">Note moyenne lecteurs</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#1677FF] mb-0.5">
                  <Zap size={15} />
                  <span className="text-xs font-bold text-[#111111]">+31 000 Sujets</span>
                </div>
                <div className="text-xs text-[#667085]">Épreuves & corrigés</div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#12B76A] mb-0.5">
                  <ShieldCheck size={15} />
                  <span className="text-xs font-bold text-[#111111]">Accès Direct</span>
                </div>
                <div className="text-xs text-[#667085]">Téléchargement immédiat</div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Scène 3D avec Livre Actif et Prochain Livre à Droite (5 colonnes) */}
          <div
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-4 select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Halo lumineux dynamique d'ambiance */}
            <div
              className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full blur-3xl opacity-35 transition-colors duration-700 pointer-events-none -z-10"
              style={{ backgroundColor: activeAccent }}
            />

            {/* Scène avec les livres */}
            <div
              className="relative flex items-center justify-center w-full"
              style={{
                perspective: '1200px',
                height: '470px'
              }}
            >
              {/* Rendu des livres */}
              <div className="relative w-full h-full flex items-center justify-center">
                {showcaseBooks.map((book, idx) => {
                  const style = getSlideStyle(idx);
                  const isActive = idx === currentIndex;

                  return (
                    <div
                      key={book.id}
                      onClick={() => (isActive ? onViewProduct(book.slug) : goToSlide(idx))}
                      className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={style}
                    >
                      <BookCover product={book} size="lg" />
                    </div>
                  );
                })}
              </div>

              {/* Bouton Suivant sur la droite */}
              <button
                onClick={handleNext}
                className="absolute right-0 sm:right-1 z-40 w-10 h-10 rounded-full bg-white border border-[#EAECF0] shadow-lg flex items-center justify-center text-[#475467] hover:text-[#1677FF] hover:border-[#1677FF] transition-all hover:scale-110"
                title="Livre suivant"
                aria-label="Suivant"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Actions & Progression sous le Livre Actif */}
            {currentBook && (
              <div className="mt-2 flex flex-col items-center gap-3 z-30">
                <button
                  onClick={() => onOpenPreview(currentBook)}
                  className="bg-[#111111] text-white hover:bg-[#1677FF] text-xs font-bold px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <BookOpen size={15} />
                  <span>Feuilleter l'aperçu gratuit (3 pages)</span>
                </button>

                {/* Barre de Progression Vivante (4s) & Indicateurs de Position */}
                <div className="flex flex-col items-center gap-2 mt-1">
                  <div className="w-36 h-1 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-75 ease-linear rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: activeAccent
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {showcaseBooks.map((book, idx) => (
                      <button
                        key={book.id}
                        onClick={() => goToSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? 'w-5'
                            : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
                        }`}
                        style={{
                          backgroundColor: idx === currentIndex ? activeAccent : undefined
                        }}
                        title={book.title}
                        aria-label={`Aller au livre ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-[#667085] font-medium">
                    {currentIndex + 1} / {total} — {currentBook.title.substring(0, 32)}...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
