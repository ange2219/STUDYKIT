import React from 'react';
import type { Product } from '../../types';
import { BookCover } from '../common/BookCover';
import { BookOpen, ArrowRight, Check } from 'lucide-react';

interface BookPreviewSectionProps {
  product: Product;
  onOpenPreviewAtPage: (pageIndex: number) => void;
}

export const BookPreviewSection: React.FC<BookPreviewSectionProps> = ({
  product,
  onOpenPreviewAtPage
}) => {
  return (
    <section className="section bg-[#F8FAFC] border-b border-[#EAECF0]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
            TRANSPARENCE ÉDITORIALE
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-3">
            Regardez à l'intérieur.
          </h2>
          <p className="text-base text-[#667085]">
            Consultez les 3 premières pages authentiques extraites de nos guides avant de commander. Pas de remplissage, que de la méthode pure.
          </p>
        </div>

        {/* UNE SEULE CARTE D'APERÇU */}
        <div
          onClick={() => onOpenPreviewAtPage(0)}
          className="bg-white border-2 border-[#EAECF0] hover:border-[#1677FF] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden max-w-4xl mx-auto"
        >
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none -mr-16 -mt-16 transition-all duration-500 group-hover:opacity-25"
            style={{ backgroundColor: product.coverTheme?.accentColor || '#1677FF' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Colonne Visuel */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute w-32 sm:w-40 h-44 sm:h-52 bg-white rounded-lg border border-neutral-300 shadow-md transform rotate-6 translate-x-4 translate-y-1 opacity-70 group-hover:rotate-8 group-hover:translate-x-6 transition-transform duration-300 pointer-events-none" />
                <div className="absolute w-32 sm:w-40 h-44 sm:h-52 bg-white rounded-lg border border-neutral-300 shadow-md transform -rotate-3 -translate-x-3 translate-y-0.5 opacity-85 group-hover:-rotate-5 group-hover:-translate-x-5 transition-transform duration-300 pointer-events-none" />
                <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-300 shadow-xl rounded-lg overflow-hidden">
                  <BookCover product={product} size="md" />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#1677FF] bg-[#EBF3FF] px-3 py-1 rounded-full font-mono">
                <BookOpen size={13} />
                <span>3 PREMIÈRES PAGES</span>
              </div>
            </div>

            {/* Colonne Contenu */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-blue-50 text-[#1677FF] border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-[#1677FF] animate-pulse" />
                APERÇU INTERACTIF
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] group-hover:text-[#1677FF] transition-colors leading-tight">
                {product.title}
              </h3>

              <p className="text-sm text-[#475467] leading-relaxed">
                Feuilletez gratuitement la couverture, le sommaire officiel et la première leçon pratique de cet ouvrage en un seul clic.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-lg p-2">
                  <div className="text-[10px] font-bold font-mono text-[#1677FF]">PAGE 1</div>
                  <div className="text-[11px] font-semibold text-[#111111] truncate">Couverture</div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-lg p-2">
                  <div className="text-[10px] font-bold font-mono text-[#1677FF]">PAGE 2</div>
                  <div className="text-[11px] font-semibold text-[#111111] truncate">Sommaire</div>
                </div>
                <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-lg p-2">
                  <div className="text-[10px] font-bold font-mono text-[#1677FF]">PAGE 3</div>
                  <div className="text-[11px] font-semibold text-[#111111] truncate">Extrait</div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                <button className="btn btn-primary font-bold text-xs sm:text-sm px-5 py-2.5 shadow-md flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                  <BookOpen size={16} />
                  <span>Feuilleter les 3 premières pages</span>
                  <ArrowRight size={14} />
                </button>
                <span className="text-xs text-[#667085] flex items-center gap-1">
                  <Check size={14} className="text-[#12B76A]" strokeWidth={3} />
                  Accès libre sans compte
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
