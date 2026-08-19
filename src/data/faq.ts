import type { FAQItem } from '../types';

export const FAQ_ITEMS: FAQItem[] = [
  // Catégorie Achat
  {
    id: 'faq-01',
    category: 'Achat',
    question: 'Comment commander une ressource sur Studykit ?',
    answer: 'Il vous suffit de sélectionner la ressource de votre choix, de cliquer sur « Acheter maintenant » ou de l\'ajouter à votre panier, puis de renseigner vos coordonnées (nom, e-mail et numéro de téléphone) lors de l\'étape de paiement sécurisé.'
  },
  {
    id: 'faq-02',
    category: 'Achat',
    question: 'Ai-je besoin de créer un compte pour acheter ?',
    answer: 'Non. Nous privilégions une expérience fluide et sans friction : aucun compte préalable n\'est requis. Votre adresse e-mail suffit pour recevoir vos accès et votre facture.'
  },
  
  // Catégorie Produits numériques
  {
    id: 'faq-03',
    category: 'Produits numériques',
    question: 'Quel est le format des ressources Studykit ?',
    answer: 'Toutes nos ressources sont livrées au format PDF haute résolution standard, lisible sur tous les appareils (PC, Mac, tablettes iPad/Android, liseuses compatibles et smartphones). Certains kits incluent également des fiches bonus imprimables au format A4.'
  },
  {
    id: 'faq-04',
    category: 'Produits numériques',
    question: 'Puis-je imprimer les ebooks et les fiches ?',
    answer: 'Oui. Le document est spécialement mis en page avec des marges soignées pour permettre une impression nette et économique en noir et blanc comme en couleur.'
  },
  {
    id: 'faq-05',
    category: 'Produits numériques',
    question: 'Les fichiers sont-ils protégés par des verrous DRMs contraignants ?',
    answer: 'Non. Nous respectons nos apprenants : vous disposez d\'un fichier libre de DRM pour votre usage personnel, que vous pouvez stocker sur tous vos appareils personnels en toute liberté.'
  },

  // Catégorie Paiement
  {
    id: 'faq-06',
    category: 'Paiement',
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer: 'Nous acceptons les paiements par Mobile Money (Wave, Orange Money, MTN MoMo, Moov Money) ainsi que par Carte Bancaire (Visa, Mastercard).'
  },
  {
    id: 'faq-07',
    category: 'Paiement',
    question: 'Le paiement est-il sécurisé ?',
    answer: 'Absolument. Toutes les transactions sont chiffrées de bout en bout via des protocoles SSL/TLS 256 bits et traitées par des passerelles de paiement certifiées PCI-DSS.'
  },

  // Catégorie Accès aux produits
  {
    id: 'faq-08',
    category: 'Accès aux produits',
    question: 'Quand et comment vais-je recevoir ma ressource ?',
    answer: 'L\'accès est instantané. Dès la validation du paiement, vous êtes redirigé vers une page de confirmation avec un bouton de téléchargement immédiat et une liseuse intégrée. Un e-mail de confirmation contenant votre lien permanent vous est également envoyé.'
  },
  {
    id: 'faq-09',
    category: 'Accès aux produits',
    question: 'Que faire si je perds mon lien de téléchargement ?',
    answer: 'Aucun problème : contactez simplement notre support avec l\'adresse e-mail utilisée lors de votre achat ou votre numéro de commande, et nous vous réenverrons vos accès sous 24h.'
  },

  // Catégorie Remboursement
  {
    id: 'faq-10',
    category: 'Remboursement',
    question: 'Quelle est la politique de garantie et de remboursement ?',
    answer: 'Si un problème technique survient lors du téléchargement ou si le fichier présente une anomalie avérée, notre équipe technique intervient sous 24h pour vous fournir un accès fonctionnel ou procéder à un remboursement intégral.'
  }
];
