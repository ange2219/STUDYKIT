import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../../data/products';
import { Search, X } from 'lucide-react';
import { BookCover } from './BookCover';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.kitNumber.toLowerCase().includes(q) ||
      p.audienceLabel.toLowerCase().includes(q) ||
      (p.subject && p.subject.toLowerCase().includes(q)) ||
      p.methods.some(m => m.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative max-w-xl mx-auto bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search size={20} className="text-[#1677FF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher une méthode, un guide, une matière..."
            className="flex-1 text-base outline-none text-[#111111] placeholder:text-neutral-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-800 rounded"
          >
            <X size={20} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-neutral-100">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              Aucune ressource trouvée pour « {query} ».
            </div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(product.slug);
                }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#F5F7FA] cursor-pointer transition-colors group"
              >
                <div className="w-12 h-16 bg-[#F8FAFC] border border-neutral-200 rounded flex items-center justify-center flex-shrink-0">
                  <BookCover product={product} size="sm" is3D={false} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[#1677FF] font-mono">
                      {product.kitNumber}
                    </span>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#1677FF] transition-colors truncate">
                    {product.title}
                  </h4>
                  <p className="text-xs text-neutral-500 truncate">
                    {product.tagline}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-[#111111]">
                    {product.price.toLocaleString('fr-FR')} {product.currency}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAFBFC] px-4 py-2.5 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Suggestions : Rappel actif, Épreuves, Mémorisation, Flashcards</span>
          <span className="font-mono">ESC pour fermer</span>
        </div>
      </div>
    </div>
  );
};
