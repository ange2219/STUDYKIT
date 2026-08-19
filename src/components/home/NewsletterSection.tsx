import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Merci ! Vous recevrez nos prochaines publications.');
  };

  return (
    <section className="section bg-white">
      <div className="container-narrow">
        <div className="bg-[#111111] text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1677FF] opacity-20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-neutral-800 text-[#1677FF] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md font-mono">
              <Mail size={13} />
              VEILLE MÉTHODOLOGIQUE
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Recevez nos nouvelles ressources.
            </h2>

            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
              Soyez informé lorsque de nouveaux guides, fiches et outils méthodologiques sont disponibles. Pas de spam, uniquement du contenu à haute valeur.
            </p>

            {subscribed ? (
              <div className="bg-neutral-800/80 border border-[#1677FF] p-4 rounded-lg flex items-center justify-center gap-2 text-sm text-white font-medium animate-fadeIn">
                <CheckCircle2 size={18} className="text-[#1677FF]" />
                <span>Inscription confirmée. Bienvenue dans la communauté Studykit !</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 text-white rounded-lg text-sm placeholder:text-neutral-500 focus:outline-none focus:border-[#1677FF]"
                />
                <button
                  type="submit"
                  className="btn btn-primary text-sm px-6 py-3 font-bold flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  S'inscrire
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            <div className="text-[11px] text-neutral-500 pt-2">
              Désinscription en 1 clic à tout moment. Vos données restent strictement confidentielles.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
