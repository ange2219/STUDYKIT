import React, { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { BookOpen, Check, ChevronLeft, Download, KeyRound, LibraryBig, LockKeyhole, ShoppingBag, Wifi, WifiOff, X } from 'lucide-react';
import { cacheBook, getSession, getStoredBooks, readCachedBook, saveSession, type LibraryBook } from '../data/offlineLibrary';

const fallbackBooks: LibraryBook[] = [
  { id: 'apprendre-mieux', title: 'Apprendre mieux, pas seulement plus', subtitle: 'Méthodes d’apprentissage · Ebook', cover: 'cream', chariowUrl: 'https://fykldcqv.mychariow.co/prd_53pcfeeg' },
  { id: 'lecon-epreuve', title: 'De la leçon à l’épreuve', subtitle: 'Méthodes d’examen · Ebook', cover: 'orange', chariowUrl: 'https://fykldcqv.mychariow.co/prd_8lybuoj2' },
  { id: 'guide-pct4', title: 'Le Guide résumé du répétiteur — PCT 4ème', subtitle: 'Guide méthodique & résumés de cours · Collège', cover: 'blue', chariowUrl: 'https://fykldcqv.mychariow.co/prd_y5yrowzm' },
  { id: 'guide-pct3', title: 'Le Guide résumé du répétiteur — PCT 3ème', subtitle: 'Guide méthodique & résumés de cours · Collège', cover: 'green', chariowUrl: 'https://fykldcqv.mychariow.co/prd_q3ciz5ol' },
];

interface Props { initialTab: 'library' | 'shop'; }
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { 'content-type': 'application/json', ...init?.headers } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Connexion StudyKit indisponible.');
  return payload as T;
}

async function fetchBookHtml(bookId: string, session: { deviceId: string; token: string }) {
  const chunks: Uint8Array[] = [];
  let count = 1;
  for (let index = 0; index < count; index += 1) {
    const query = new URLSearchParams({ deviceId: session.deviceId, part: String(index) });
    const response = await fetch(`/api/book-content?bookId=${encodeURIComponent(bookId)}&${query}`, {
      headers: { authorization: `Bearer ${session.token}` }, cache: 'no-store',
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'Le livre ne peut pas être chargé.');
    }
    if (index === 0) {
      count = Number(response.headers.get('x-book-parts') || 1);
      if (!Number.isInteger(count) || count < 1 || count > 100) throw new Error('Le contenu du livre est incomplet.');
    }
    chunks.push(new Uint8Array(await response.arrayBuffer()));
  }
  const size = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder().decode(bytes);
}
function Cover({ book, compact = false }: { book: LibraryBook; compact?: boolean }) {
  return (
    <div className={`library-cover cover-${book.cover} ${compact ? 'library-cover-compact' : ''}`} aria-label={`Couverture de ${book.title}`}>
      {book.coverImage ? <img className="library-cover-image" src={book.coverImage} alt={book.title} /> : <><div className="cover-topline"><span>STUDYKIT</span><span>ÉDITION ÉDUCATIVE</span></div>
      <div className="cover-symbol"><BookOpen size={compact ? 21 : 27} strokeWidth={1.5} /></div>
      <div className="cover-title">{book.title}</div>
      <div className="cover-subtitle">{book.subtitle}</div>
      <div className="cover-bottomline"><span>Lire · Comprendre · Réussir</span><span>✦</span></div></>}
    </div>
  );
}

function newDeviceId() {
  return crypto.randomUUID();
}

