import React, { useEffect, useState } from 'react';
import type { ViewRoute, Product, CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { BookCover } from '../components/common/BookCover';
import { BookViewer } from '../components/common/BookViewer';
import { CheckCircle2, Download, BookOpen, Mail, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConfirmationPageProps {
  orderNumber?: string;
  onNavigate: (route: ViewRoute) => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  orderNumber,
  onNavigate
}) => {
  const { lastOrder } = useCart();
  const [activeViewerProduct, setActiveViewerProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const orderNum = orderNumber || lastOrder?.orderNumber || 'SK-849201';
  const customerName = lastOrder?.customer.fullName || 'Apprenant Studykit';
  const customerEmail = lastOrder?.customer.email || 'votre email';
  const items = lastOrder?.items && lastOrder.items.length > 0
    ? lastOrder.items
    : [{ product: PRODUCTS[0], quantity: 1 }];

  const handleDownload = (product: Product) => {
    const blob = new Blob([
      `%PDF-1.4\n% STUDYKIT - ${product.kitNumber} - ${product.title}\n% « Des outils pour apprendre mieux »\n\nBienvenue dans votre ressource Studykit.\nContenu complet et fiches méthodologiques incluses.\nPour toute question : contact@studykit.education`
    ], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = product.downloadFileName || `${product.slug}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 md:py-20 border-b border-[#EAECF0]">
      <div className="container-narrow">
        <div className="bg-white border border-[#EAECF0] rounded-2xl p-8 md:p-12 shadow-sm mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#ECFDF3] border-4 border-[#D1FADF] flex items-center justify-center mx-auto mb-5 text-[#12B76A]">
            <CheckCircle2 size={32} />
          </div>

          <div className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider mb-1">
            COMMANDE N° {orderNum}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111] mb-3">
            Votre commande est confirmée.
          </h1>

          <p className="text-base text-[#475467] max-w-lg mx-auto leading-relaxed mb-6">
            Merci pour votre confiance, <strong className="text-[#111111]">{customerName}</strong>. Votre ressource numérique est prête et accessible immédiatement.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#F5F7FA] border border-[#EAECF0] px-4 py-2 rounded-lg text-xs text-[#667085]">
            <Mail size={14} className="text-[#1677FF]" />
            <span>Un reçu et votre lien de téléchargement permanent ont été envoyés à <strong>{customerEmail}</strong></span>
          </div>
        </div>

        {/* Downloads Area */}
        <div className="bg-white border border-[#EAECF0] rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAECF0]">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1677FF] font-mono">
                VOS FICHIERS
              </div>
              <h2 className="text-xl font-bold text-[#111111]">
                Télécharger vos ressources
              </h2>
            </div>
            <span className="text-xs font-medium text-[#12B76A] bg-[#ECFDF3] px-2.5 py-1 rounded">
              Prêt au téléchargement
            </span>
          </div>

          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div
                key={item.product.id}
                className="bg-[#FAFBFC] border border-[#EAECF0] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 bg-white border border-[#EAECF0] rounded flex items-center justify-center flex-shrink-0">
                    <BookCover product={item.product} size="sm" is3D={false} />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#1677FF]">
                      {item.product.kitNumber}
                    </span>
                    <h3 className="text-base font-bold text-[#111111]">
                      {item.product.title}
                    </h3>
                    <div className="text-xs text-[#667085] flex items-center gap-2 mt-0.5">
                      <FileText size={13} />
                      <span>{item.product.format}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveViewerProduct(item.product)}
                    className="btn btn-secondary btn-sm flex-1 sm:flex-initial text-xs flex items-center justify-center gap-1.5"
                  >
                    <BookOpen size={14} />
                    Lire en ligne
                  </button>

                  <button
                    onClick={() => handleDownload(item.product)}
                    className="btn btn-primary btn-sm flex-1 sm:flex-initial text-xs flex items-center justify-center gap-1.5 font-bold shadow-sm"
                  >
                    <Download size={14} />
                    Télécharger le PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practical Next Steps */}
        <div className="bg-[#111111] text-white rounded-2xl p-6 md:p-8 text-center space-y-4">
          <h3 className="text-lg font-bold">Comment exploiter votre guide dès aujourd'hui ?</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Ouvrez la méthode du rappel actif (chapitre 1), imprimez la fiche de travail 7 jours et appliquez-la dès votre prochaine heure d'étude.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate({ name: 'home' })}
              className="btn btn-secondary btn-sm text-xs"
            >
              Retourner à l'accueil
            </button>
          </div>
        </div>
      </div>

      {activeViewerProduct && (
        <BookViewer
          product={activeViewerProduct}
          initialPageIndex={0}
          isOpen={!!activeViewerProduct}
          onClose={() => setActiveViewerProduct(null)}
        />
      )}
    </div>
  );
};
