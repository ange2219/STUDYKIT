import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const image = (asset, width = 520) => `https://images.chariowcdn.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50,width=${width}/https://assets.chariowcdn.com/assets/store_onog0x4a7pj6/${asset}`;

export const books = [
  { id: 'apprendre-mieux', title: 'Apprendre mieux, pas seulement plus', subtitle: 'Méthodes d’apprentissage · Ebook', cover: 'cream', coverImage: image('ICcgFwD76tggxMdTIrm2Kraqz9qpBDo1hphSq6TU.png'), price: 3000, originalPrice: 8000, currency: 'FCFA', chariowUrl: 'https://fykldcqv.mychariow.co/prd_53pcfeeg', htmlPath: path.resolve(ROOT, 'ebook-apprendre-mieux.html') },
  { id: 'lecon-epreuve', title: 'De la leçon à l’épreuve', subtitle: 'Méthodes d’examen · Ebook', cover: 'orange', coverImage: image('Sm4kSwy2fBPVDuTf0KFnt0euLDq9U43A5o3YCPPJ.png'), price: 7000, originalPrice: 10000, currency: 'FCFA', chariowUrl: 'https://fykldcqv.mychariow.co/prd_8lybuoj2', htmlPath: path.resolve(ROOT, 'ebook-de-la-lecon-a-l-epreuve.html') },
  { id: 'guide-pct4', title: 'Le Guide résumé du répétiteur — PCT 4ème', subtitle: 'Guide méthodique & résumés de cours · Collège', cover: 'blue', coverImage: image('wKu2BT6AbqmTHhHGLU903Si7uEWxUUmlRAiLIws8.png'), price: 3000, originalPrice: 8000, currency: 'FCFA', chariowUrl: 'https://fykldcqv.mychariow.co/prd_y5yrowzm', htmlPath: path.resolve(ROOT, '4ieme/pct/LE GUIDE RESUME DU REPETITEUR 4IEME PCT.html') },
  { id: 'guide-pct3', title: 'Le Guide résumé du répétiteur — PCT 3ème', subtitle: 'Guide méthodique & résumés de cours · Collège', cover: 'green', coverImage: image('9zXPSLLqW2WGqiRlrJr1Czsj6eKidij0nobgcIgK.jpg'), price: 3000, originalPrice: 8000, currency: 'FCFA', chariowUrl: 'https://fykldcqv.mychariow.co/prd_q3ciz5ol', htmlPath: path.resolve(ROOT, '3ieme/pct/LE GUIDE RESUME DU REPETITEUR 3IEME PCT.html') },
];

export const publicBook = ({ htmlPath, ...book }) => book;
