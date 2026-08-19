import React from 'react';
import type { ViewRoute } from '../types';
import { Users, GraduationCap } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: ViewRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Zéro remplissage, 100% méthode applicable',
      description: 'Nous refusons les manuels théoriques de 400 pages. Nos ebooks condensent les protocoles pédagogiques et cognitifs essentiels en formats percutants et directement exploitables.'
    },
    {
      title: 'Des outils pensés pour les Enseignants',
      description: 'Ingénierie de préparation de cours en 20 minutes, grilles d\'évaluation critériées et banques nationales de +10 000 devoirs et épreuves officielles corrigées de la 6e à la Terminale.'
    },
    {
      title: 'La science de la mémoire pour les Élèves',
      description: 'Rappel actif, répétition espacée, rétro-planning J-30 et déconstruction d\'épreuves types : tout ce dont un candidat a besoin pour exceller sans s\'épuiser.'
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-[#F8FAFC] border-b border-[#EAECF0] py-16 md:py-24">
        <div className="container-narrow">
          <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] mb-3 font-mono">
            NOTRE MANIFESTE ÉDUCATIF
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] leading-tight mb-6">
            Pourquoi Studykit ?
          </h1>
          <p className="text-lg md:text-xl text-[#344054] leading-relaxed">
            Studykit est la librairie numérique dédiée à <strong>l'excellence de l'enseignement et à la réussite des élèves</strong>.
          </p>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-16 border-b border-[#EAECF0]">
        <div className="container-narrow space-y-8 text-base text-[#475467] leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
                <Users size={20} />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-2">Notre engagement pour les Enseignants</h3>
              <p className="text-xs sm:text-sm text-[#475467]">
                Donner aux professeurs les outils de préparation, de gestion de classe et les banques de sujets corrigés pour enseigner avec sérénité et libérer du temps précieux.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-[#1677FF] text-white flex items-center justify-center mb-3">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-base font-bold text-[#111111] mb-2">Notre engagement pour les Élèves</h3>
              <p className="text-xs sm:text-sm text-[#475467]">
                Fournir aux collégiens, lycéens et étudiants les méthodes scientifiques de mémorisation et d'entraînement pour réussir leurs devoirs et examens sans stress.
              </p>
            </div>
          </div>

          <p className="text-lg text-[#1D2939] font-medium leading-relaxed">
            Le succès scolaire repose sur une alliance solide entre la rigueur pédagogique de l'enseignant et l'autonomie méthodique de l'apprenant.
          </p>

          <p>
            Pendant des années, le système a exigé des enseignants des heures interminables de préparation et a demandé aux élèves d'ingurgiter des cours sans leur donner la méthode pour les mémoriser.
          </p>

          <div className="bg-[#FAFBFC] border-l-4 border-[#1677FF] p-6 rounded-r-xl my-8">
            <h3 className="text-lg font-bold text-[#111111] mb-2 font-heading">
              Notre mission
            </h3>
            <p className="text-sm text-[#344054] leading-relaxed">
              Mettre à disposition de chaque enseignant et de chaque élève des ebooks clairs, synthétiques et universels pour faire de l'apprentissage un parcours d'épanouissement et de réussite durable.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Editorial Principles */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#EAECF0]">
        <div className="container-narrow">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-8 text-center sm:text-left">
            Les 3 piliers des collections Studykit
          </h2>

          <div className="space-y-6">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAECF0] rounded-xl p-6 shadow-sm flex items-start gap-4"
              >
                <span className="font-mono text-base font-extrabold text-[#1677FF] bg-[#EBF3FF] w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#111111] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#667085] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center">
        <div className="container-narrow space-y-4">
          <h3 className="text-2xl font-extrabold text-[#111111]">
            Prêt à explorer notre catalogue d'ebooks ?
          </h3>
          <p className="text-sm text-[#667085] max-w-md mx-auto">
            Découvrez nos guides pédagogiques pour professeurs et nos méthodes pour élèves.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate({ name: 'shop', audience: 'prof' })}
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-3"
            >
              Rayon Enseignants
            </button>
            <button
              onClick={() => onNavigate({ name: 'shop', audience: 'eleve' })}
              className="btn btn-primary text-sm font-bold px-6 py-3"
            >
              Rayon Élèves & Candidats
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
