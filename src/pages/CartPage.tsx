import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { ViewRoute, CartItem } from '../types';
import { BookCover } from '../components/common/BookCover';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface CartPageProps {
  onNavigate: (route: ViewRoute) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    total,
    totalItems,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setInputCoupon('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-20">
        <div className="container-narrow text-center">
          <div className="w-20 h-20 rounded-full bg-[#F5F7FA] flex items-center justify-center mx-auto mb-6 text-[#98A2B3]">
            <ShoppingBag size={36} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-2">
            Votre panier est vide
          </h1>
          <p className="text-base text-[#667085] mb-8 max-w-md mx-auto">
            Vous n'avez pas encore ajouté de ressources à votre sélection. Découvrez nos guides méthodologiques pour progresser.
          </p>
          <button
            onClick={() => onNavigate({ name: 'shop' })}
            className="btn btn-primary btn-lg"
          >
            Explorer la boutique Studykit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 border-b border-[#EAECF0]">
      <div className="container">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-1 font-mono">
            VOTRE SÉLECTION
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
            Panier d'achat <span className="text-lg font-normal text-[#667085]">({totalItems} ressource{totalItems > 1 ? 's' : ''})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-[#EAECF0] rounded-xl p-6 shadow-sm">
            <div className="divide-y divide-[#EAECF0]">
              {items.map((item: CartItem) => (
                <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      onClick={() => onNavigate({ name: 'product', slug: item.product.slug })}
                      className="cursor-pointer bg-[#F8FAFC] p-2 rounded-lg border border-[#EAECF0] flex items-center justify-center flex-shrink-0"
                      style={{ width: '80px', height: '105px' }}
                    >
                      <BookCover product={item.product} size="sm" is3D={false} />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[#1677FF]">
                        {item.product.kitNumber}
                      </span>
                      <h3
                        onClick={() => onNavigate({ name: 'product', slug: item.product.slug })}
                        className="text-base font-bold text-[#111111] hover:text-[#1677FF] transition-colors cursor-pointer"
                      >
                        {item.product.title}
                      </h3>
                      <div className="text-xs text-[#667085]">Format : Ebook PDF · Téléchargement direct</div>
                      <div className="text-sm font-extrabold text-[#111111] sm:hidden pt-1">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} {item.product.currency}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F2F4F7]">
                    <div className="flex items-center border border-[#EAECF0] rounded bg-[#F8FAFC]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-[#667085] hover:text-[#111111]"
                        aria-label="Diminuer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#111111]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-[#667085] hover:text-[#111111]"
                        aria-label="Augmenter"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="hidden sm:block text-right min-w-[100px]">
                      <div className="text-base font-extrabold text-[#111111]">
                        {(item.product.price * item.quantity).toLocaleString('fr-FR')} {item.product.currency}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-[#98A2B3] hover:text-[#F04438] transition-colors"
                      title="Supprimer la ressource"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-[#EAECF0] rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-[#111111] pb-3 border-b border-[#EAECF0]">
              Récapitulatif de commande
            </h3>

            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-[#EBF3FF] border border-[#BAE0FF] text-[#1677FF] px-3 py-2 rounded text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag size={14} />
                    Code actif : {couponCode}
                  </div>
                  <button onClick={removeCoupon} className="font-bold text-neutral-600 hover:text-black">
                    Retirer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={e => {
                      setInputCoupon(e.target.value);
                      if (couponError) setCouponError(null);
                    }}
                    placeholder="Code promo (ex: STUDY10)"
                    className="form-input text-xs py-2 uppercase flex-1"
                  />
                  <button type="submit" className="btn btn-secondary btn-sm text-xs">
                    Appliquer
                  </button>
                </form>
              )}
              {couponError && <p className="text-xs text-[#F04438] mt-1">{couponError}</p>}
            </div>

            <div className="space-y-2 text-sm text-[#667085] pt-2">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-semibold text-[#111111]">
                  {subtotal.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#12B76A] font-semibold">
                  <span>Réduction promo</span>
                  <span>-{discount.toLocaleString('fr-FR')} FCFA</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-extrabold text-[#111111] pt-3 border-t border-[#EAECF0]">
                <span>Total à payer</span>
                <span className="text-[#1677FF]">{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate({ name: 'checkout' })}
              className="btn btn-primary btn-block text-base py-3 font-bold flex items-center justify-center gap-2 shadow-md"
            >
              Passer au paiement sécurisé
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#667085] pt-1">
              <ShieldCheck size={16} className="text-[#12B76A]" />
              <span>Chiffrement SSL 256 bits · Accès instantané</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
