import React from 'react';
import type { Product } from '../../types';

interface BookCoverProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  is3D?: boolean;
  className?: string;
  onClick?: () => void;
}

interface CoverData {
  kicker: string;
  line1: string;
  line2Before: string;
  highlight: string;
  line2After?: string;
  subtitle: string;
}

const COVERS_DATA: Record<string, CoverData> = {
  'mieux-apprendre-ses-cours': {
    kicker: 'Guide pratique · Méthodes de révision',
    line1: 'Apprendre mieux,',
    line2Before: 'pas seulement ',
    highlight: 'plus',
    subtitle: 'Un guide pratique pour mieux mémoriser, pratiquer et préparer vos examens.'
  },
  'de-la-lecon-a-l-epreuve': {
    kicker: 'Guide stratégique · Réussite aux examens',
    line1: 'De la leçon',
    line2Before: 'à l’',
    highlight: 'épreuve',
    subtitle: 'Le guide méthodique pour déconstruire les sujets et maximiser ses points.'
  },
  'guide-preparation-cours-evaluations-prof': {
    kicker: 'Ingénierie pédagogique · Enseignement',
    line1: 'Préparation de cours',
    line2Before: '& ',
    highlight: 'évaluations',
    subtitle: 'Matrices pour concevoir des cours captivants et des barèmes fiables.'
  },
  'banque-10000-epreuves-corriges-prof': {
    kicker: 'Archive nationale · +10 000 Sujets',
    line1: 'Banque d’épreuves',
    line2Before: '& ',
    highlight: 'corrigés types',
    subtitle: 'Base monumentale de devoirs classés de la 6e à la Tle avec barèmes.'
  },
  'didactique-pedagogie-active-classe': {
    kicker: 'Climat de classe · Didactique active',
    line1: 'Pédagogie active',
    line2Before: '& ',
    highlight: 'gestion de classe',
    subtitle: 'Protocoles concrets pour engager 100% des élèves et maintenir le calme.'
  },
  'kit-cle-en-main-professeur-principal': {
    kicker: 'Coaching scolaire · Orientation',
    line1: 'Kit clé en main',
    line2Before: 'professeur ',
    highlight: 'principal',
    subtitle: 'Outils d’animation des heures de vie de classe et suivi des élèves.'
  },
  'fiches-planning-revision-express': {
    kicker: 'Organisation d’urgence · Planning J-30',
    line1: 'Fiches express',
    line2Before: '& ',
    highlight: 'planning J-30',
    subtitle: 'Le système d’organisation pour structurer vos 4 semaines clés.'
  },
  'guide-repetition-espacee-flashcards': {
    kicker: 'Sciences de la mémoire · Flashcards',
    line1: 'Guide flashcards',
    line2Before: '& ',
    highlight: 'répétition espacée',
    subtitle: 'Le protocole pour réactiver ses connaissances sans jamais oublier.'
  },
  'pack-integral-enseignant-excellence': {
    kicker: 'Pack Intégral · Enseignement d’Excellence',
    line1: 'Pack Intégral',
    line2Before: 'Enseignant ',
    highlight: 'd’Excellence',
    subtitle: 'Les 4 guides pédagogiques + l’accès complet à la banque d’épreuves.'
  },
  'pack-reussite-totale-examens': {
    kicker: 'Pack Ultime · Candidats & Élèves',
    line1: 'Pack Réussite Totale',
    line2Before: 'Élèves & ',
    highlight: 'Candidats',
    subtitle: 'Les 4 ebooks de méthode + les plannings et grilles d’entraînement.'
  }
};

