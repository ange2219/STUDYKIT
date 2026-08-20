import type { Product, TargetAudience } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // RAYON ENSEIGNANTS / PROFESSEURS
  // ==========================================
  {
    id: 'kit-p01',
    kitNumber: 'KIT PROF 01',
    title: 'Le Guide Pratique de Préparation de Cours & Évaluations',
    slug: 'guide-preparation-cours-evaluations-prof',
    category: 'Pédagogie & Enseignement',
    targetAudience: 'prof',
    audienceLabel: 'Spécial Enseignant',
    targetLevel: 'Collège, Lycée & Supérieur',
    subject: 'Didactique & Ingénierie de cours',
    tagline: 'Concevez des cours captivants et des évaluations fiables en divisant par 2 votre temps de préparation.',
    description: 'Une méthode pas-à-pas pour structurer vos séquences, formuler des objectifs pédagogiques précis et créer des barèmes critériés équitables.',
    fullDescription: 'Destiné aux enseignants de collège, lycée et formateurs souhaitant optimiser la charge de travail hebdomadaire tout en élevant le niveau de leurs cours. Ce guide pratique vous fournit des matrices éprouvées pour bâtir des fiches de préparation en 20 minutes, équilibrer vos évaluations sommatives et automatiser la correction constructive.',
    price: 2500,
    originalPrice: 4500,
    currency: 'FCFA',
    rating: 4.9,
    reviewsCount: 142,
    status: 'available',
    badge: 'Bestseller Profs',
    format: 'Ebook PDF interactif (92 pages A4 + Fiches & Grilles éditables)',
    access: 'Téléchargement direct et immédiat après confirmation',
    downloadFileName: 'Studykit-KITP01-Preparation-Cours-Evaluations.pdf',
    coverTheme: {
      accentColor: '#1677FF',
      darkColor: '#0F172A',
      lightColor: '#FFFFFF',
      pattern: 'grid-lines'
    },
    methods: [
      'Ingénierie de séquence pédagogique',
      'Taxonomie d\'objectifs opérationnels',
      'Création de barèmes critériés',
      'Différenciation pédagogique express',
      'Modèles de fiches de cours prêtes à l\'emploi'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Planification de séquences fluide',
        description: 'Construisez une séquence complète en 4 étapes claires, de la situation-problème introductive au bilan d\'évaluation.'
      },
      {
        number: '02',
        title: 'Évaluations fiables et sans contestation',
        description: 'Rédigez des barèmes transparents qui réduisent de moitié les questions des élèves et le temps passé à corriger.'
      },
      {
        number: '03',
        title: 'Gestion de l\'hétérogénéité',
        description: 'Intégrez facilement des parcours à deux vitesses pour soutenir les élèves fragiles sans ralentir les plus avancés.'
      }
    ],
    includedItems: [
      'Guide pédagogique complet de 92 pages (PDF haute fidélité)',
      '12 modèles de fiches de préparation de cours prêtes à remplir',
      'Grille universelle d\'évaluation critériée (format Word & PDF)',
      'Matrice de progression annuelle et de découpage semestriel',
      'Guide de formulation des consignes non équivoques'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'INGÉNIERIE',
        title: 'La règle des 3 tiers de la préparation',
        subtitle: 'Comment préparer 2 heures de cours magistral en moins de 30 minutes',
        summary: 'La méthode d\'architecture modulaire pour standardiser ses fiches de préparation sans perdre en créativité.',
        keyPoints: [
          'Définir le point d\'arrivée avant le point de départ',
          'Structurer la capsule notionnelle (max 15 min)',
          'Anticiper les 3 blocages majeurs des élèves'
        ],
        snippet: 'Le piège classique de l\'enseignant est de concevoir son cours comme un texte continu. Une séance efficace s\'articule autour de 3 blocs chronométrés : activation des prérequis (10 min), transmission notionnelle ciblée (20 min) et mise en activité autonome guidée (25 min).'
      },
      {
        pageNumber: 24,
        chapter: 'ÉVALUATION',
        title: 'Le barème critérié transparent',
        subtitle: 'Éliminer le flou artistique dans la notation des devoirs et compositions',
        summary: 'Construire une grille critériée à 4 niveaux d\'acquisition compréhensible par les élèves et les parents.',
        keyPoints: [
          'Les 4 critères fondamentaux (Compréhension, Raisonnement, Rédaction, Précision)',
          'Attribuer les points par palier d\'acquisition',
          'Faciliter la remédiation après le devoir'
        ],
        snippet: 'Une mauvaise note sans grille critériée génère de la frustration. Lorsque l\'élève sait exactement combien de points sont alloués à la démarche logique versus le résultat chiffré, l\'évaluation devient un levier pédagogique puissant.'
      }
    ],
    faq: [
      {
        question: 'Ce guide est-il adapté à toutes les matières ?',
        answer: 'Oui, les principes d\'ingénierie pédagogique, de gestion du temps et de conception d\'évaluations s\'appliquent aussi bien aux matières scientifiques qu\'aux lettres, sciences humaines et techniques.'
      },
      {
        question: 'Les fiches de préparation sont-elles modifiables ?',
        answer: 'Absolument. Vous recevez le guide PDF ainsi que les modèles au format texte interactif prêt à être personnalisé pour vos propres classes.'
      }
    ],
    relatedSlugs: ['banque-10000-epreuves-corriges-prof', 'didactique-pedagogie-active-classe', 'pack-integral-enseignant-excellence']
  },
  {
    id: 'kit-p02',
    kitNumber: 'KIT PROF 02',
    title: 'Banque Pédagogique : +10 000 Épreuves, Devoirs & Corrigés Types',
    slug: 'banque-10000-epreuves-corriges-prof',
    category: 'Banques d\'Épreuves & Corrigés',
    targetAudience: 'prof',
    audienceLabel: 'Spécial Enseignant & École',
    targetLevel: 'De la 6e à la Terminale',
    subject: 'Banque de Sujets & Devoirs Officiels',
    tagline: 'L\'archive géante de sujets, interrogations, devoirs surveillés et examens blancs classés avec corrigés détaillés.',
    description: 'Ne perdez plus des heures à inventer des sujets. Accédez à une base monumentale d\'épreuves officielles et devoirs classés par classe, matière et trimestre.',
    fullDescription: 'Le kit indispensable pour les professeurs et collèges. Plus de 10 000 sujets récents avec leurs corrigés détaillés et barèmes, couvrant Mathématiques, Physique-Chimie, SVT, Français, Histoire-Géo, Anglais et Philosophie de la classe de 6e jusqu\'à la Terminale (séries A, C, D, E, TI).',
    price: 5000,
    originalPrice: 8500,
    currency: 'FCFA',
    rating: 5.0,
    reviewsCount: 218,
    status: 'available',
    badge: 'Archive Ultime',
    format: 'Ebook Guide d\'exploitation (68 pages) + Accès Cloud & Dossiers PDF classés (+10 000 fichiers)',
    access: 'Accès immédiat et téléchargement complet après paiement',
    downloadFileName: 'Studykit-KITP02-Banque-10000-Epreuves-Guide.pdf',
    coverTheme: {
      accentColor: '#10B981',
      darkColor: '#064E3B',
      lightColor: '#FFFFFF',
      pattern: 'diagonal-stripes'
    },
    methods: [
      'Indexation par niveau (6e à Terminale)',
      'Classement par trimestre, devoirs et examens',
      'Corrigés types et barèmes ministériels',
      'Guide de remixage de sujets pour devoirs surveillés'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Gain de temps immédiat',
        description: 'Trouvez en 30 secondes un devoir surveillé complet de niveau adapté avec son corrigé officiel.'
      },
      {
        number: '02',
        title: 'Calibrer le niveau d\'exigence',
        description: 'Comparez vos épreuves aux standards des meilleurs établissements et examens nationaux.'
      },
      {
        number: '03',
        title: 'Constituer des banques de remédiation',
        description: 'Extrayez des exercices ciblés pour les devoirs de vacances ou les séances d\'entraînement.'
      }
    ],
    includedItems: [
      'Guide méthodologique d\'exploitation pédagogique des épreuves (PDF 68 pages)',
      'Accès complet à la base de données de +10 000 sujets organisés par dossiers',
      'Fiches de corrigés détaillés avec barèmes de notation',
      'Index de recherche rapide par mot-clé et notion de programme'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'ORGANISATION',
        title: 'L\'arborescence de la banque d\'épreuves',
        subtitle: 'Comment naviguer et sélectionner rapidement les sujets par niveau',
        summary: 'Guide d\'accès rapide aux dossiers de sujets classés par série, matière et type d\'évaluation.',
        keyPoints: [
          'Dossiers par niveau : 6e, 5e, 4e, 3e, 2nde, 1ère, Terminale',
          'Interrogations courtes (30 min) vs Devoirs surveillés (2h à 4h)',
          'Sujets zéro et annales d\'examens officiels (BEPC, Probatoire, BAC)'
        ],
        snippet: 'Chaque épreuve est cataloguée avec son niveau de difficulté, la durée conseillée et le corrigé associé. Les enseignants peuvent réutiliser les sujets tels quels ou mixer les exercices pour créer des devoirs inédits.'
      }
    ],
    faq: [
      {
        question: 'Comment télécharge-t-on les 10 000 épreuves ?',
        answer: 'Vous recevez un lien d\'accès cloud direct et sécurisé pour télécharger l\'intégralité des dossiers organisés ou télécharger uniquement les matières et niveaux qui vous intéressent.'
      },
      {
        question: 'Les corrigés sont-ils inclus ?',
        answer: 'Oui, la grande majorité des épreuves et tous les sujets d\'examens officiels sont accompagnés de leurs corrigés types détaillés.'
      }
    ],
    relatedSlugs: ['guide-preparation-cours-evaluations-prof', 'didactique-pedagogie-active-classe', 'pack-integral-enseignant-excellence']
  },
  {
    id: 'kit-p03',
    kitNumber: 'KIT PROF 03',
    title: 'Didactique & Pédagogie Active : Captiver et Faire Réussir sa Classe',
    slug: 'didactique-pedagogie-active-classe',
    category: 'Pédagogie & Enseignement',
    targetAudience: 'prof',
    audienceLabel: 'Spécial Enseignant',
    targetLevel: 'Tous niveaux scolaires',
    subject: 'Pédagogie & Climat de classe',
    tagline: 'Les techniques concrètes pour engager les élèves passifs, maintenir le calme et créer une dynamique de succès.',
    description: 'Transformez vos heures de cours en moments dynamiques grâce à des protocoles de mise en activité, de travail en sous-groupes et de rituels d\'attention.',
    fullDescription: 'Faire face à une classe agitée ou apathique est l\'un des défis majeurs de l\'enseignement. Cet ebook vous apporte des réponses pratiques : comment instaurer des règles claires dès la 1ère minute, relancer l\'attention après 30 minutes et faire participer 100% des élèves sans hausser la voix.',
    price: 3500,
    currency: 'FCFA',
    rating: 4.8,
    reviewsCount: 96,
    status: 'available',
    badge: 'Guide Pratique',
    format: 'Ebook PDF (76 pages A4 + Protocoles de gestion de classe)',
    access: 'Téléchargement direct et immédiat après confirmation',
    downloadFileName: 'Studykit-KITP03-Didactique-Pedagogie-Active.pdf',
    coverTheme: {
      accentColor: '#8B5CF6',
      darkColor: '#2E1065',
      lightColor: '#FFFFFF',
      pattern: 'dots'
    },
    methods: [
      'Rituels d\'entrée et de sortie de classe',
      'Techniques de questionnement sans lever de main',
      'Travail en binômes à fort rendement',
      'Gestion bienveillante des comportements perturbateurs'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Capter l\'attention dès la sonnerie',
        description: 'Le rituel de démarrage silencieux qui pose le calme en 120 secondes chrono.'
      },
      {
        number: '02',
        title: 'Mobiliser les élèves passifs',
        description: 'La technique du « Pensez - Échangez - Partagez » pour faire réfléchir toute la classe.'
      }
    ],
    includedItems: [
      'Ebook didactique de 76 pages (PDF couleur & impression)',
      '10 fiches de rituels de classe prêts à tester le lendemain',
      'Tableau de bord de suivi de participation des élèves',
      'Guide de communication non violente avec les élèves difficiles'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'DYNAMIQUE',
        title: 'Le piège du cours dialogué avec les 3 mêmes élèves',
        subtitle: 'Pourquoi interroger les élèves qui lèvent la main endort le reste de la classe',
        summary: 'Comment utiliser l\'appel aléatoire bienveillant et les ardoises/brouillons pour engager l\'ensemble de l\'auditoire.',
        keyPoints: [
          'Le temps de latence obligatoire de 5 secondes après chaque question',
          'Le réflexe de la trace écrite personnelle avant la prise de parole',
          'Créer un climat d\'erreur dédramatisée'
        ],
        snippet: 'Lorsque vous posez une question et donnez la parole au premier doigt levé, les 35 autres cerveaux se déconnectent instantanément. Pour maintenir l\'engagement, chaque question doit d\'abord exiger une réponse écrite sur le cahier de brouillon avant tout échange oral.'
      }
    ],
    faq: [
      {
        question: 'Ces techniques marchent-elles avec des classes très chargées ?',
        answer: 'Oui, les protocoles ont été spécialement testés et calibrés pour des effectifs de 40 à 70 élèves par classe.'
      }
    ],
    relatedSlugs: ['guide-preparation-cours-evaluations-prof', 'banque-10000-epreuves-corriges-prof', 'kit-cle-en-main-professeur-principal']
  },
  {
    id: 'kit-p04',
    kitNumber: 'KIT PROF 04',
    title: 'Le Kit Clé en Main du Professeur Principal',
    slug: 'kit-cle-en-main-professeur-principal',
    category: 'Pédagogie & Enseignement',
    targetAudience: 'prof',
    audienceLabel: 'Spécial Enseignant',
    targetLevel: 'Collège & Lycée',
    subject: 'Suivi pédagogique & Orientation',
    tagline: 'Organisez vos conseils de classe, entretiens parents et suivi individuel des élèves avec sérénité.',
    description: 'Tous les formulaires, fiches de suivi, tableaux de bord de notes et trames d\'entretiens dont un professeur principal a besoin durant l\'année.',
    fullDescription: 'Être professeur principal demande une organisation sans faille. Ce kit vous offre toutes les grilles de bilan trimestriel, modèles d\'avis d\'orientation, guides de conduite de conseil de classe et fiches de médiation parents-élèves prêtes à l\'emploi.',
    price: 2000,
    currency: 'FCFA',
    rating: 4.9,
    reviewsCount: 75,
    status: 'available',
    format: 'Ebook & Kit d\'outils imprimables (52 pages)',
    access: 'Téléchargement direct et immédiat',
    downloadFileName: 'Studykit-KITP04-Professeur-Principal.pdf',
    coverTheme: {
      accentColor: '#0284C7',
      darkColor: '#082F49',
      lightColor: '#FFFFFF',
      pattern: 'lines'
    },
    methods: [
      'Trame de synthèse de conseil de classe',
      'Fiche de suivi de l\'élève en décrochage',
      'Guide d\'entretien individuel d\'orientation',
      'Matrice de calcul de moyenne pondérée'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Conseils de classe fluides',
        description: 'Menez des réunions constructives qui durent moins de 45 minutes par classe.'
      },
      {
        number: '02',
        title: 'Entretiens parents sereins',
        description: 'Appuyez-vous sur des données factuelles pour désamorcer les conflits et trouver des solutions.'
      }
    ],
    includedItems: [
      'Ebook méthodologique de 52 pages',
      'Fiche de synthèse individuelle par élève pour le conseil',
      'Modèle de fiche d\'objectifs personnalisée élève',
      'Trame d\'entretien d\'orientation post-3e et post-Terminale'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'MÉTHODOLOGIE',
        title: 'La synthèse en 3 indicateurs clés',
        subtitle: 'Présenter le profil d\'un élève en 90 secondes lors du conseil de classe',
        summary: 'Comment résumer le travail, l\'attitude et la dynamique d\'un élève de manière objective et bienveillante.',
        keyPoints: [
          'Éviter les jugements à l\'emporte-pièce',
          'Formuler une appréciation globale stimulante',
          'Fixer un contrat d\'objectifs pour le trimestre suivant'
        ],
        snippet: 'Le rôle du professeur principal au conseil n\'est pas de répéter les moyennes de chaque matière, mais de dégager la trajectoire de l\'élève : est-il en progression, en stagnation ou en découragement ?'
      }
    ],
    faq: [
      {
        question: 'Les documents sont-ils imprimables ?',
        answer: 'Oui, calibrés en A4 pour une impression directe et remplissage à la main ou numérique.'
      }
    ],
    relatedSlugs: ['guide-preparation-cours-evaluations-prof', 'pack-integral-enseignant-excellence']
  },

  // ==========================================
  // RAYON ÉLÈVES & ÉTUDIANTS / CANDIDATS EXAMENS
  // ==========================================
  {
    id: 'kit-e01',
    kitNumber: 'KIT ÉLÈVE 01',
    title: 'Mieux Apprendre Ses Cours & Mémoriser Efficacement',
    slug: 'mieux-apprendre-ses-cours',
    chariowUrl: 'https://fykldcqv.mychariow.co/prd_53pcfeeg/checkout',
    category: 'Méthodes d\'Apprentissage',
    targetAudience: 'eleve',
    audienceLabel: 'Spécial Élève & Étudiant',
    targetLevel: 'Collège, Lycée & Université',
    subject: 'Méthodologie & Sciences de la mémoire',
    tagline: 'Le guide pratique pour mieux mémoriser, pratiquer et préparer vos examens sans bachoter.',
    description: 'Découvrez des méthodes simples et scientifiques pour retenir vos cours durablement, débloquer les exercices et aborder vos devoirs sans stress.',
    fullDescription: 'Conçu pour les élèves et étudiants qui passent des heures à relire leurs cours sans retenir durablement. Ce guide condensé et ultra-pratique vous donne la méthode exacte pour structurer vos séances d\'étude, comprendre en profondeur et mémoriser sur le long terme.',
    price: 3000,
    originalPrice: 8000,
    currency: 'FCFA',
    rating: 4.9,
    reviewsCount: 184,
    status: 'available',
    badge: 'Coup de Cœur Élèves',
    format: 'Ebook PDF interactif (84 pages A4 + Fiches bonus imprimables)',
    access: 'Téléchargement direct et immédiat après confirmation',
    downloadFileName: 'Studykit-KITE01-Mieux-Apprendre-Ses-Cours.pdf',
    coverTheme: {
      accentColor: '#1677FF',
      darkColor: '#111111',
      lightColor: '#FFFFFF',
      pattern: 'grid-lines'
    },
    methods: [
      'Rappel actif (Active Recall)',
      'Répétition espacée (Spaced Repetition)',
      'Pratique délibérée (Deliberate Practice)',
      'Pratique entrelacée (Interleaving)',
      'Exploitation stratégique des épreuves',
      'Planning de révision 7 jours',
      'Fiches de travail & Carnet d\'erreurs'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Rappel actif',
        description: 'Abandonnez la relecture passive stérile. Forcez votre cerveau à restituer l\'information pour bâtir une mémoire solide.'
      },
      {
        number: '02',
        title: 'Répétition espacée',
        description: 'Battez la courbe de l\'oubli en espaçant vos sessions de révision selon des intervalles calculés.'
      },
      {
        number: '03',
        title: 'Pratique ciblée',
        description: 'Ciblez précisément vos zones de blocage plutôt que de refaire les exercices faciles.'
      },
      {
        number: '04',
        title: 'Pratique entrelacée',
        description: 'Mélangez différents types d\'exercices pour savoir identifier la bonne formule le jour de l\'examen.'
      }
    ],
    includedItems: [
      'Guide méthodologique complet de 84 pages (PDF haute fidélité)',
      'Tableau synthétique des 5 piliers de l\'apprentissage efficace',
      'Modèle de Planning de Révision 7 jours (prêt à imprimer ou remplir)',
      'Fiche de travail guidée pour chaque séance d\'étude autonome',
      'Checklist complète de vérification 48h avant l\'examen',
      'Modèle de Carnet d\'Erreurs pour capitaliser sur chaque faute'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'INTRODUCTION',
        title: 'Le piège de l\'illusion de compétence',
        subtitle: 'Pourquoi relire et surligner vous donne l\'impression de savoir sans rien retenir',
        summary: 'Comprendre pourquoi les méthodes traditionnelles échouent et comment réaligner votre cerveau sur l\'effort mémoriel productif.',
        keyPoints: [
          'La relecture passive n\'active pas la mémoire de long terme',
          'La familiarité visuelle n\'est pas la maîtrise conceptuelle',
          'La difficulté désirable : pourquoi un effort cognitif modéré garantit la rétention'
        ],
        snippet: 'Lorsque vous relisez vos notes plusieurs fois, le texte devient fluide et familier. Votre cerveau interprète cette aisance visuelle comme un signe de maîtrise. Pourtant, le jour de l\'examen devant une feuille blanche, l\'information est introuvable. C\'est l\'illusion de compétence. Pour retenir, vous devez cesser d\'absorber et commencer à restituer.'
      },
      {
        pageNumber: 14,
        chapter: 'MÉTHODE 01',
        title: 'Le Rappel Actif en pratique',
        subtitle: 'Comment transformer n\'importe quel cours en système d\'auto-évaluation',
        summary: 'Protocole concret pour fermer vos notes et extraire activement les concepts clés sans aide extérieure.',
        keyPoints: [
          'La technique de la feuille blanche (Brain Dump structuré)',
          'La méthode des questions inversées en marge du cours',
          'Mesurer votre taux de restitution avec précision'
        ],
        snippet: 'Le rappel actif consiste à tester votre mémoire sans regarder la réponse. Après chaque page lue, fermez le document et notez sur une feuille vierge les concepts clés, formules ou mécanismes.'
      },
      {
        pageNumber: 28,
        chapter: 'MÉTHODE 02',
        title: 'La Répétition Espacée',
        subtitle: 'Le calendrier exact des révisions pour contrer la courbe d\'Ebbinghaus',
        summary: 'Comment planifier vos révisions à J+1, J+3, J+7 et J+21 pour verrouiller vos cours jusqu\'à l\'examen final.',
        keyPoints: [
          'Comprendre le moment optimal de révision (juste avant l\'oubli)',
          'Tableau de planification hebdomadaire prêt à l\'emploi',
          'Comment gérer le volume de cours sans surcharge'
        ],
        snippet: 'Chaque fois que vous réactivez une information au moment où elle s\'apprête à disparaître, la vitesse de dégradation ralentit. En 4 réactivations espacées de 15 minutes, vous retenez davantage qu\'en 6 heures de bachotage continu la veille de l\'examen.'
      },
      {
        pageNumber: 52,
        chapter: 'OUTIL BONUS',
        title: 'Le Carnet d\'Erreurs Stratégique',
        subtitle: 'Le protocole pour ne plus jamais faire deux fois la même erreur',
        summary: 'Une fiche méthodique pour catégoriser chaque faute et créer une routine de progression.',
        keyPoints: [
          'Classification en 3 types d\'erreurs',
          'La règle de re-test à 48 heures',
          'Construire votre fiche réflexe avant l\'épreuve'
        ],
        snippet: 'Une erreur non documentée est une erreur garantie d\'être reproduite le jour de l\'examen. Le carnet d\'erreurs isole la cause racine : est-ce une méconnaissance de la règle ou une faille de calcul ?'
      }
    ],
    faq: [
      {
        question: 'Quel est le format du produit ?',
        answer: 'Le guide est au format PDF haute définition, parfaitement lisible sur smartphone, tablette et ordinateur, avec des fiches prêtes à imprimer.'
      },
      {
        question: 'Quand vais-je recevoir mon ebook ?',
        answer: 'L\'accès est instantané. Dès la confirmation de votre commande, le lien de téléchargement direct s\'affiche à l\'écran et vous est envoyé par e-mail.'
      }
    ],
    relatedSlugs: ['de-la-lecon-a-l-epreuve', 'fiches-planning-revision-express', 'guide-repetition-espacee-flashcards']
  },
  {
    id: 'kit-e02',
    kitNumber: 'KIT ÉLÈVE 02',
    title: 'De la Leçon à l\'Épreuve : La Méthode d\'Examen Gagnante',
    slug: 'de-la-lecon-a-l-epreuve',
    category: 'Examens & Concours',
    targetAudience: 'eleve',
    audienceLabel: 'Spécial Candidat Examens',
    targetLevel: 'BEPC, Probatoire, BAC & Concours',
    subject: 'Préparation intensive aux épreuves',
    tagline: 'Comment déconstruire les sujets d\'examen et s\'entraîner sous contrainte de temps pour maximiser ses points.',
    description: 'La méthode stratégique pour déjouer les pièges des correcteurs, gérer son temps d\'épreuve et transformer chaque annale en garantie de succès.',
    fullDescription: 'Faire des exercices sans méthode ne garantit pas la mention. Cet ebook vous enseigne comment analyser les barèmes, déceler les questions à fort coefficient, gérer votre stress et rédiger des copies qui plaisent aux correcteurs le jour J.',
    price: 3500,
    originalPrice: 5000,
    currency: 'FCFA',
    rating: 5.0,
    reviewsCount: 112,
    status: 'available',
    badge: 'Indispensable Examen',
    format: 'Ebook PDF (72 pages) + Kit de simulation d\'épreuves chronométrées',
    access: 'Téléchargement direct et immédiat',
    downloadFileName: 'Studykit-KITE02-Pratiquer-Avec-Les-Epreuves.pdf',
    coverTheme: {
      accentColor: '#F59E0B',
      darkColor: '#1E1B4B',
      lightColor: '#FFFFFF',
      pattern: 'diagonal-stripes'
    },
    methods: [
      'Analyse stratégique de sujets types',
      'Simulation d\'épreuves chronométrées',
      'La règle des 3 tiers du temps d\'épreuve',
      'Rédaction de copies percutantes'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Comprendre les attentes des correcteurs',
        description: 'Repérez immédiatement les mots-clés et justifications qui rapportent les points au barème.'
      },
      {
        number: '02',
        title: 'Gestion impériale du temps',
        description: 'Ne plus jamais laisser d\'exercice non traité par manque de temps en fin d\'épreuve.'
      }
    ],
    includedItems: [
      'Guide méthodologique d\'exploitation des épreuves (72 pages)',
      'Grille d\'auto-évaluation des devoirs surveillés',
      'Tableau de bord de suivi des scores et temps de résolution',
      'Checklist de relecture anti-fautes d\'étourderie'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'STRATÉGIE',
        title: 'L\'analyse en 3 passes du sujet',
        subtitle: 'Les 10 premières minutes qui déterminent 80% de votre note finale',
        summary: 'Protocole de lecture active du sujet le jour de l\'épreuve.',
        keyPoints: [
          'Passe 1 : Repérage global et points faciles garantis',
          'Passe 2 : Résolution méthodique sans blocage',
          'Passe 3 : Traitement des questions complexes et relecture ciblée'
        ],
        snippet: 'Le premier réflexe d\'un candidat moyen est de se précipiter sur l\'exercice 1 la tête baissée. Les majors d\'examen prennent 8 minutes pour survoler l\'épreuve, hiérarchiser les exercices par rentabilité et sécuriser les points les plus accessibles.'
      }
    ],
    faq: [
      {
        question: 'Est-ce utile pour le BAC et le BEPC ?',
        answer: 'Absolument, la méthodologie de gestion du temps, d\'analyse des consignes et de rédaction est universelle pour tous les examens officiels et concours.'
      }
    ],
    relatedSlugs: ['mieux-apprendre-ses-cours', 'fiches-planning-revision-express', 'pack-reussite-totale-examens']
  },
  {
    id: 'kit-e03',
    kitNumber: 'KIT ÉLÈVE 03',
    title: 'Fiches & Planning de Révision Express (J-30)',
    slug: 'fiches-planning-revision-express',
    category: 'Mémorisation & Révisions',
    targetAudience: 'eleve',
    audienceLabel: 'Spécial Révision Express',
    targetLevel: 'Collège & Lycée',
    subject: 'Organisation & Rétro-planning',
    tagline: 'Le système d\'organisation d\'urgence pour structurer vos 4 semaines clés avant les examens.',
    description: 'Templates prêts à l\'emploi, matrices de priorisation des matières, blocs d\'étude chronométrés et suivi visuel de maîtrise du programme.',
    fullDescription: 'Quand le compte à rebours est lancé, l\'improvisation mène à la panique. Ce kit d\'organisation vous fournit la méthode exacte pour découper votre programme jour par jour, éliminer la procrastination et arriver prêt le jour de l\'épreuve.',
    price: 1500,
    originalPrice: 2500,
    currency: 'FCFA',
    rating: 4.9,
    reviewsCount: 136,
    status: 'available',
    format: 'Ebook & Kit de fiches imprimables (48 pages)',
    access: 'Téléchargement direct et immédiat',
    downloadFileName: 'Studykit-KITE03-Planning-Revision-Express.pdf',
    coverTheme: {
      accentColor: '#EC4899',
      darkColor: '#831843',
      lightColor: '#FFFFFF',
      pattern: 'lines'
    },
    methods: [
      'Matrice d\'impact des coefficients',
      'Planning par blocs d\'énergie (25 min / 50 min)',
      'Fiches de synthèse express à 3 volets',
      'Tableau de bord de couverture du programme'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Prioriser par rentabilité',
        description: 'Concentrez 80% de votre temps sur les 20% de notions qui rapportent 80% des points.'
      },
      {
        number: '02',
        title: 'Éliminer la procrastination',
        description: 'Des sessions courtes et intenses qui maintiennent une concentration maximale.'
      }
    ],
    includedItems: [
      'Guide d\'organisation express de 48 pages',
      'Planning mural 30 jours au format A3 et A4 prêt à imprimer',
      'Fiche de suivi de progression par matière',
      'Matrice de calcul du temps de révision restant'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'ORGANISATION',
        title: 'La méthode de rétro-planning',
        subtitle: 'Calculer ses révisions à partir du jour J en intégrant les imprévus',
        summary: 'Comment construire un calendrier de révision réaliste qui résiste à la fatigue.',
        keyPoints: [
          'La règle des 20% de temps tampon pour les imprévus',
          'Prioriser les chapitres à fort coefficient',
          'La routine des 3 dernières heures avant le sommeil'
        ],
        snippet: 'Un bon planning de révision n\'est pas un calendrier parfait où tout se passe sans accroc. C\'est un système flexible qui absorbe la fatigue sans vous décourager.'
      }
    ],
    faq: [
      {
        question: 'Puis-je remplir les plannings sur mon téléphone ?',
        answer: 'Oui, les formulaires PDF sont interactifs : vous pouvez les cocher et les remplir directement sur écran ou les imprimer.'
      }
    ],
    relatedSlugs: ['mieux-apprendre-ses-cours', 'guide-repetition-espacee-flashcards', 'pack-reussite-totale-examens']
  },
  {
    id: 'kit-e04',
    kitNumber: 'KIT ÉLÈVE 04',
    title: 'Le Guide des Flashcards & Cartes Mémoire Scientifiques',
    slug: 'guide-repetition-espacee-flashcards',
    category: 'Mémorisation & Révisions',
    targetAudience: 'eleve',
    audienceLabel: 'Spécial Mémorisation',
    targetLevel: 'Tous niveaux',
    subject: 'Mémorisation durable & Cartes mémo',
    tagline: 'Maîtrisez la création de cartes mémoire percutantes et la courbe de l\'oubli pour vos examens.',
    description: 'Comment concevoir des flashcards qui fonctionnent réellement, configurer vos boîtes de révision et mémoriser 500+ définitions sans surcharge.',
    fullDescription: 'Les flashcards mal conçues créent de la confusion et font perdre du temps. Ce guide pratique vous montre les principes stricts d\'atomisation des connaissances pour mémoriser définitions, formules et dates avec une efficacité redoutable.',
    price: 2000,
    originalPrice: 3500,
    currency: 'FCFA',
    rating: 4.8,
    reviewsCount: 88,
    status: 'available',
    format: 'Ebook PDF (56 pages A4 + Templates de cartes imprimables)',
    access: 'Téléchargement direct et immédiat',
    downloadFileName: 'Studykit-KITE04-Repetition-Espacee-Flashcards.pdf',
    coverTheme: {
      accentColor: '#6366F1',
      darkColor: '#1E1B4B',
      lightColor: '#FFFFFF',
      pattern: 'dots'
    },
    methods: [
      'Principe d\'information minimale (Minimum Information Principle)',
      'Encodage mémoriel dual (texte + schéma)',
      'Algorithme de révision de Leitner (5 boîtes)',
      'Templates de flashcards recto/verso prêts à découper'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Atomiser le savoir',
        description: 'Une seule question univoque par carte pour une restitution instantanée.'
      },
      {
        number: '02',
        title: 'Routine de 15 minutes par jour',
        description: 'Intégrez la révision quotidienne dans votre emploi du temps sans friction.'
      }
    ],
    includedItems: [
      'Guide complet de 56 pages sur la mémorisation durable',
      '30 modèles de flashcards types pour toutes les matières',
      'Guide de fabrication de boîtes physiques de Leitner',
      'Tutoriel de prise en main des applications numériques gratuites'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'PRINCIPES',
        title: 'La règle de l\'information minimale',
        subtitle: 'Pourquoi une carte trop chargée détruit l\'efficacité de la mémorisation',
        summary: 'Démonstration comparative entre une mauvaise flashcard et 3 cartes atomiques redoutablement efficaces.',
        keyPoints: [
          'La surcharge cognitive lors de la réactivation',
          'Isoler la cause et la conséquence',
          'Le format question courte / réponse univoque'
        ],
        snippet: 'Si une carte demande plus de 10 secondes pour être lue et répondue, elle est trop longue. Divisez-la immédiatement en plusieurs sous-questions précises.'
      }
    ],
    faq: [
      {
        question: 'Faut-il utiliser une application ou du papier ?',
        answer: 'Le guide couvre les deux approches : le système de boîtes physiques pour ceux qui aiment le papier, et les outils numériques pour réviser partout sur smartphone.'
      }
    ],
    relatedSlugs: ['mieux-apprendre-ses-cours', 'fiches-planning-revision-express', 'pack-reussite-totale-examens']
  },

  // ==========================================
  // RAYON PACKS & BUNDLES ÉCONOMIQUES
  // ==========================================
  {
    id: 'pack-prof-integral',
    kitNumber: 'PACK PRO',
    title: 'Pack Intégral Enseignant d\'Excellence (4 Guides + 10 000 Épreuves)',
    slug: 'pack-integral-enseignant-excellence',
    category: 'Packs & Bundles',
    targetAudience: 'prof',
    audienceLabel: 'Pack Tout-en-Un Prof',
    targetLevel: 'Collège, Lycée & Supérieur',
    subject: 'Collection Complète Pédagogie & Épreuves',
    tagline: 'L\'arsenal pédagogique ultime pour l\'enseignant : préparez vos cours, maîtrisez votre classe et disposez de 10 000 épreuves corrigées.',
    description: 'Bénéficiez de tous les guides enseignants Studykit et de la banque monumentale d\'épreuves à tarif très préférentiel.',
    fullDescription: 'Le Pack Enseignant d\'Excellence réunit l\'ensemble de nos ressources dédiées aux professeurs : le Guide de Préparation de Cours, la Banque de +10 000 Épreuves et Corrigés, le Guide de Didactique & Pédagogie Active, et le Kit du Professeur Principal. Une économie substantielle pour vous équiper pour toute votre carrière.',
    price: 9900,
    originalPrice: 13000,
    currency: 'FCFA',
    rating: 5.0,
    reviewsCount: 84,
    status: 'available',
    badge: 'Pack Économique -25%',
    isBundle: true,
    bundleItemsCount: 4,
    format: '4 Ebooks PDF Complets + Accès Cloud Intégral (+10 000 fichiers)',
    access: 'Téléchargement direct et immédiat de tous les fichiers',
    downloadFileName: 'Studykit-PACK-Enseignant-Excellence.zip',
    coverTheme: {
      accentColor: '#1677FF',
      darkColor: '#0A0F1D',
      lightColor: '#FFFFFF',
      pattern: 'grid-lines'
    },
    methods: [
      'Ingénierie complète de préparation de cours',
      'Accès permanent aux 10 000 sujets & corrigés',
      'Protocoles de didactique et climat de classe',
      'Outils complets de professeur principal'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Un équipement pédagogique total',
        description: 'Toutes les méthodologies, modèles et banques de sujets réunis en un seul téléchargement.'
      },
      {
        number: '02',
        title: 'Économie immédiate',
        description: 'Plus de 3 000 FCFA d\'économie par rapport à l\'achat individuel des 4 ressources.'
      }
    ],
    includedItems: [
      'KIT PROF 01 : Guide Pratique de Préparation de Cours & Évaluations (92 pages)',
      'KIT PROF 02 : Banque Pédagogique de +10 000 Épreuves & Corrigés Types',
      'KIT PROF 03 : Didactique & Pédagogie Active : Captiver sa Classe (76 pages)',
      'KIT PROF 04 : Le Kit Clé en Main du Professeur Principal (52 pages)',
      'Toutes les fiches et formulaires éditables (Word & PDF)'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'PACK COMPLET',
        title: 'L\'arsenal complet de l\'enseignant moderne',
        subtitle: 'Une vue d\'ensemble de toutes les méthodes et outils fournis dans ce pack',
        summary: 'Présentation des 4 guides interconnectés pour optimiser chaque dimension de votre métier.',
        keyPoints: [
          'Gagner 5 heures par semaine sur la préparation et les devoirs',
          'Disposer d\'une bibliothèque inépuisable d\'exercices et sujets types',
          'Instaurer une autorité bienveillante et motiver vos classes'
        ],
        snippet: 'En combinant nos 4 guides pédagogiques avec la banque d\'épreuves, vous disposez d\'un écosystème de travail complet pour enseigner avec plaisir, rigueur et efficacité sans vous épuiser.'
      }
    ],
    faq: [
      {
        question: 'Comment reçoit-on le pack ?',
        answer: 'Vous recevez immédiatement un fichier ZIP contenant l\'intégralité des 4 ebooks ainsi que le lien d\'accès cloud direct à la base de 10 000 épreuves classées.'
      }
    ],
    relatedSlugs: ['guide-preparation-cours-evaluations-prof', 'banque-10000-epreuves-corriges-prof']
  },
  {
    id: 'pack-eleve-reussite',
    kitNumber: 'PACK ÉLÈVE',
    title: 'Pack Réussite Totale aux Examens (Les 4 Guides Méthodologiques)',
    slug: 'pack-reussite-totale-examens',
    category: 'Packs & Bundles',
    targetAudience: 'eleve',
    audienceLabel: 'Pack Tout-en-Un Élève',
    targetLevel: 'Collège, Lycée & Supérieur',
    subject: 'Pack Méthodes + Annales + Fiches + Flashcards',
    tagline: 'Toutes les méthodes de mémorisation, d\'entraînement aux épreuves, de planning et de flashcards réunies.',
    description: 'Le pack complet pour transformer vos résultats scolaires et garantir votre mention aux examens avec une remise exceptionnelle.',
    fullDescription: 'Le Pack Réussite Totale réunit nos 4 ebooks pour élèves : Mieux Apprendre Ses Cours, Pratiquer avec les Épreuves, Fiches & Planning de Révision Express, et le Guide des Flashcards. Le kit indispensable pour exceller dans toutes les matières.',
    price: 6900,
    originalPrice: 9500,
    currency: 'FCFA',
    rating: 5.0,
    reviewsCount: 156,
    status: 'available',
    badge: 'Pack Économique -30%',
    isBundle: true,
    bundleItemsCount: 4,
    format: '4 Ebooks PDF Haute Définition + Tous les Plannings & Fiches Imprimables',
    access: 'Téléchargement direct et immédiat',
    downloadFileName: 'Studykit-PACK-Reussite-Totale-Eleve.zip',
    coverTheme: {
      accentColor: '#1677FF',
      darkColor: '#111827',
      lightColor: '#FFFFFF',
      pattern: 'grid-lines'
    },
    methods: [
      'Méthodes de mémorisation scientifique (Rappel actif & répétition espacée)',
      'Déconstruction stratégique des épreuves types d\'examens',
      'Rétro-planning 30 jours et fiches synthétiques',
      'Système complet de flashcards et boîtes de Leitner'
    ],
    learningOutcomes: [
      {
        number: '01',
        title: 'Un système d\'étude complet',
        description: 'De la prise de note à la veille de l\'examen, vous ne laissez plus rien au hasard.'
      },
      {
        number: '02',
        title: 'Économie substantielle',
        description: 'Profitez des 4 guides au prix de 6 900 FCFA au lieu de 9 500 FCFA.'
      }
    ],
    includedItems: [
      'KIT ÉLÈVE 01 : Mieux Apprendre Ses Cours & Mémoriser Efficacement (84 pages)',
      'KIT ÉLÈVE 02 : Pratiquer avec les Épreuves : La Méthode d\'Examen (72 pages)',
      'KIT ÉLÈVE 03 : Fiches & Planning de Révision Express J-30 (48 pages)',
      'KIT ÉLÈVE 04 : Le Guide des Flashcards & Cartes Mémoire (56 pages)',
      'Toutes les fiches imprimables, plannings muraux A3/A4 et carnets d\'erreurs'
    ],
    previewPages: [
      {
        pageNumber: 1,
        chapter: 'PACK COMPLET',
        title: 'Le système des 4 piliers de la réussite scolaire',
        subtitle: 'Comment combiner mémorisation, pratique, organisation et cartes mémo',
        summary: 'Le schéma directeur pour articuler vos séances d\'étude autour des 4 guides Studykit.',
        keyPoints: [
          'Comprendre vite grâce au rappel actif',
          'Consolider avec les flashcards quotidiennes',
          'S\'entraîner sous chronomètre avec les épreuves types',
          'Planifier ses 30 derniers jours sans stress'
        ],
        snippet: 'La réussite aux examens n\'est pas une question de talent inné, mais de système. Quand vous appliquez le bon protocole mémoriel, que vous vous entraînez sur les vraies épreuves et que votre planning est clair, les notes suivent automatiquement.'
      }
    ],
    faq: [
      {
        question: 'Comment télécharger tous les guides ?',
        answer: 'Dès la validation de votre achat, vous recevez un lien de téléchargement direct pour récupérer l\'archive contenant les 4 ebooks et l\'ensemble des fiches bonus.'
      }
    ],
    relatedSlugs: ['mieux-apprendre-ses-cours', 'de-la-lecon-a-l-epreuve', 'fiches-planning-revision-express']
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(p => p.slug === slug);
};

export const getRelatedProducts = (slug: string): Product[] => {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return PRODUCTS.filter(p => product.relatedSlugs.includes(p.slug));
};

export const getProductsByAudience = (audience: TargetAudience): Product[] => {
  if (audience === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.targetAudience === audience || p.targetAudience === 'all');
};
