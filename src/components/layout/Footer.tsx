import React from 'react';
import type { ViewRoute } from '../../types';
import { ShieldCheck, Mail, Users, GraduationCap, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: ViewRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#111111] text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="container">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate({ name: 'home' })}
              className="flex items-center gap-2 cursor-pointer inline-flex"
            >
              <div className="w-6 h-6 rounded-[3px] bg-[#1677FF] flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-[1px]" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                STUDYKIT
              </span>
            </div>

            <p className="text-neutral-300 text-sm max-w-sm leading-relaxed font-medium">
              La librairie numérique des enseignants et des élèves.
            </p>

            <p className="text-neutral-400 text-xs max-w-sm leading-relaxed">
              Ebooks méthodologiques, banques de +10 000 épreuves officielles corrigées, guides de préparation de cours et plannings de révision pour le succès scolaire et académique.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <ShieldCheck size={16} className="text-[#1677FF]" />
              <span>Format PDF haute fidélité & Téléchargement immédiat</span>
            </div>
          </div>

          {/* Column 1: Rayon Enseignants */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
              <Users size={13} />
              Rayon Enseignants
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'guide-preparation-cours-evaluations-prof' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Préparation de cours & Évaluations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'banque-10000-epreuves-corriges-prof' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Banque +10 000 Épreuves & Corrigés
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'didactique-pedagogie-active-classe' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Didactique & Pédagogie Active
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'kit-cle-en-main-professeur-principal' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Kit Professeur Principal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'pack-integral-enseignant-excellence' })}
                  className="text-emerald-400 hover:underline font-bold text-left"
                >
                  Pack Intégral Enseignant (-25%)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Rayon Élèves */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
              <GraduationCap size={13} />
              Rayon Élèves
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'mieux-apprendre-ses-cours' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Mieux Apprendre Ses Cours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'de-la-lecon-a-l-epreuve' })}
                  className="hover:text-white transition-colors text-left"
                >
                  De la Leçon à l'Épreuve
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'fiches-planning-revision-express' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Planning de Révision J-30
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'guide-repetition-espacee-flashcards' })}
                  className="hover:text-white transition-colors text-left"
                >
                  Guide des Flashcards & Leitner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'product', slug: 'pack-reussite-totale-examens' })}
                  className="text-blue-400 hover:underline font-bold text-left"
                >
                  Pack Réussite Totale Élève (-30%)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Aide & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-mono">
              Aide & Contact
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate({ name: 'faq' })}
                  className="hover:text-white transition-colors"
                >
                  Foire aux questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'about' })}
                  className="hover:text-white transition-colors"
                >
                  À propos de Studykit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'faq', category: 'Paiement' })}
                  className="hover:text-white transition-colors"
                >
                  Paiement Mobile Money & Sécurité
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ name: 'faq', category: 'Accès aux produits' })}
                  className="hover:text-white transition-colors"
                >
                  Téléchargement & Accès PDF
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/2290199563785?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20les%20cours%20de%20maison%20en%20matières%20scientifiques."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1.5 font-semibold"
                >
                  <Phone size={13} />
                  <span>Cours de maison (+229 01 99 56 37 85)</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="mailto:contact@studykit.education"
                  className="text-[#1677FF] hover:underline flex items-center gap-1 text-xs font-semibold"
                >
                  <Mail size={13} />
                  contact@studykit.education
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 Studykit — La librairie numérique des enseignants et des élèves.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onNavigate({ name: 'faq' })}
              className="hover:text-neutral-300 transition-colors"
            >
              Conditions générales
            </button>
            <button
              onClick={() => onNavigate({ name: 'faq' })}
              className="hover:text-neutral-300 transition-colors"
            >
              Confidentialité
            </button>
            <button
              onClick={() => onNavigate({ name: 'about' })}
              className="hover:text-neutral-300 transition-colors"
            >
              Mentions légales
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
