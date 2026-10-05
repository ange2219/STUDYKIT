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

## Bibliothèque StudyKit (MVP)

L’application démarre maintenant sur **Ma bibliothèque**. La navigation principale donne accès à **Ma bibliothèque** et à la **Boutique** ; les anciennes pages de présentation restent disponibles dans le projet.

### Démarrage local

```bash
npm run dev
```

Cette commande lance l’interface Vite et l’API locale. Au premier démarrage, l’API crée `server/data/store.json` et, en mode local uniquement, quelques codes de démonstration :

- `SK-PCT4-7X92-K4LM`
- `SK-PCT3-3K8D-M9QP`
- `SK-AMMP-5R4N-8Q2L`
- `SK-DLEP-6T3A-W9KC`

Ces codes sont réservés au développement. Les codes générés dans la base ne sont stockés que sous forme d’empreinte SHA-256. La commande admin:codes crée un lot de codes uniques et l’exporte en .txt (un code par ligne) dans server/data/exports/, prêt à importer comme stock de licences Chariow. Le fichier contient les codes en clair : ne le placez jamais dans public et gardez-le en lieu sûr après import.

### Livres et vente

Le catalogue de la bibliothèque se trouve dans `server/books.mjs`. Les fichiers HTML restent dans les dossiers de travail et sont servis par l’API uniquement après vérification de l’appareil et du droit d’accès. Les anciens fichiers HTML/PDF présents dans `public` sont bloqués en développement et retirés du répertoire de build pour éviter leur accès direct.

Les liens Chariow configurés dans le catalogue sont réutilisés. Pour la remise automatique, configurez chaque livre comme produit de type Licence avec le mode Stock de clés, une activation par clé et une validité permanente. Importez le fichier généré pour le même id-livre.

### Codes et réinitialisation

Copiez `.env.example` vers `.env` et remplacez `STUDYKIT_ADMIN_TOKEN` par un secret long avant d’utiliser les commandes administrateur. Avec l’API lancée :

```bash
npm run admin:code -- guide-pct4
npm run admin:codes -- guide-pct4 100
npm run admin:reset -- SK-PCT4-XXXX-XXXX
```

Identifiants de livre disponibles : `guide-pct4`, `guide-pct3`, `apprendre-mieux`, `lecon-epreuve`.

### Données, sécurité et limites du MVP

En local, les activations restent dans `server/data/store.json`. Sur Vercel, l’API utilise PostgreSQL (Neon recommandé via le Marketplace Vercel) et les contenus sont envoyés dans un stockage Blob privé. Le HTML des livres est découpé en parties de 3 Mo pour respecter la limite de réponse des fonctions Vercel, puis chiffré dans IndexedDB après activation pour la lecture hors connexion. Le cache hors connexion reste révocable seulement lorsque l’appareil se reconnecte ; un navigateur ne peut pas fournir un DRM inviolable.

### Préparer un aperçu Vercel

1. Dans Vercel, créez une base PostgreSQL Neon et un **Blob store privé** pour le projet. Utilisez des ressources séparées de la production pour le premier aperçu.
2. Dans les variables d’environnement **Preview** du projet Vercel, configurez `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `STUDYKIT_TOKEN_SECRET` (secret aléatoire d’au moins 32 octets) et `STUDYKIT_ADMIN_TOKEN` (secret administrateur long). Ne mettez jamais ces valeurs dans `src`, `public` ou Git.
3. Pour publier les fichiers HTML vers le Blob privé, copiez `.env.example` vers `.env`, remplissez les mêmes variables en utilisant la base et le Blob de test, puis lancez `npm run cloud:publish-books`. Cette commande crée les tables et envoie les livres privés en blocs. Elle modifie les ressources cloud indiquées par ces variables.
4. Déployez une branche de test reliée à Vercel pour générer un aperçu ; vérifiez l’activation d’un code généré pour l’aperçu, la bibliothèque et la lecture hors connexion avant d’ajouter les variables de Production ou de fusionner vers la branche de production.
5. Pour générer les codes directement dans l’API de l’aperçu, définissez `STUDYKIT_API_URL` dans `.env` avec l’URL de l’aperçu, puis utilisez `npm run admin:codes -- guide-pct4 50`. Le fichier `.txt` de codes est créé dans `server/data/exports/` et doit rester privé.

La base et le Blob de production ne doivent pas être connectés au script de publication pendant la phase de test. Chariow continue de remettre les codes de licence ; le paiement n’est pas encore vérifié automatiquement par webhook.
