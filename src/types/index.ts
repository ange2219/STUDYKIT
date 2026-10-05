export type ProductCategory = 
  | 'Pédagogie & Enseignement'
  | 'Banques d\'Épreuves & Corrigés'
  | 'Méthodes d\'Apprentissage'
  | 'Mémorisation & Révisions'
  | 'Examens & Concours'
  | 'Packs & Bundles';

export type TargetAudience = 'prof' | 'eleve' | 'all';

export type ProductStatus = 'available' | 'coming_soon' | 'preorder';

export interface LearningOutcome {
  number: string;
  title: string;
  description: string;
}

export interface PreviewPage {
  pageNumber: number;
  title: string;
  chapter: string;
  subtitle: string;
  summary: string;
  keyPoints: string[];
  snippet: string;
  badge?: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  kitNumber: string;
  title: string;
  slug: string;
  category: ProductCategory;
  targetAudience: TargetAudience;
  audienceLabel: string;
  targetLevel?: string;
  subject?: string;
  tagline: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  status: ProductStatus;
  format: string;
  access: string;
  badge?: string;
  isBundle?: boolean;
  bundleItemsCount?: number;
  coverTheme: {
    accentColor: string;
    darkColor: string;
    lightColor: string;
    pattern?: string;
  };
  methods: string[];
  learningOutcomes: LearningOutcome[];
  includedItems: string[];
  previewPages: PreviewPage[];
  faq: ProductFAQ[];
  relatedSlugs: string[];
  downloadFileName: string;
  chariowUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productSlug?: string;
  author: string;
  role: 'Étudiant' | 'Élève' | 'Enseignant' | 'Parent d\'élève' | 'Apprenant';
  institution?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  category: 'Achat' | 'Produits numériques' | 'Paiement' | 'Accès aux produits' | 'Remboursement';
  question: string;
  answer: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'mobile_money' | 'card';
  paymentProvider: string;
  status: 'confirmed' | 'pending';
}

export type ViewRoute = 
  | { name: 'digitalLibrary' }
  | { name: 'home' }
  | { name: 'shop'; category?: ProductCategory | string; audience?: TargetAudience; search?: string }
  | { name: 'product'; slug: string }
  | { name: 'about' }
  | { name: 'faq'; category?: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'confirmation'; orderNumber: string };


