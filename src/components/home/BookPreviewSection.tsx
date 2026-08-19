import React from 'react';
import type { Product } from '../../types';
import { Eye, BookOpen, ChevronRight } from 'lucide-react';

interface BookPreviewSectionProps {
  product: Product;
  onOpenPreviewAtPage: (pageIndex: number) => void;
}

export const BookPreviewSection: React.FC<BookPreviewSectionProps> = ({
  product,
  onOpenPreviewAtPage
}) => {
  const previewCards = product.previewPages || [];

  return (
    <section className="section bg-[#F8FAFC] border-b border-[#EAECF0]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
            TRANSPARENCE ÉDITORIALE
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-3">
            Regardez à l'intérieur.
          </h2>
          <p className="text-base text-[#667085]">
            Consultez les vraies pages méthodologiques extraites de nos guides avant de commander. Pas de remplissage, que de la méthode pure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewCards.map((page, idx) => (
            <div
              key={page.pageNumber}
              onClick={() => onOpenPreviewAtPage(idx)}
              className="bg-white border border-[#EAECF0] rounded-xl p-6 hover:border-[#1677FF] hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                  <span className="text-[10px] font-mono font-bold text-[#1677FF] tracking-wider uppercase">
                    {page.chapter}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    P. {page.pageNumber}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#111111] group-hover:text-[#1677FF] transition-colors mb-2 leading-snug">
                  {page.title}
                </h3>

                <p className="text-xs text-[#667085] line-clamp-3 mb-4 leading-relaxed">
                  {page.summary}
                </p>

                <div className="bg-[#F8FAFC] border-l-2 border-[#1677FF] p-3 rounded-r text-[11px] text-[#475467] italic line-clamp-3 mb-4">
                  "{page.snippet.substring(0, 110)}..."
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2F4F7] flex items-center justify-between text-xs font-bold text-[#1677FF] group-hover:translate-x-1 transition-transform">
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} />
                  Ouvrir la page {page.pageNumber}
                </span>
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenPreviewAtPage(0)}
            className="btn btn-secondary text-sm inline-flex items-center gap-2 shadow-sm"
          >
            <Eye size={16} />
            Ouvrir la visionneuse complète ({previewCards.length} extraits réels)
          </button>
        </div>
      </div>
    </section>
  );
};