export const BookCover: React.FC<BookCoverProps> = ({
  product,
  size = 'md',
  className = '',
  onClick
}) => {
  const specs = {
    sm: {
      width: 130,
      height: 184,
      accentWidth: 4,
      innerPadX: 14,
      kickerSize: '5.8px',
      kickerMargin: '7px',
      titleSize: '13px',
      titleMargin: '5px',
      subSize: '6.5px',
      subPadLeft: '4px',
      footerBottom: 10,
      footerSize: '6px',
      dotSize: 18,
      dotRight: 10,
      dotTop: 12
    },
    md: {
      width: 230,
      height: 325,
      accentWidth: 7,
      innerPadX: 24,
      kickerSize: '8.2px',
      kickerMargin: '14px',
      titleSize: '22px',
      titleMargin: '9px',
      subSize: '8.8px',
      subPadLeft: '6px',
      footerBottom: 18,
      footerSize: '7.5px',
      dotSize: 28,
      dotRight: 16,
      dotTop: 20
    },
    lg: {
      width: 320,
      height: 452,
      accentWidth: 9,
      innerPadX: 34,
      kickerSize: '10.5px',
      kickerMargin: '18px',
      titleSize: '30px',
      titleMargin: '12px',
      subSize: '11.5px',
      subPadLeft: '8px',
      footerBottom: 26,
      footerSize: '9px',
      dotSize: 38,
      dotRight: 24,
      dotTop: 28
    },
    xl: {
      width: 400,
      height: 566,
      accentWidth: 11,
      innerPadX: 42,
      kickerSize: '12.5px',
      kickerMargin: '22px',
      titleSize: '37px',
      titleMargin: '15px',
      subSize: '13.5px',
      subPadLeft: '10px',
      footerBottom: 32,
      footerSize: '10.5px',
      dotSize: 46,
      dotRight: 30,
      dotTop: 36
    }
  }[size];

  const accent = product.coverTheme?.accentColor || '#1677FF';

  const data = COVERS_DATA[product.slug] || {
    kicker: product.category || 'Guide pratique',
    line1: product.title,
    line2Before: '',
    highlight: '',
    subtitle: product.tagline || product.description
  };

  return (
    <div
      onClick={onClick}
      className={`relative select-none transition-all duration-300 hover:-translate-y-1.5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        width: `${specs.width}px`,
        height: `${specs.height}px`,
        backgroundColor: '#14161C',
        borderRadius: '1px',
        boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.45), 0 4px 12px -2px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 1. LIGNE BLEUE VERTICALE PLEINE À GAUCHE (Exact .accent-line de ebook-apprendre-mieux.html) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${specs.accentWidth}px`,
          backgroundColor: accent,
          zIndex: 5
        }}
      />

      {/* 2. GRILLE DE POINTS EN HAUT À DROITE (Exact .grid-dot de ebook-apprendre-mieux.html) */}
      <div
        style={{
          position: 'absolute',
          right: `${specs.dotRight}px`,
          top: `${specs.dotTop}px`,
          width: `${specs.dotSize}px`,
          height: `${specs.dotSize}px`,
          backgroundImage: 'radial-gradient(#2A3244 1.1px, transparent 1.1px)',
          backgroundSize: '4.5px 4.5px',
          opacity: 0.9,
          pointerEvents: 'none'
        }}
      />

      {/* 3. BLOC CENTRAL VERTICALEMENT CENTRÉ (Exact .cover-inner de ebook-apprendre-mieux.html) */}
      <div
        style={{
          position: 'absolute',
          left: `${specs.innerPadX}px`,
          right: `${specs.innerPadX}px`,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        {/* KICKER DIRECTEMENT AU-DESSUS DU TITRE (Exact .cover-kicker) */}
        <div
          style={{
            fontSize: specs.kickerSize,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: accent,
            fontWeight: 700,
            marginBottom: specs.kickerMargin,
            fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
          }}
        >
          {data.kicker}
        </div>

        {/* GRAND TITRE EN EXACTEMENT 2 LIGNES (Exact .cover-title) */}
        <div
          style={{
            fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
            fontWeight: 900,
            fontSize: specs.titleSize,
            lineHeight: 1.06,
            color: '#FFFFFF',
            marginBottom: specs.titleMargin,
            letterSpacing: '-0.02em'
          }}
        >
          <div>{data.line1}</div>
          <div>
            {data.line2Before}
            <span style={{ color: accent }}>{data.highlight}</span>
            {data.line2After}
          </div>
        </div>

        {/* SOUS-TITRE AVEC FILET VERTICAL GAUCHE (Exact .cover-subtitle) */}
        {specs.subSize && data.subtitle && (
          <div
            style={{
              fontSize: specs.subSize,
              color: '#B9C0CE',
              fontWeight: 400,
              lineHeight: 1.5,
              borderLeft: `2px solid ${accent}`,
              paddingLeft: specs.subPadLeft,
              margin: 0,
              maxWidth: '96%',
              fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
            }}
          >
            {data.subtitle}
          </div>
        )}
      </div>

      {/* 4. PIED DE COUVERTURE FIXÉ EN BAS (Exact .cover-footer de ebook-apprendre-mieux.html) */}
      <div
        style={{
          position: 'absolute',
          left: `${specs.innerPadX}px`,
          right: `${specs.innerPadX}px`,
          bottom: `${specs.footerBottom}px`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: specs.footerSize,
          color: '#7A8294',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
          zIndex: 10
        }}
      >
        <span style={{ color: '#9AA1AC', fontWeight: 600 }}>StudyKit</span>
        <div
          style={{
            flex: 1,
            height: '1px',
            backgroundColor: '#2A3244',
            margin: '0 8px'
          }}
        />
        <span style={{ color: '#7A8294' }}>Édition 2026</span>
      </div>
    </div>
  );
};
