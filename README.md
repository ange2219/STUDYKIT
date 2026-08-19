# 📚 StudyKit — Plateforme d'E-books & Fiches de Révision d'Excellence

StudyKit est une application web moderne, interactive et fluide dédiée à la vente et consultation de kits d'études, fiches de synthèse, annales corrigées et e-books pédagogiques pour les étudiants et candidats aux concours.

---

## ✨ Fonctionnalités Clés

- 🎨 **Interface Moderne & Épurée** : Design responsive, animations fluides, typographie soignée et mode clair/sombre harmonieux.
- 📖 **Visionneuse d'E-books Interactive** : Aperçu réaliste des chapitres, sommaires dynamiques et prévisualisation avant achat.
- 🛒 **Système de Panier & Commande Complet** : Gestion du panier d'achats en temps réel, calcul automatique et flux de paiement simulé complet avec page de confirmation et téléchargement direct.
- 🔍 **Recherche & Filtres Avancés** : Recherche instantanée modale, filtrage par matière, niveau d'études (Licence, Master, Prépas, Concours) et type de ressource.
- ⚡ **Performance & Vitesse** : Construit avec **Vite + React 19 + TypeScript + Tailwind CSS**.
- 📄 **Exportation & Téléchargement** : Scripts et intégration pour conversion/génération d'épreuves PDF.

---

## 🛠️ Stack Technique

- **Framework** : [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styles** : [Tailwind CSS v4](https://tailwindcss.com/) + CSS personnalisé
- **Icones** : [Lucide React](https://lucide.dev/)
- **Effets** : [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Automatisation PDF** : Puppeteer Core + scripts Node.js

---

## 🚀 Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (version 20+ recommandée)
- [Git](https://git-scm.com/)

### Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/ange2219/studykit.git
   cd studykit
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:5173`.

---

## 📦 Scripts Disponibles

- `npm run dev` : Démarre le serveur local de développement Vite avec HMR.
- `npm run build` : Compile et optimise l'application pour la production (`tsc -b && vite build`).
- `npm run preview` : Prévisualise le build de production localement.
- `npm run lint` : Analyse le code avec Oxlint.
- `npm run pdf` : Exécute le script de génération/conversion PDF des épreuves.

---

## 📂 Structure du Projet

```text
studykit/
├── public/                 # Assets statiques et images
├── scripts/                # Scripts de conversion et utilitaires PDF
├── src/
│   ├── assets/             # Images, icônes et illustrations
│   ├── components/         # Composants React réutilisables (Layout, Home, Modals, etc.)
│   ├── context/            # CartContext & gestion d'état globale
│   ├── data/               # Catalogues de produits, avis, FAQ et données statiques
│   ├── pages/              # Pages principales (Accueil, Boutique, Panier, Checkout, etc.)
│   ├── types/              # Définitions TypeScript
│   ├── App.tsx             # Composant racine et routage hash
│   ├── main.tsx            # Point d'entrée React
│   └── index.css           # Feuille de styles globale Tailwind
├── index.html              # Fichier HTML principal
├── package.json            # Configuration et dépendances
├── tsconfig.json           # Configuration TypeScript
└── vite.config.ts          # Configuration Vite
```

---

## 👤 Auteur

- **Ange DAHOU** ([@ange2219](https://github.com/ange2219))
