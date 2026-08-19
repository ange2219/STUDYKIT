import React from 'react';
import { ArrowRight, Brain, Target, FileCheck, Clock } from 'lucide-react';
import type { ProductCategory } from '../../types';

interface ProblemSolverProps {
  onSelectCategory?: (category: ProductCategory) => void;
  onSelectProduct: (slug: string) => void;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  onSelectProduct
}) => {
  const problems = [
    {
      number: '01',
      problem: '« Je perds trop de temps à préparer mes cours »',
      audience: 'Pour Enseignants',
      targetSlug: 'guide-preparation-cours-evaluations-prof',
      solution: 'Méthode de préparation modulaire & Grilles critériées',
      icon: Clock
    },
    {
      number: '02',
      problem: '« J\'oublie rapidement mes cours après les avoir lus »',
      audience: 'Pour Élèves & Étudiants',
      targetSlug: 'mieux-apprendre-ses-cours',
      solution: 'Méthodes de mémorisation & Rappel Actif',
      icon: Brain
    },
    {
      number: '03',
      problem: '« Je cherche des banques de devoirs et sujets corrigés »',
      audience: 'Pour Profs & Candidats',
      targetSlug: 'banque-10000-epreuves-corriges-prof',
      solution: 'Banque nationale de +10 000 épreuves 6e à Tle',
      icon: FileCheck
    },
    {
      number: '04',
      problem: '« Je bloque devant les épreuves types d\'examens »',
      audience: 'Pour Candidats Examens',
      targetSlug: 'de-la-lecon-a-l-epreuve',
      solution: 'De la Leçon à l\'Épreuve (Déconstruction des sujets)',
      icon: Target
    }
  ];

  return (
    <section className="section bg-[#F8FAFC] border-b border-[#EAECF0]">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-2 font-mono">
            ORIENTATION PRATIQUE
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-4">
            Vous avez un besoin précis. <br />
            Nous avons l'ebook adapté.
          </h2>
          <p className="text-base text-[#667085]">
            Chaque guide Studykit a été spécialement développé pour répondre à un point de friction de l'enseignement ou de l'apprentissage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                onClick={() => onSelectProduct(item.targetSlug)}
                className="bg-white border border-[#EAECF0] rounded-xl p-6 hover:border-[#1677FF] hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-[#1677FF] bg-[#EBF3FF] px-2.5 py-1 rounded">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#F5F7FA] flex items-center justify-center text-[#667085] group-hover:text-[#1677FF] group-hover:bg-[#EBF3FF] transition-colors">
                      <Icon size={16} />
                    </div>
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1 font-mono">
                    {item.audience}
                  </div>

                  <h3 className="text-base font-bold text-[#111111] mb-3 leading-snug">
                    {item.problem}
                  </h3>

                  <div className="text-xs text-[#667085] mb-6">
                    <span className="text-neutral-400 block text-[11px] uppercase tracking-wider mb-1">
                      Ebook recommandé :
                    </span>
                    <span className="font-semibold text-[#1D2939]">{item.solution}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2F4F7] flex items-center justify-between text-xs font-bold text-[#1677FF] group-hover:translate-x-1 transition-transform">
                  <span>Découvrir l'ebook</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
