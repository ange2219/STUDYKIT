export interface LibraryBook {
  id: string;
  title: string;
  subtitle: string;
  cover: 'blue' | 'green' | 'cream' | 'orange' | 'violet';
  chariowUrl: string;
  coverImage?: string;
  price?: number;
  originalPrice?: number;
  currency?: string;
}

type StoredSession = { key: 'auth'; deviceId: string; token: string };
type StoredBook = { id: string; title: string; subtitle: string; cover: LibraryBook['cover']; coverImage?: string; iv: Uint8Array; encrypted: ArrayBuffer; savedAt: string };

const DB_NAME = 'studykit-library-v1';
let database: Promise<IDBDatabase> | undefined;

function openDb() {
  if (!database) {
    database = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('session')) db.createObjectStore('session', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('books')) db.createObjectStore('books', { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Stockage StudyKit indisponible.'));
    });
  }
  return database;
}

function transaction<T>(storeName: 'session' | 'books', mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>) {
  return openDb().then(db => new Promise<T>((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const request = action(tx.objectStore(storeName));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Impossible de lire la bibliothèque locale.'));
  }));
}

export const getSession = () => transaction<StoredSession | undefined>('session', 'readonly', store => store.get('auth'));
export const saveSession = (session: StoredSession) => transaction<IDBValidKey>('session', 'readwrite', store => store.put(session));
export const getStoredBook = (id: string) => transaction<StoredBook | undefined>('books', 'readonly', store => store.get(id));
export const getStoredBooks = () => transaction<StoredBook[]>('books', 'readonly', store => store.getAll());

async function contentKey(session: StoredSession) {
  const material = new TextEncoder().encode(`${session.deviceId}:${session.token}:studykit-offline-v1`);
  const digest = await crypto.subtle.digest('SHA-256', material);
  return crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function cacheBook(book: LibraryBook, html: string, session: StoredSession) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await contentKey(session), new TextEncoder().encode(html));
  await transaction<IDBValidKey>('books', 'readwrite', store => store.put({
    id: book.id,
    title: book.title,
    subtitle: book.subtitle,
    cover: book.cover,
    coverImage: book.coverImage,
    iv,
    encrypted,
    savedAt: new Date().toISOString(),
  } satisfies StoredBook));
}

export async function readCachedBook(book: LibraryBook, session: StoredSession) {
  const stored = await getStoredBook(book.id);
  if (!stored) return null;
  const iv = new Uint8Array(stored.iv.length);
  iv.set(stored.iv);
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    await contentKey(session),
    stored.encrypted,
  );
  return new TextDecoder().decode(plain);
}
