import React, { useState, useEffect } from 'react';
import type { Product, PreviewPage } from '../../types';
import { X, ChevronLeft, ChevronRight, Download, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

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
  // Limite strictement aux 3 premières pages d'aperçu
  const pages: PreviewPage[] = (product.previewPages || []).slice(0, 3);
  const maxPageIdx = Math.max(0, pages.length - 1);

  const [currentPageIndex, setCurrentPageIndex] = useState(
    Math.min(initialPageIndex, maxPageIdx)
  );

  useEffect(() => {
    setCurrentPageIndex(Math.min(initialPageIndex, maxPageIdx));
  }, [initialPageIndex, isOpen, maxPageIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPageIndex, pages.length]);

  if (!isOpen || pages.length === 0) {
    return null;
  }

  const currentPage: PreviewPage = pages[currentPageIndex] || pages[0];
  const isLastPreviewPage = currentPageIndex === pages.length - 1;
  const accentColor = product.coverTheme?.accentColor || '#1677FF';

  const handlePrev = () => {
    setCurrentPageIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPageIndex(prev => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  const checkoutUrl = product.chariowUrl || `https://chariow.com/p/${product.slug}`;

  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="lightbox-content bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-neutral-200 animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#111111] text-white px-5 py-3.5 flex items-center justify-between border-b border-neutral-800 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="text-white text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
              style={{ backgroundColor: accentColor }}
            >
              {product.kitNumber}
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-neutral-400 font-medium tracking-wide uppercase font-mono">
                VISIONNEUSE OFFICIELLE · APERÇU 3 PAGES
              </div>
              <h4 className="text-sm font-bold text-white truncate max-w-md">{product.title}</h4>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs text-neutral-300 font-mono bg-neutral-800/80 px-2.5 py-1 rounded-full border border-neutral-700">
              Page {currentPageIndex + 1} / {pages.length}
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

        {/* 3-Page Step Selector Bar */}
        <div className="bg-[#FAFBFC] border-b border-neutral-200 px-4 py-2 flex items-center justify-center gap-2 sm:gap-4 flex-shrink-0 overflow-x-auto">
          {pages.map((_, idx) => {
            const isActive = idx === currentPageIndex;
            const stepLabels = ['Page 1 · Couverture', 'Page 2 · Sommaire', 'Page 3 · Extrait'];
            return (
              <button
                key={idx}
                onClick={() => setCurrentPageIndex(idx)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-white shadow-sm text-[#111111] border border-neutral-200 font-bold'
                    : 'text-[#667085] hover:text-[#111111] hover:bg-neutral-100'
                }`}
                style={isActive ? { borderLeft: `3px solid ${accentColor}` } : {}}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                    isActive ? 'text-white' : 'bg-neutral-200 text-[#475467]'
                  }`}
                  style={isActive ? { backgroundColor: accentColor } : {}}
                >
                  {idx + 1}
                </span>
                <span>{stepLabels[idx] || `Page ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* Interior Page Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 bg-[#F4F6F8]">
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 md:p-12 rounded-xl border border-neutral-200 shadow-md relative">
            {/* Header Stamp */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <div
                className="text-[11px] font-bold tracking-widest uppercase font-mono"
                style={{ color: accentColor }}
              >
                {product.title} · {currentPage.chapter}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                PAGE {currentPage.pageNumber || currentPageIndex + 1} / 3
              </div>
            </div>

            <div
              className="inline-block text-xs font-bold px-2.5 py-1 rounded mb-3 font-mono"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor
              }}
            >
              Extrait {currentPageIndex + 1} sur 3 · {currentPage.chapter}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] mb-2 leading-tight">
              {currentPage.title}
            </h2>
            <p className="text-neutral-500 font-medium text-xs sm:text-sm md:text-base mb-6 italic">
              {currentPage.subtitle}
            </p>

            <div
              className="prose prose-neutral max-w-none text-[#1D2939] leading-relaxed text-xs sm:text-sm md:text-base mb-6 border-l-3 pl-4 py-2 bg-[#F8FAFC] rounded-r shadow-xs"
              style={{ borderLeftColor: accentColor }}
            >
              <p className="font-normal">{currentPage.snippet}</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-5 mb-6 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Points clés & Protocoles d'application
              </div>
              <ul className="space-y-2.5">
                {currentPage.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475467]">
                    <span
                      className="font-bold font-mono text-xs mt-0.5 flex-shrink-0"
                      style={{ color: accentColor }}
                    >
                      0{idx + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Note d'authenticité */}
            <div className="text-xs text-neutral-500 leading-normal bg-[#F8FAFC] p-3.5 rounded-lg border border-neutral-200 flex items-center gap-3">
              <ShieldCheck className="flex-shrink-0 text-emerald-600" size={18} />
              <span>
                <strong>Application concrète :</strong> Chaque page du guide Studykit est conçue pour être appliquée directement lors de vos séances d'étude et de révision.
              </span>
            </div>

            {/* Bandeau d'incitation à l'achat sur la 3ème page (Fin de l'aperçu) */}
            {isLastPreviewPage && (
              <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border border-neutral-700 shadow-xl text-center relative overflow-hidden">
                <div
                  className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-2xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 font-mono">
                  <Lock size={12} />
                  Fin de l'aperçu gratuit (3 premières pages)
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-1.5">
                  Envie de lire la suite et d'obtenir tout le guide ?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto mb-4">
                  Débloquez instantanément l'intégralité du guide ({product.format}), les modèles prêts à l'emploi et les fiches bonus téléchargeables.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm px-5 py-2.5 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
                    onClick={onClose}
                  >
                    <Download size={16} />
                    <span>Commander le guide complet ({product.price.toLocaleString('fr-FR')} {product.currency})</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-[#9AA1AC] font-medium font-sans">
              <span>Studykit · Édition Officielle</span>
              <span>Page {currentPage.pageNumber || currentPageIndex + 1}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="bg-white px-5 py-3.5 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`btn btn-sm btn-secondary flex items-center gap-1.5 text-xs font-semibold ${
                currentPageIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft size={16} />
              <span>Page précédente</span>
            </button>

            {/* Pagination Dots (3 pages) */}
            <div className="flex items-center gap-1.5 px-3">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentPageIndex ? 'w-6' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  style={idx === currentPageIndex ? { backgroundColor: accentColor } : {}}
                  aria-label={`Aller à la page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === pages.length - 1}
              className={`btn btn-sm btn-secondary flex items-center gap-1.5 text-xs font-semibold ${
                currentPageIndex === pages.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <span>Page suivante</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="btn btn-primary btn-sm flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-bold shadow-sm"
            >
              <Download size={15} />
              <span>Acheter le guide complet ({product.price.toLocaleString('fr-FR')} {product.currency})</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
