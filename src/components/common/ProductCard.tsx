import React from 'react';
import type { Product } from '../../types';
import { BookCover } from './BookCover';
import { Star, ArrowRight, Eye, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewProduct: (slug: string) => void;
  onQuickPreview?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onQuickPreview
}) => {
  const isAvailable = product.status === 'available';

  return (
    <div className="card group flex flex-col justify-between h-full bg-white border border-[#EAECF0] rounded-xl p-4 sm:p-5 hover:border-[#B2D5FE] transition-all duration-200 hover:shadow-xl">
      <div>
        {/* Book Visual Container */}
        <div
          onClick={() => onViewProduct(product.slug)}
          className="relative bg-[#F8FAFC] rounded-xl py-6 px-3 flex items-center justify-center mb-4 cursor-pointer border border-[#F2F4F7] overflow-hidden group-hover:bg-[#F0F5FF] transition-colors"
          style={{ minHeight: '340px' }}
        >
          {/* Clean Flat A4 Book Cover */}
          <BookCover product={product} size="md" />

          {/* Quick Preview Hover Trigger */}
          {onQuickPreview && product.previewPages.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickPreview(product);
              }}
              className="absolute bottom-3 bg-white/95 text-[#111111] hover:text-[#1677FF] border border-neutral-200 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-20"
            >
              <Eye size={14} />
              Feuilleter l'extrait
            </button>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewProduct(product.slug)}
          className="text-base sm:text-lg font-bold text-[#111111] hover:text-[#1677FF] transition-colors cursor-pointer mb-2 line-clamp-2 leading-snug"
        >
          {product.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#667085] line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      <div>
        {/* Rating & Price Row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F2F4F7] mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500">
              <Star size={14} fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-[#111111]">{product.rating}</span>
            <span className="text-[11px] text-[#98A2B3]">({product.reviewsCount})</span>
          </div>

          <div className="text-right">
            {product.originalPrice && (
              <span className="text-xs text-[#98A2B3] line-through mr-1.5">
                {product.originalPrice.toLocaleString('fr-FR')} {product.currency}
              </span>
            )}
            <span className="text-base font-extrabold text-[#111111]">
              {product.price.toLocaleString('fr-FR')} {product.currency}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewProduct(product.slug)}
            className="btn btn-secondary btn-sm flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold"
          >
            Découvrir
            <ArrowRight size={14} />
          </button>

          {isAvailable && (
            <a
              href={product.chariowUrl || `https://chariow.com/p/${product.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm px-3 flex items-center justify-center gap-1 text-xs font-bold"
              title="Acheter sur Chariow"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Acheter</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
