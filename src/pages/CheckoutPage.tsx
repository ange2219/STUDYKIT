import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { ViewRoute, Order, CartItem } from '../types';
import { BookCover } from '../components/common/BookCover';
import { ShieldCheck, Lock, ArrowLeft, Smartphone, CreditCard } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (route: ViewRoute) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, subtotal, discount, total, setLastOrder, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card'>('mobile_money');
  const [mobileOperator, setMobileOperator] = useState<'wave' | 'orange' | 'mtn' | 'moov'>('wave');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-20">
        <div className="container-narrow text-center">
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Aucun article à commander</h2>
          <p className="text-sm text-[#667085] mb-6">
            Votre panier est actuellement vide. Veuillez sélectionner un guide dans la boutique.
          </p>
          <button onClick={() => onNavigate({ name: 'shop' })} className="btn btn-primary btn-sm">
            Voir la boutique
          </button>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `SK-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
        customer: {
          fullName,
          email,
          phone: phone || 'Non renseigné'
        },
        items: [...items],
        subtotal,
        discount,
        total,
        paymentMethod,
        paymentProvider: paymentMethod === 'mobile_money'
          ? (mobileOperator === 'wave' ? 'Wave Mobile Money' : mobileOperator === 'orange' ? 'Orange Money' : mobileOperator === 'mtn' ? 'MTN MoMo' : 'Moov Money')
          : 'Carte Bancaire (Visa/Mastercard)',
        status: 'confirmed'
      };

      setLastOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      onNavigate({ name: 'confirmation', orderNumber });
    }, 1200);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10 md:py-14 border-b border-[#EAECF0]">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAECF0]">
          <button
            onClick={() => onNavigate({ name: 'cart' })}
            className="text-xs font-semibold text-[#667085] hover:text-[#111111] flex items-center gap-1.5"
          >
            <ArrowLeft size={15} />
            Retour au panier
          </button>

          <div className="flex items-center gap-1.5 text-xs text-[#12B76A] font-semibold">
            <Lock size={13} />
            Tunnel de paiement sécurisé SSL
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: Customer info */}
              <div className="bg-white border border-[#EAECF0] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F2F4F7]">
                  <span className="w-5 h-5 rounded-full bg-[#1677FF] text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-base font-bold text-[#111111]">Vos coordonnées de livraison</h3>
                </div>

                <div className="space-y-4">
                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Nom complet *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Ex: Jean-Marc Kouassi"
                      className="form-input text-xs py-2.5"
                    />
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Adresse e-mail (Réception de l'ebook) *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="votre.email@exemple.com"
                      className="form-input text-xs py-2.5"
                    />
                    <span className="text-[11px] text-[#667085] mt-1 block">
                      Vos fichiers et votre facture seront envoyés immédiatement à cette adresse.
                    </span>
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label text-xs">Numéro de téléphone / WhatsApp (Optionnel)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Ex: +225 07 00 00 00 00"
                      className="form-input text-xs py-2.5"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: Payment Gateway Selection */}
              <div className="bg-white border border-[#EAECF0] rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F2F4F7]">
                  <span className="w-5 h-5 rounded-full bg-[#1677FF] text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-base font-bold text-[#111111]">Mode de paiement</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mobile_money')}
                    className={`p-3.5 rounded-lg border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'mobile_money'
                        ? 'border-[#1677FF] bg-[#EBF3FF] text-[#1677FF]'
                        : 'border-[#EAECF0] bg-white text-[#475467] hover:border-neutral-300'
                    }`}
                  >
                    <Smartphone size={18} />
                    <div>
                      <div className="text-xs font-bold text-[#111111]">Mobile Money</div>
                      <div className="text-[10px] text-[#667085]">Wave, Orange, MTN, Moov</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-lg border text-left flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#1677FF] bg-[#EBF3FF] text-[#1677FF]'
                        : 'border-[#EAECF0] bg-white text-[#475467] hover:border-neutral-300'
                    }`}
                  >
                    <CreditCard size={18} />
                    <div>
                      <div className="text-xs font-bold text-[#111111]">Carte bancaire</div>
                      <div className="text-[10px] text-[#667085]">Visa, Mastercard</div>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'mobile_money' && (
                  <div className="space-y-4 pt-1">
                    <label className="form-label text-xs">Sélectionnez votre opérateur :</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'wave', name: 'Wave' },
                        { id: 'orange', name: 'Orange' },
                        { id: 'mtn', name: 'MTN' },
                        { id: 'moov', name: 'Moov' }
                      ].map(op => (
                        <button
                          key={op.id}
                          type="button"
                          onClick={() => setMobileOperator(op.id as any)}
                          className={`py-2 px-1 rounded-md text-xs font-bold border transition-all text-center ${
                            mobileOperator === op.id
                              ? 'bg-[#111111] text-white border-[#111111]'
                              : 'bg-[#F8FAFC] text-[#475467] border-[#EAECF0] hover:bg-white'
                          }`}
                        >
                          {op.name}
                        </button>
                      ))}
                    </div>

                    <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#EAECF0] text-xs text-[#667085] flex items-center gap-2">
                      <ShieldCheck size={16} className="text-[#1677FF] flex-shrink-0" />
                      <span>Vous recevrez un prompt de validation sur votre téléphone après avoir cliqué sur finaliser.</span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="form-label text-xs">Numéro de carte</label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="form-input text-xs py-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="form-label text-xs">Date d'expiration</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="form-input text-xs py-2"
                        />
                      </div>
                      <div>
                        <label className="form-label text-xs">Code CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardCvc}
                          onChange={e => setCardCvc(e.target.value)}
                          className="form-input text-xs py-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 bg-white border border-[#EAECF0] rounded-xl p-6 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-[#111111] pb-3 border-b border-[#EAECF0]">
                Résumé de votre commande
              </h3>

              <div className="divide-y divide-[#F2F4F7] max-h-60 overflow-y-auto">
                {items.map((item: CartItem) => (
                  <div key={item.product.id} className="py-3 first:pt-0 flex items-center gap-3">
                    <div className="w-10 h-14 bg-[#F8FAFC] border border-[#EAECF0] rounded flex items-center justify-center flex-shrink-0">
                      <BookCover product={item.product} size="sm" is3D={false} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-[#1677FF] font-mono">
                        {item.product.kitNumber}
                      </span>
                      <h4 className="text-xs font-bold text-[#111111] truncate">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-[#667085]">
                        Qté: {item.quantity} · Format PDF
                      </div>
                    </div>

                    <div className="text-xs font-extrabold text-[#111111] flex-shrink-0">
                      {(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-xs text-[#667085] pt-3 border-t border-[#EAECF0]">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold text-[#111111]">
                    {subtotal.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#12B76A] font-semibold">
                    <span>Réduction appliquée</span>
                    <span>-{discount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#111111] pt-2 border-t border-[#EAECF0]">
                  <span>Total à régler</span>
                  <span className="text-[#1677FF]">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn btn-primary btn-block py-3 font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Validation en cours...
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    Finaliser mon achat ({total.toLocaleString('fr-FR')} FCFA)
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#667085] text-center space-y-1">
                <p>En validant votre achat, vous acceptez les conditions générales de vente Studykit.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
