import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { BookCover } from './BookCover';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
  onNavigateToProduct: (slug: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToShop,
  onNavigateToProduct
}) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const result = applyCoupon(inputCoupon);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponError(null);
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#EAECF0] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#1677FF]" />
              <h3 className="text-lg font-bold text-[#111111]">
                Votre Panier <span className="text-sm font-normal text-[#667085]">({totalItems})</span>
              </h3>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-[#667085] hover:text-[#111111] hover:bg-[#F5F7FA] transition-colors"
              aria-label="Fermer le panier"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EAECF0]">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F5F7FA] flex items-center justify-center mx-auto mb-4 text-[#98A2B3]">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="text-base font-bold text-[#111111] mb-1">Votre panier est vide</h4>
                <p className="text-sm text-[#667085] mb-6 max-w-xs mx-auto">
                  Découvrez nos guides pratiques et ebooks pour booster vos révisions.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onNavigateToShop();
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Explorer la boutique
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4 pt-4 first:pt-0">
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        closeCart();
                        onNavigateToProduct(item.product.slug);
                      }}
                      className="cursor-pointer flex-shrink-0 bg-[#F8FAFC] p-2 rounded border border-[#EAECF0] flex items-center justify-center"
                      style={{ width: '70px', height: '90px' }}
                    >
                      <BookCover product={item.product} size="sm" is3D={false} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-[#1677FF] font-mono uppercase">
                              {item.product.kitNumber}
                            </span>
                            <h4
                              onClick={() => {
                                closeCart();
                                onNavigateToProduct(item.product.slug);
                              }}
                              className="text-sm font-bold text-[#111111] hover:text-[#1677FF] transition-colors cursor-pointer line-clamp-1"
                            >
                              {item.product.title}
                            </h4>
                            <div className="text-[11px] text-[#667085]">Format PDF numérique</div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#98A2B3] hover:text-[#F04438] p-1 transition-colors"
                            title="Retirer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-[#EAECF0] rounded bg-[#F8FAFC]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-[#667085] hover:text-[#111111]"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-[#667085] hover:text-[#111111]"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span className="text-sm font-extrabold text-[#111111]">
                          {(item.product.price * item.quantity).toLocaleString('fr-FR')} {item.product.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAECF0] bg-[#FAFBFC] space-y-4">
              {/* Coupon Code Section */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-[#EBF3FF] border border-[#BAE0FF] text-[#1677FF] px-3 py-2 rounded text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag size={14} />
                    Code appliqué : {couponCode}
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-500 hover:text-neutral-800 font-bold ml-2"
                  >
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
                    className="form-input text-xs py-2 uppercase"
                  />
                  <button type="submit" className="btn btn-secondary btn-sm text-xs">
                    Appliquer
                  </button>
                </form>
              )}
              {couponError && <p className="text-xs text-[#F04438]">{couponError}</p>}

              {/* Pricing Breakdown */}
              <div className="space-y-1.5 text-xs text-[#667085] pt-1">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-[#111111] font-semibold">
                    {subtotal.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#12B76A] font-semibold">
                    <span>Réduction</span>
                    <span>-{discount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#111111] pt-2 border-t border-[#EAECF0]">
                  <span>Total</span>
                  <span className="text-[#1677FF]">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  closeCart();
                  onNavigateToCheckout();
                }}
                className="btn btn-primary btn-block text-sm py-3 font-bold flex items-center justify-center gap-2"
              >
                Passer au paiement
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#667085]">
                <ShieldCheck size={14} className="text-[#12B76A]" />
                <span>Paiement sécurisé · Accès immédiat</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
