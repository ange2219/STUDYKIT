import type { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productSlug: 'guide-preparation-cours-evaluations-prof',
    author: 'M. Kouassi Jean-Baptiste',
    role: 'Enseignant',
    institution: 'Professeur de Mathématiques (Lycée Classique)',
    rating: 5,
    title: 'Une mine d\'or pour structurer ses cours et ses devoirs',
    comment: 'En tant qu\'enseignant depuis 12 ans, j\'ai rarement vu un guide aussi pragmatique. Les grilles d\'évaluation critériée et la méthode de préparation modulaire m\'ont fait gagner au moins 4 heures chaque week-end. Les consignes sont claires, les élèves progressent visiblement.',
    date: '14 août 2026',
    verified: true
  },
  {
    id: 'rev-02',
    productSlug: 'mieux-apprendre-ses-cours',
    author: 'Aïssatou Diallo',
    role: 'Élève',
    institution: 'Terminale D (Prépa Baccalauréat)',
    rating: 5,
    title: 'Le carnet d\'erreurs et le rappel actif ont sauvé mon année',
    comment: 'J\'avais l\'habitude de passer des nuits entières à surligner mes cours sans rien retenir le jour de l\'évaluation. En appliquant la méthode de la feuille blanche et le planning 7 jours, ma moyenne en SVT et Physique est passée de 11/20 à 16,5/20.',
    date: '09 août 2026',
    verified: true
  },
  {
    id: 'rev-03',
    productSlug: 'banque-10000-epreuves-corriges-prof',
    author: 'Alain Tchapda',
    role: 'Enseignant',
    institution: 'Professeur de Physique-Chimie (Collège & Lycée)',
    rating: 5,
    title: 'L\'accès aux 10 000 épreuves est exceptionnel',
    comment: 'La banque d\'épreuves classées par niveau et trimestre avec corrigés officiels est un outil inestimable pour tout prof. Je peux monter une interrogation de 30 minutes ou un devoir surveillé de 4 heures en un clin d\'œil.',
    date: '02 août 2026',
    verified: true
  },
  {
    id: 'rev-04',
    productSlug: 'de-la-lecon-a-l-epreuve',
    author: 'Koffi Emmanuel',
    role: 'Étudiant',
    institution: 'Faculté des Sciences & Technologies',
    rating: 5,
    title: 'La méthode des 3 passes sur les sujets types',
    comment: 'La déconstruction des barèmes et la gestion du chronomètre m\'ont permis de ne plus bloquer sur les exercices difficiles. J\'ai abordé mes partiels avec une sérénité totale.',
    date: '25 juillet 2026',
    verified: true
  },
  {
    id: 'rev-05',
    productSlug: 'didactique-pedagogie-active-classe',
    author: 'Mme Fatou Traoré',
    role: 'Enseignant',
    institution: 'Professeure de Français & Lettres Modernes',
    rating: 5,
    title: 'Climat de classe apaisé et participation active',
    comment: 'Le rituel de démarrage silencieux et le questionnement sans levée de main ont complètement transformé l\'ambiance de mes classes de 4e et 3e. Tous les élèves participent désormais.',
    date: '18 juillet 2026',
    verified: true
  },
  {
    id: 'rev-06',
    productSlug: 'fiches-planning-revision-express',
    author: 'Stéphane N.',
    role: 'Élève',
    institution: 'Candidat au BEPC',
    rating: 5,
    title: 'Plannings très bien pensés et fiches claires',
    comment: 'J\'ai imprimé le planning 30 jours et les fiches mémo. Cela m\'a permis de savoir exactement quoi réviser chaque jour sans me disperser.',
    date: '10 juillet 2026',
    verified: true
  }
];

export const getReviewsByProduct = (slug: string): Review[] => {
  return REVIEWS.filter(r => !r.productSlug || r.productSlug === slug);
};
