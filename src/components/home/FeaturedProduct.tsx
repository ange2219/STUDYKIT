import React from 'react';
import type { Product } from '../../types';
import { BookCover } from '../common/BookCover';
import { Check, Eye, Star, ExternalLink } from 'lucide-react';

interface FeaturedProductProps {
  product: Product;
  onViewProduct: (slug: string) => void;
  onOpenPreview: (product: Product) => void;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  product,
  onViewProduct,
  onOpenPreview
}) => {

  const highlights = [
    'Rappel actif (Active Recall)',
    'Répétition espacée (Spaced Repetition)',
    'Pratique ciblée et délibérée',
    'Pratique entrelacée (Interleaving)',
    'Exploitation stratégique des épreuves',
    'Planning de révision optimisé 7 jours',
    'Fiches de travail & Carnet d\'erreurs'
  ];

  return (
    <section className="section bg-white border-b border-[#EAECF0]">
      <div className="container">
        <div className="bg-[#FAFBFC] border border-[#EAECF0] rounded-2xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBF3FF] rounded-full blur-3xl opacity-50 pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left: Book Cover */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                className="cursor-pointer group relative"
                onClick={() => onViewProduct(product.slug)}
              >
                <BookCover product={product} size="lg" is3D={true} />
              </div>

              <button
                onClick={() => onOpenPreview(product)}
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#1677FF] hover:underline"
              >
                <Eye size={15} />
                Feuilleter les premières pages du guide
              </button>
            </div>

            {/* Right: Presentation */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#111111] text-white text-[11px] font-bold font-mono px-2 py-0.5 rounded">
                    {product.kitNumber}
                  </span>
                  <span className="text-xs font-bold text-[#1677FF] uppercase tracking-wider">
                    RESSOURCE PHARE
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111111] leading-tight mb-3">
                  Commencez par améliorer votre façon d'apprendre.
                </h2>

                <p className="text-base text-[#475467] leading-relaxed">
                  « {product.tagline} »
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 bg-white border border-[#EAECF0] px-3 py-1.5 rounded-lg shadow-sm">
                  <div className="flex text-amber-500">
                    <Star size={14} fill="currentColor" />
                  </div>
                  <span className="font-bold text-[#111111]">{product.rating} / 5</span>
                  <span className="text-[#667085]">({product.reviewsCount} avis vérifiés)</span>
                </div>

                <div className="bg-white border border-[#EAECF0] px-3 py-1.5 rounded-lg text-[#475467] shadow-sm">
                  Format : Ebook PDF haute définition (84 pages)
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#111111] font-mono">
                  Méthodes & Outils inclus dans ce kit :
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#344054]">
                      <div className="w-5 h-5 rounded-full bg-[#EBF3FF] text-[#1677FF] flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="font-medium text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAECF0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[#667085] mb-0.5">Tarif unique · Accès direct</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#111111]">
                      {product.price.toLocaleString('fr-FR')} {product.currency}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#98A2B3] line-through">
                        {product.originalPrice.toLocaleString('fr-FR')} {product.currency}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onViewProduct(product.slug)}
                    className="btn btn-secondary text-sm"
                  >
                    Détails du kit
                  </button>

                  <a
                    href={product.chariowUrl || `https://chariow.com/p/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-sm shadow-md flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Acheter sur Chariow
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
