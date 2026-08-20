import React, { useState, useEffect } from 'react';
import type { Product, PreviewPage } from '../../types';
import { X, ChevronLeft, ChevronRight, Download, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface BookViewerProps {
  product: Product;
  initialPageIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProduct?: (slug: string) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  product,
  initialPageIndex = 0,
  isOpen,
  onClose
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const { addToCart } = useCart();

  useEffect(() => {
    setCurrentPageIndex(initialPageIndex);
  }, [initialPageIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPageIndex, product.previewPages.length]);

  if (!isOpen || !product.previewPages || product.previewPages.length === 0) {
    return null;
  }

  const pages = product.previewPages;
  const currentPage: PreviewPage = pages[currentPageIndex] || pages[0];

  const handlePrev = () => {
    setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPageIndex(prev => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="lightbox-content bg-white w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#111111] text-white px-5 py-3.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="bg-[#1677FF] text-white text-xs font-bold px-2 py-0.5 rounded">
              {product.kitNumber}
            </div>
            <div>
              <div className="text-xs text-neutral-400 font-medium">APERÇU OFFICIEL DU GUIDE</div>
              <h4 className="text-sm font-bold text-white truncate max-w-md">{product.title}</h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block mr-2">
              Page {currentPage.pageNumber} · Extrait {currentPageIndex + 1} / {pages.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Fermer la visionneuse"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Interior Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#FAFBFC]">
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg border border-neutral-200 shadow-sm relative">
            {/* Header Stamp */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <div
                className="text-[11px] font-bold tracking-widest uppercase font-mono"
                style={{ color: product.coverTheme?.accentColor || '#1677FF' }}
              >
                {product.title} · {currentPage.chapter}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                PAGE {currentPage.pageNumber}
              </div>
            </div>

            <div
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded mb-3"
              style={{
                backgroundColor: `${product.coverTheme?.accentColor || '#1677FF'}15`,
                color: product.coverTheme?.accentColor || '#1677FF'
              }}
            >
              Extrait officiel n°{currentPageIndex + 1}
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-[#111111] mb-2 leading-tight">
              {currentPage.title}
            </h2>
            <p className="text-neutral-500 font-medium text-sm md:text-base mb-6 italic">
              {currentPage.subtitle}
            </p>

            <div className="prose prose-neutral max-w-none text-[#1D2939] leading-relaxed text-sm md:text-base mb-6 border-l-2 border-[#1677FF] pl-4 py-1 bg-[#F8FAFC] rounded-r">
              <p className="font-normal">{currentPage.snippet}</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]" />
                Points clés & Protocoles d'application
              </div>
              <ul className="space-y-2.5">
                {currentPage.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#475467]">
                    <span className="text-[#1677FF] font-bold font-mono text-xs mt-0.5">0{idx + 1}.</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-neutral-500 leading-normal bg-[#F5F7FA] p-3.5 rounded border border-neutral-200 flex items-center gap-3">
              <ShieldCheck className="text-[#1677FF] flex-shrink-0" size={18} />
              <span>
                <strong>Application immédiate :</strong> Chaque page du guide Studykit est construite pour être testée le jour même lors de votre session d'étude.
              </span>
            </div>

            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-center">
              <span className="text-xs text-[#9AA1AC] font-medium font-sans">{currentPage.pageNumber}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white px-5 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`btn btn-sm btn-secondary flex items-center gap-1.5 ${
                currentPageIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft size={16} />
              Page précédente
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentPageIndex ? 'bg-[#1677FF] w-6' : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Aller à la page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === pages.length - 1}
              className={`btn btn-sm btn-secondary flex items-center gap-1.5 ${
                currentPageIndex === pages.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              Page suivante
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onClose();
                addToCart(product, 1, true);
              }}
              className="btn btn-primary btn-sm flex-1 sm:flex-initial"
            >
              <Download size={16} />
              Acheter le guide complet ({product.price.toLocaleString('fr-FR')} {product.currency})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
