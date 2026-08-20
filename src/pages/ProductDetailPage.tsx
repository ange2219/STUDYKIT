import React, { useState } from 'react';
import type { ViewRoute } from '../types';
import { getProductBySlug, getRelatedProducts, PRODUCTS } from '../data/products';
import { BookCover } from '../components/common/BookCover';
import { ProductCard } from '../components/common/ProductCard';
import { BookViewer } from '../components/common/BookViewer';
import {
  Star,
  ShieldCheck,
  Zap,
  BookOpen,
  Check,
  ChevronDown,
  ArrowRight,
  FileText,
  ExternalLink,
  Phone
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: ViewRoute) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate
}) => {
  const product = getProductBySlug(slug) || PRODUCTS[0];
  const relatedProducts = getRelatedProducts(product.slug);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedPreviewPage, setSelectedPreviewPage] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const isAvailable = product.status === 'available';

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b border-[#EAECF0] bg-[#FAFBFC] py-3">
        <div className="container text-xs text-[#667085] flex items-center gap-2">
          <button onClick={() => onNavigate({ name: 'home' })} className="hover:text-[#111111]">
            Accueil
          </button>
          <span>/</span>
          <button onClick={() => onNavigate({ name: 'shop' })} className="hover:text-[#111111]">
            Boutique
          </button>
          <span>/</span>
          <span className="text-[#111111] font-semibold truncate max-w-xs">{product.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container pt-10 md:pt-14 pb-16 border-b border-[#EAECF0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* GAUCHE : Grande Couverture 3D */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-2xl p-8 md:p-12 w-full flex items-center justify-center relative shadow-sm">
              <div className="py-2">
                <BookCover product={product} size="xl" />
              </div>
            </div>

            {product.previewPages.length > 0 && (
              <button
                onClick={() => {
                  setSelectedPreviewPage(0);
                  setPreviewOpen(true);
                }}
                className="mt-4 btn btn-secondary btn-block text-xs font-bold flex items-center justify-center gap-2"
              >
                <BookOpen size={16} />
                Feuilleter l'aperçu intérieur ({product.previewPages.length} extraits)
              </button>
            )}
          </div>

          {/* DROITE : Informations d'achat */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1677FF] mb-2 font-mono">
                {product.category}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#111111]">{product.rating} / 5</span>
                <span className="text-xs text-[#667085]">
                  ({product.reviewsCount} avis d'apprenants)
                </span>
              </div>

              <p className="text-base text-[#475467] leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="bg-[#FAFBFC] border border-[#EAECF0] rounded-xl p-5">
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#111111]">
                    {product.price.toLocaleString('fr-FR')} {product.currency}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-[#98A2B3] line-through font-medium">
                      {product.originalPrice.toLocaleString('fr-FR')} {product.currency}
                    </span>
                  )}
                </div>

                <span className="text-xs font-semibold text-[#12B76A] bg-[#ECFDF3] px-2.5 py-1 rounded">
                  {isAvailable ? 'Accès direct' : 'Sortie imminente'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#667085] pt-2 border-t border-[#EAECF0]">
                <div className="flex items-center gap-1.5">
                  <FileText size={14} className="text-[#1677FF]" />
                  <span>Format : Ebook PDF A4</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-[#1677FF]" />
                  <span>Téléchargement immédiat</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {isAvailable ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={product.chariowUrl || `https://chariow.com/p/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg flex-1 font-bold text-base shadow-md flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    <span>Acheter sur Chariow ({product.price.toLocaleString('fr-FR')} {product.currency})</span>
                  </a>

                  <a
                    href={`https://wa.me/2290199563785?text=${encodeURIComponent(`Bonjour, je souhaite commander l'ebook : ${product.title} (${product.price} FCFA)`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-lg px-5 flex items-center justify-center gap-2 font-bold text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300"
                    title="Commander directement via WhatsApp"
                  >
                    <Phone size={17} className="text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => alert('Ce produit sera disponible très bientôt !')}
                  className="btn btn-secondary btn-lg btn-block font-bold text-base cursor-not-allowed opacity-75"
                >
                  Bientôt disponible en téléchargement
                </button>
              )}

              <div className="flex flex-wrap items-center justify-between text-xs text-[#667085] pt-2 gap-3">
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#12B76A]" strokeWidth={3} />
                  <span>Produit numérique officiel</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#12B76A]" strokeWidth={3} />
                  <span>Accès permanent après achat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#1677FF]" />
                  <span>Paiement sécurisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CE QUE VOUS ALLEZ APPRENDRE */}
      <section className="section-sm bg-white border-b border-[#EAECF0]">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
              BÉNÉFICES CLÉS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Ce que vous allez apprendre
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              Des protocoles concrets pour remplacer la fatigue stérile par un apprentissage à haut rendement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.learningOutcomes.map(item => (
              <div
                key={item.number}
                className="bg-[#FAFBFC] border border-[#EAECF0] rounded-xl p-6 relative hover:border-[#D0D5DD] transition-all"
              >
                <div className="font-mono text-xs font-bold text-[#1677FF] bg-[#EBF3FF] px-2.5 py-1 rounded inline-block mb-3">
                  {item.number}
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2">{item.title}</h3>
                <p className="text-xs text-[#475467] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENU DU GUIDE */}
      <section className="section-sm bg-[#F8FAFC] border-b border-[#EAECF0]">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
              COMPOSITION DU KIT
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Contenu du guide
            </h2>
            <p className="text-sm text-[#667085] mt-1">
              Tout ce qui est inclus lors de votre téléchargement :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {product.includedItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAECF0] rounded-lg p-4 flex items-center gap-3.5 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#EBF3FF] text-[#1677FF] flex items-center justify-center flex-shrink-0">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold text-[#1D2939]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APERÇU DU LIVRE */}
      {product.previewPages.length > 0 && (
        <section className="section-sm bg-white border-b border-[#EAECF0]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
                  EXTRAITS AUTHENTIQUES
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Aperçu du livre
                </h2>
                <p className="text-sm text-[#667085]">
                  Feuilletez {product.previewPages.length} extraits réels du guide avant d'acheter.
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedPreviewPage(0);
                  setPreviewOpen(true);
                }}
                className="btn btn-secondary btn-sm flex items-center gap-2 self-start md:self-end text-xs font-bold"
              >
                <BookOpen size={15} />
                Ouvrir la visionneuse
              </button>
            </div>

            <div className={`grid grid-cols-1 ${product.previewPages.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-5`}>
              {product.previewPages.map((page, idx) => (
                <div
                  key={page.pageNumber}
                  onClick={() => {
                    setSelectedPreviewPage(idx);
                    setPreviewOpen(true);
                  }}
                  className="bg-[#FAFBFC] border border-[#EAECF0] rounded-xl p-5 hover:border-[#1677FF] hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#1677FF] font-bold mb-2">
                    <span>{page.chapter}</span>
                    <span className="text-neutral-400">P. {page.pageNumber}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#1677FF] transition-colors mb-2 line-clamp-1">
                    {page.title}
                  </h4>
                  <p className="text-xs text-[#667085] line-clamp-2 mb-3">
                    {page.summary}
                  </p>
                  <div className="text-[11px] font-bold text-[#1677FF] flex items-center gap-1">
                    <span>Lire l'extrait</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ PRODUIT */}
      <section className="section-sm bg-[#F8FAFC] border-b border-[#EAECF0]">
        <div className="container-narrow">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
              RÉPONSES AUX QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-3">
            {product.faq.map((faqItem, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAECF0] rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#111111] hover:text-[#1677FF] transition-colors"
                >
                  <span>{faqItem.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#667085] transition-transform duration-200 ${
                      expandedFaqIndex === idx ? 'rotate-180 text-[#1677FF]' : ''
                    }`}
                  />
                </button>

                {expandedFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#475467] leading-relaxed border-t border-[#F2F4F7] pt-4 animate-fadeIn">
                    {faqItem.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUITS ASSOCIÉS */}
      {relatedProducts.length > 0 && (
        <section className="section-sm bg-white">
          <div className="container">
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
                COMPLÉTER VOTRE FORMATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Continuez votre progression
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relProduct => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onViewProduct={relSlug => onNavigate({ name: 'product', slug: relSlug })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {previewOpen && (
        <BookViewer
          product={product}
          initialPageIndex={selectedPreviewPage}
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          onNavigateToProduct={slugNav => onNavigate({ name: 'product', slug: slugNav })}
        />
      )}
    </div>
  );
};
