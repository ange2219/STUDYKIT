import React, { useState, useMemo } from 'react';
import type { Product, ProductCategory, TargetAudience, ViewRoute } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { BookViewer } from '../components/common/BookViewer';
import { Search, ArrowUpDown, Users, GraduationCap, Package, BookOpen, X } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: ProductCategory | string;
  initialAudience?: TargetAudience;
  initialSearch?: string;
  onNavigate: (route: ViewRoute) => void;
}

type SortOption = 'popular' | 'newest' | 'price_asc' | 'price_desc';

export const ShopPage: React.FC<ShopPageProps> = ({
  initialAudience = 'all',
  initialSearch = '',
  onNavigate
}) => {
  const [selectedAudience, setSelectedAudience] = useState<TargetAudience | 'packs'>(
    initialAudience || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  const counts = useMemo(() => {
    const profCount = PRODUCTS.filter(p => p.targetAudience === 'prof' && !p.isBundle).length;
    const eleveCount = PRODUCTS.filter(p => p.targetAudience === 'eleve' && !p.isBundle).length;
    const packsCount = PRODUCTS.filter(p => p.isBundle).length;
    return {
      all: PRODUCTS.length,
      prof: profCount,
      eleve: eleveCount,
      packs: packsCount
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Filter by Audience / Packs
      if (selectedAudience === 'packs') {
        if (!product.isBundle) return false;
      } else if (selectedAudience === 'prof') {
        if (product.targetAudience !== 'prof' || product.isBundle) return false;
      } else if (selectedAudience === 'eleve') {
        if (product.targetAudience !== 'eleve' || product.isBundle) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchKit = product.kitNumber.toLowerCase().includes(q);
        const matchSubject = product.subject?.toLowerCase().includes(q) || false;
        const matchAudience = product.audienceLabel.toLowerCase().includes(q);
        const matchMethod = product.methods.some(m => m.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchKit && !matchMethod && !matchSubject && !matchAudience) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'newest') return a.id.localeCompare(b.id);
      return 0;
    });
  }, [selectedAudience, searchQuery, sortBy]);

  const hasActiveFilters = selectedAudience !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedAudience('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Shop Header */}
      <section className="bg-[#F8FAFC] border-b border-[#EAECF0] py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
              LIBRAIRIE NUMÉRIQUE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] mb-2.5">
              Catalogue d'Ebooks
            </h1>
            <p className="text-sm md:text-base text-[#667085]">
              Guides pédagogiques, banques de 10 000 épreuves et méthodes de réussite pour enseignants et élèves.
            </p>
          </div>
        </div>
      </section>

      {/* Single Unified Filter Toolbar */}
      <section className="border-b border-[#EAECF0] bg-white sticky top-[72px] md:top-[80px] z-30 shadow-xs">
        <div className="container py-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
            {/* Simple Audience Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <button
                onClick={() => setSelectedAudience('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedAudience === 'all'
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-[#F5F7FA] text-[#475467] hover:bg-[#EAECF0]'
                }`}
              >
                <BookOpen size={13} />
                <span>Tous ({counts.all})</span>
              </button>

              <button
                onClick={() => setSelectedAudience('prof')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedAudience === 'prof'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <Users size={13} />
                <span>Enseignants ({counts.prof})</span>
              </button>

              <button
                onClick={() => setSelectedAudience('eleve')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedAudience === 'eleve'
                    ? 'bg-[#1677FF] text-white shadow-xs'
                    : 'bg-blue-50 text-[#1677FF] hover:bg-blue-100'
                }`}
              >
                <GraduationCap size={13} />
                <span>Élèves & Candidats ({counts.eleve})</span>
              </button>

              <button
                onClick={() => setSelectedAudience('packs')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedAudience === 'packs'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                <Package size={13} />
                <span>Packs Promo ({counts.packs})</span>
              </button>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un guide..."
                  className="w-full pl-8 pr-7 py-1.5 bg-[#F5F7FA] border border-[#EAECF0] rounded-lg text-xs outline-none focus:border-[#1677FF] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                    aria-label="Effacer la recherche"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <ArrowUpDown size={13} className="text-[#667085] hidden sm:inline" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="bg-[#F5F7FA] border border-[#EAECF0] rounded-lg text-xs font-semibold px-2.5 py-1.5 text-[#111111] outline-none cursor-pointer hover:bg-[#EAECF0] transition-colors"
                >
                  <option value="popular">Populaires</option>
                  <option value="newest">Nouveautés</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="container pt-6">
        <div className="flex items-center justify-between mb-5 text-xs text-[#667085]">
          <span>
            {filteredProducts.length} ebook{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-[#1677FF] hover:underline font-semibold flex items-center gap-1"
            >
              <X size={12} />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#FAFBFC] rounded-2xl border border-[#EAECF0] px-4">
            <h3 className="text-base font-bold text-[#111111] mb-2">Aucun ebook ne correspond à votre sélection</h3>
            <p className="text-xs text-[#667085] mb-5 max-w-sm mx-auto">
              Essayez de modifier votre mot-clé ou sélectionnez un autre rayon.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn btn-secondary btn-sm text-xs"
            >
              Afficher tout le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={slug => onNavigate({ name: 'product', slug })}
                onQuickPreview={prod => setPreviewProduct(prod)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Aperçu */}
      {previewProduct && (
        <BookViewer
          product={previewProduct}
          isOpen={!!previewProduct}
          onClose={() => setPreviewProduct(null)}
          onNavigateToProduct={slug => onNavigate({ name: 'product', slug })}
        />
      )}
    </div>
  );
};