export const DigitalLibraryPage: React.FC<Props> = ({ initialTab }) => {
  const [tab, setTab] = useState(initialTab);
  const [catalog, setCatalog] = useState<LibraryBook[]>(fallbackBooks);
  const [library, setLibrary] = useState<LibraryBook[]>([]);
  const [session, setSession] = useState<Awaited<ReturnType<typeof getSession>>>(undefined);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<InstallEvent | null>(null);
  const [activationOpen, setActivationOpen] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [activationError, setActivationError] = useState('');
  const [activating, setActivating] = useState(false);
  const [activationMessage, setActivationMessage] = useState('');
  const [readerBook, setReaderBook] = useState<LibraryBook | null>(null);
  const [readerHtml, setReaderHtml] = useState('');
  const [readerOffline, setReaderOffline] = useState(false);
  const [readerError, setReaderError] = useState('');
  const [loadingBookId, setLoadingBookId] = useState('');

  const ownedIds = useMemo(() => new Set(library.map(book => book.id)), [library]);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    const install = (event: Event) => { event.preventDefault(); setInstallPrompt(event as InstallEvent); };
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    window.addEventListener('beforeinstallprompt', install);
    void loadInitial();
    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
      window.removeEventListener('beforeinstallprompt', install);
    };
  }, []);

  async function loadInitial() {
    try {
      const result = await api<{ books: LibraryBook[] }>('/api/books');
      if (result.books.length) setCatalog(result.books);
    } catch { /* Le catalogue local garde l’écran utilisable si l’API n’est pas joignable. */ }
    const savedSession = await getSession().catch(() => undefined);
    setSession(savedSession);
    if (savedSession && navigator.onLine) {
      try {
        const result = await api<{ books: LibraryBook[] }>(`/api/library?deviceId=${encodeURIComponent(savedSession.deviceId)}`, { headers: { authorization: `Bearer ${savedSession.token}` } });
        setLibrary(result.books);
      } catch {
        const local = await getStoredBooks().catch(() => []);
        setLibrary(local.map(({ id, title, subtitle, cover, coverImage }) => ({ id, title, subtitle, cover, coverImage, chariowUrl: '' })));
      }
    } else {
      const local = await getStoredBooks().catch(() => []);
      setLibrary(local.map(({ id, title, subtitle, cover }) => ({ id, title, subtitle, cover, chariowUrl: '' })));
    }
  }

  async function activate(event: FormEvent) {
    event.preventDefault();
    setActivationError('');
    setActivating(true);
    try {
      const deviceId = session?.deviceId || newDeviceId();
      const result = await api<{ token: string; book: LibraryBook }>('/api/activate', {
        method: 'POST',
        body: JSON.stringify({ code: activationCode, deviceId }),
      });
      const nextSession = { key: 'auth' as const, deviceId, token: result.token };
      await saveSession(nextSession);
      setSession(nextSession);
      setActivationMessage('Activation confirmée. Préparation du livre hors connexion…');
      await refreshLibrary(nextSession);
      try {
        const html = await fetchBookHtml(result.book.id, nextSession);
        await cacheBook(result.book, html, nextSession);
      } catch { /* Le livre reste activé ; son cache pourra être créé à la première lecture en ligne. */ }
      setActivationMessage('');
      setActivationCode('');
      setActivationOpen(false);
      chooseTab('library');
    } catch (error) {
      setActivationMessage('');
      setActivationError(error instanceof Error ? error.message : 'Le code n’a pas pu être vérifié.');
    } finally {
      setActivating(false);
    }
  }

  function chooseTab(nextTab: 'library' | 'shop') {
    setTab(nextTab);
    const nextHash = nextTab === 'shop' ? '#/boutique' : '#/bibliotheque';
    if (window.location.hash !== nextHash) window.history.replaceState(null, '', nextHash);
  }

  async function refreshLibrary(activeSession = session) {
    if (!activeSession) return;
    try {
      const result = await api<{ books: LibraryBook[] }>(`/api/library?deviceId=${encodeURIComponent(activeSession.deviceId)}`, { headers: { authorization: `Bearer ${activeSession.token}` } });
      setLibrary(result.books);
    } catch (error) {
      setActivationError(error instanceof Error ? error.message : 'Bibliothèque temporairement indisponible.');
    }
  }

  async function openReader(book: LibraryBook) {
    setReaderBook(book);
    setReaderError('');
    setReaderHtml('');
    setReaderOffline(false);
    setLoadingBookId(book.id);
    try {
      const activeSession = session || await getSession();
      if (!activeSession) throw new Error('Activez ce livre pour commencer la lecture.');
      try {
        if (!navigator.onLine) throw new Error('offline');
        const html = await fetchBookHtml(book.id, activeSession);
        await cacheBook(book, html, activeSession);
        setReaderHtml(html);
      } catch (networkError) {
        if (navigator.onLine && !(networkError instanceof TypeError)) throw networkError;
        const cached = await readCachedBook(book, activeSession);
        if (!cached) throw networkError;
        setReaderHtml(cached);
        setReaderOffline(true);
      }
    } catch (error) {
      setReaderError(error instanceof Error ? error.message : 'Le livre est indisponible.');
    } finally {
      setLoadingBookId('');
    }
  }

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  return (
    <div className="library-app">
      <header className="library-header">
        <a href="#/bibliotheque" className="library-brand" aria-label="StudyKit, ma bibliothèque">
          <img className="brand-logo" src="https://images.chariowcdn.com/cdn-cgi/image/format=auto,onerror=redirect,quality=medium-high,slow-connection-quality=50,width=96/https://assets.chariowcdn.com/store_logos/0l5h6fBBAsRZ1umBvZhrlwZDW73tkP033FlTAGtC.png" alt="StudyKit" />
          <span>STUDYKIT</span>
        </a>
        <nav className="library-nav" aria-label="Navigation principale">
          <button className={tab === 'library' ? 'active' : ''} onClick={() => chooseTab('library')}><LibraryBig size={17} /> Ma bibliothèque <span className="nav-count">{library.length}</span></button>
          <button className={tab === 'shop' ? 'active' : ''} onClick={() => chooseTab('shop')}><ShoppingBag size={17} /> Boutique</button>
        </nav>
        <div className="library-header-actions">
          <span className={`connection-pill ${isOnline ? '' : 'is-offline'}`}>{isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}{isOnline ? 'En ligne' : 'Hors ligne'}</span>
          {installPrompt && <button className="install-button" onClick={() => void installApp()}><Download size={15} /> Installer</button>}
          <button className="activate-top" onClick={() => { setActivationError(''); setActivationOpen(true); }}><KeyRound size={16} /><span>Activer un livre</span></button>
        </div>
      </header>

      <main className="library-main">
        {tab === 'library' ? (
          <>
            <section className="library-welcome">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> VOTRE ESPACE DE LECTURE</div>
                <h1>Vos lectures,<br /><em>au même endroit.</em></h1>
                <p>Retrouvez les livres StudyKit activés sur cet appareil, même sans connexion.</p>
              </div>
              <div className="welcome-illustration"><img src="/guide-pct-stack.png" alt="Pile flottante des guides résumés PCT StudyKit" /></div>
            </section>
            <section className="library-section">
              <div className="section-heading"><div><span className="eyebrow">VOS OUVRAGES</span><h2>Ma bibliothèque <span className="count-bubble">{library.length}</span></h2></div><button className="text-action" onClick={() => setActivationOpen(true)}><KeyRound size={16} /> Ajouter un code</button></div>
              {library.length ? (
                <div className="library-grid">
                  {library.map(book => <article className="library-book-card" key={book.id}><button className="cover-button" onClick={() => void openReader(book)}><Cover book={book} /></button><div className="book-card-copy"><div className="book-category">LIVRE NUMÉRIQUE</div><h3>{book.title}</h3><p>{book.subtitle}</p><button className="read-button" onClick={() => void openReader(book)}><BookOpen size={16} /> Lire le livre <span>→</span></button></div></article>)}
                </div>
              ) : (
                <div className="empty-library"><div className="empty-icon"><BookOpen size={28} /></div><h3>Votre bibliothèque commence ici</h3><p>Entrez le code reçu après votre achat pour retrouver votre livre dans StudyKit.</p><button className="primary-button" onClick={() => { setActivationError(''); setActivationOpen(true); }}><KeyRound size={17} /> Activer mon premier livre</button><button className="subtle-button" onClick={() => chooseTab('shop')}>Découvrir la boutique <span>→</span></button></div>
              )}
            </section>
            <div className="offline-note"><span className="offline-note-icon"><LockKeyhole size={17} /></span><div><strong>Vos livres voyagent avec vous</strong><p>À l’activation, StudyKit conserve une copie chiffrée pour vos prochaines lectures hors connexion.</p></div><Check size={18} className="note-check" /></div>
          </>
        ) : (
          <>
            <section className="shop-welcome"><div className="eyebrow"><span className="eyebrow-dot" /> LA LIBRAIRIE STUDYKIT</div><h1>Un bon livre ouvre<br /><em>de nouvelles idées.</em></h1><p>Achetez vos ouvrages sur Chariow, puis activez-les ici pour les retrouver dans votre bibliothèque StudyKit.</p></section>
            <section className="library-section shop-section"><div className="section-heading"><div><span className="eyebrow">LE CATALOGUE</span><h2>À lire ensuite</h2></div><span className="catalog-count">{catalog.length} livres</span></div>
              <div className="library-grid shop-grid">
                {catalog.map(book => <article className="library-book-card" key={book.id}><div className="cover-button"><Cover book={book} /></div><div className="book-card-copy"><div className="book-category">{ownedIds.has(book.id) ? 'DANS VOTRE BIBLIOTHÈQUE' : 'ÉDITION STUDYKIT'}</div><h3>{book.title}</h3><p>{book.subtitle}</p><div className="book-price">{book.originalPrice && <del>{book.originalPrice.toLocaleString('fr-FR')} {book.currency || 'FCFA'}</del>}{book.price && <strong>{book.price.toLocaleString('fr-FR')} {book.currency || 'FCFA'}</strong>}</div>{ownedIds.has(book.id) ? <button className="read-button" onClick={() => void openReader(book)}><BookOpen size={16} /> Lire le livre <span>→</span></button> : book.chariowUrl ? <a className="read-button buy-button" href={book.chariowUrl} target="_blank" rel="noreferrer"><ShoppingBag size={16} /> Acheter sur Chariow <span>↗</span></a> : <span className="coming-soon">Bientôt disponible</span>}</div></article>)}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="library-footer"><span>© StudyKit · Une bibliothèque pensée pour apprendre</span><button onClick={() => chooseTab(tab === 'library' ? 'shop' : 'library')}>{tab === 'library' ? 'Voir la boutique' : 'Ma bibliothèque'} <span>→</span></button></footer>

      {activationOpen && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setActivationOpen(false); }}><section className="activation-modal" role="dialog" aria-modal="true" aria-labelledby="activation-title"><button className="modal-close" onClick={() => setActivationOpen(false)} aria-label="Fermer"><X size={20} /></button><div className="activation-icon"><KeyRound size={22} /></div><span className="eyebrow">ACCÈS PERSONNEL</span><h2 id="activation-title">Ajoutez un livre à votre bibliothèque</h2><p>Saisissez le code reçu après votre achat StudyKit. Le livre sera associé à cet appareil.</p><form onSubmit={event => void activate(event)}><label htmlFor="activation-code">Code d’accès</label><input id="activation-code" autoFocus autoComplete="one-time-code" placeholder="SK-PCT4-7X92-K4LM" value={activationCode} onChange={event => setActivationCode(event.target.value.toUpperCase())} required maxLength={24} /><small>Le code se trouve dans le message envoyé après l’achat.</small>{activationMessage && <div className="activation-progress" role="status">{activationMessage}</div>}{activationError && <div className="form-error" role="alert">{activationError}</div>}<button className="primary-button modal-submit" disabled={activating}>{activating ? 'Vérification…' : 'Vérifier et activer'} <span>→</span></button></form><div className="activation-privacy"><LockKeyhole size={14} /> Un code activé est lié à un seul appareil.</div></section></div>}

      {readerBook && <div className="reader-screen"><header className="reader-header"><button className="reader-back" onClick={() => { setReaderBook(null); setReaderHtml(''); }}><ChevronLeft size={19} /> Bibliothèque</button><div className="reader-title"><strong>{readerBook.title}</strong><span>{readerOffline ? <><WifiOff size={13} /> Disponible hors connexion</> : <><Wifi size={13} /> Lecture StudyKit</>}</span></div><button className="reader-close" onClick={() => { setReaderBook(null); setReaderHtml(''); }} aria-label="Fermer la lecture"><X size={19} /></button></header>{loadingBookId ? <div className="reader-loading"><div className="loading-book"><BookOpen size={28} /></div><strong>Préparation de votre lecture…</strong><span>StudyKit prépare votre lecture et conserve une copie chiffrée.</span></div> : readerError ? <div className="reader-error"><div className="empty-icon"><BookOpen size={27} /></div><h2>Impossible d’ouvrir ce livre</h2><p>{readerError}</p><button className="primary-button" onClick={() => void openReader(readerBook)}>Réessayer</button></div> : <iframe className="book-frame" title={readerBook.title} sandbox="" srcDoc={readerHtml} />}</div>}
    </div>
  );
};


