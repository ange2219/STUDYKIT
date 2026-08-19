import React, { useState, useMemo } from 'react';
import type { ViewRoute } from '../types';
import { FAQ_ITEMS } from '../data/faq';
import { ChevronDown, Search, HelpCircle, Mail } from 'lucide-react';

interface FaqPageProps {
  initialCategory?: string;
  onNavigate: (route: ViewRoute) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ initialCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ 'faq-01': true, 'faq-03': true });

  const categories = [
    'Tous',
    'Achat',
    'Produits numériques',
    'Paiement',
    'Accès aux produits',
    'Remboursement'
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter(item => {
      if (selectedCategory !== 'Tous' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <section className="bg-[#F8FAFC] border-b border-[#EAECF0] py-16">
        <div className="container-narrow text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
            CENTRE D'AIDE & SUPPORT
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] mb-4">
            Foire aux questions
          </h1>
          <p className="text-base text-[#667085] max-w-lg mx-auto mb-8">
            Toutes les réponses à vos questions concernant les formats, les paiements et l'accès à vos ebooks Studykit.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question (ex: format, paiement...)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#EAECF0] rounded-xl text-sm shadow-sm focus:outline-none focus:border-[#1677FF]"
            />
          </div>
        </div>
      </section>

      {/* Categories Toolbar */}
      <section className="border-b border-[#EAECF0] bg-white sticky top-[72px] md:top-[80px] z-20">
        <div className="container-narrow py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-[#F5F7FA] text-[#475467] hover:bg-[#EAECF0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordions List */}
      <section className="py-12">
        <div className="container-narrow space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-16 text-center bg-[#FAFBFC] rounded-xl border border-[#EAECF0]">
              <HelpCircle size={32} className="mx-auto text-neutral-400 mb-2" />
              <h3 className="text-base font-bold text-[#111111] mb-1">Aucune question trouvée</h3>
              <p className="text-xs text-[#667085]">
                Essayez d'autres mots-clés ou consultez toutes les catégories.
              </p>
            </div>
          ) : (
            filteredFaqs.map(item => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#EAECF0] rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 font-bold text-sm sm:text-base text-[#111111] hover:text-[#1677FF] transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#1677FF] uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <span>{item.question}</span>
                    </div>

                    <ChevronDown
                      size={20}
                      className={`text-[#667085] flex-shrink-0 transition-transform duration-200 mt-1 ${
                        isOpen ? 'rotate-180 text-[#1677FF]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#475467] leading-relaxed border-t border-[#F2F4F7] bg-[#FAFBFC]/50 animate-fadeIn">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Contact box */}
      <section className="container-narrow pt-6">
        <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-xl p-6 text-center space-y-2">
          <h4 className="text-sm font-bold text-[#111111]">Vous avez une question spécifique ?</h4>
          <p className="text-xs text-[#667085]">
            Notre équipe d'assistance pédagogique vous répond sous 24 heures.
          </p>
          <a
            href="mailto:contact@studykit.education"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1677FF] hover:underline pt-1"
          >
            <Mail size={14} />
            contact@studykit.education
          </a>
        </div>
      </section>
    </div>
  );
};
