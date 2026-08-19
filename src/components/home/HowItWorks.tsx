import React from 'react';
import { Search, CreditCard, DownloadCloud, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'CHOISISSEZ VOTRE EBOOK',
      description: 'Sélectionnez le guide pédagogique ou la méthode de révision adaptée à votre classe ou votre niveau d\'examen.',
      icon: Search
    },
    {
      stepNumber: '02',
      title: 'PAIEMENT SÉCURISÉ',
      description: 'Réglez en toute simplicité par Mobile Money (Orange, MTN, Wave, Moov) ou par Carte Bancaire sans frais cachés.',
      icon: CreditCard
    },
    {
      stepNumber: '03',
      title: 'TÉLÉCHARGEMENT DIRECT',
      description: 'Accédez instantanément à votre ebook en PDF haute fidélité ainsi qu\'à toutes les fiches bonus prêtes à imprimer.',
      icon: DownloadCloud
    }
  ];

  return (
    <section id="comment-ca-marche" className="section bg-white border-b border-[#EAECF0]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
            PROCESSUS DIGITAL FLUIDE
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-3">
            Comment fonctionne la librairie ?
          </h2>
          <p className="text-base text-[#667085]">
            Un parcours pensé pour vous donner accès à vos outils de travail et manuels numériques en moins de 60 secondes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative bg-[#FAFBFC] border border-[#EAECF0] rounded-2xl p-8 flex flex-col items-start transition-all hover:border-[#1677FF] hover:shadow-lg"
              >
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#EAECF0] shadow-sm flex items-center justify-center text-[#1677FF]">
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-neutral-300">
                    {step.stepNumber}
                  </span>
                </div>

                <h3 className="text-base font-extrabold tracking-tight text-[#111111] mb-2 font-mono">
                  {step.title}
                </h3>

                <p className="text-sm text-[#667085] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance pill */}
        <div className="mt-12 bg-[#F8FAFC] border border-[#EAECF0] rounded-xl p-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#475467]">
          <div className="flex items-center gap-2">
            <CheckCircle size={15} className="text-[#12B76A]" />
            <span className="font-semibold">Format PDF universel (Mobile, Tablette, PC)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={15} className="text-[#12B76A]" />
            <span className="font-semibold">Fichiers imprimables A4 & A3</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={15} className="text-[#12B76A]" />
            <span className="font-semibold">Conservation illimitée après achat</span>
          </div>
        </div>
      </div>
    </section>
  );
};
