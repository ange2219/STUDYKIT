import { createServer } from 'node:http';
import { randomBytes, createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { books, publicBook } from './books.mjs';
import { loadEnv } from './env.mjs';

await loadEnv();
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'server', 'data');
const DB_PATH = path.join(DATA_DIR, 'store.json');
const PORT = Number(process.env.API_PORT || 5052);
const isDevelopment = process.env.NODE_ENV === 'development';
const ADMIN_TOKEN = process.env.STUDYKIT_ADMIN_TOKEN || (isDevelopment ? 'studykit-dev-admin' : '');
const prefixes = { 'guide-pct4': 'PCT4', 'guide-pct3': 'PCT3', 'apprendre-mieux': 'AMMP', 'lecon-epreuve': 'DLEP' };
const demoCodes = [['SK-PCT4-7X92-K4LM', 'guide-pct4'], ['SK-PCT3-3K8D-M9QP', 'guide-pct3'], ['SK-AMMP-5R4N-8Q2L', 'apprendre-mieux'], ['SK-DLEP-6T3A-W9KC', 'lecon-epreuve']];
const sha = value => createHash('sha256').update(value).digest('hex');
const makeCode = bookId => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const group = () => Array.from(randomBytes(4), byte => chars[byte % chars.length]).join('');
  return `SK-${prefixes[bookId]}-${group()}-${group()}`;
};

await mkdir(DATA_DIR, { recursive: true });
let db;
try { db = JSON.parse(await readFile(DB_PATH, 'utf8')); }
catch {
  db = { secret: randomBytes(32).toString('hex'), codes: [], devices: [], entitlements: [] };
  if (isDevelopment) db.codes = demoCodes.map(([code, bookId]) => ({ hash: sha(code), bookId, createdAt: new Date().toISOString(), activatedAt: null, deviceId: null }));
  await writeFile(DB_PATH, JSON.stringify(db, null, 2), { mode: 0o600 });
}
let writeQueue = Promise.resolve();
function saveDb() {
  writeQueue = writeQueue.then(async () => {
    const tmp = `${DB_PATH}.tmp`;
    await writeFile(tmp, JSON.stringify(db, null, 2), { mode: 0o600 });
    await rename(tmp, DB_PATH);
  });
  return writeQueue;
}
const attempts = new Map();
function limited(ip) { const entry = attempts.get(ip); if (!entry || Date.now() - entry.started > 3600000) { attempts.set(ip, { started: Date.now(), count: 0 }); return false; } return entry.count >= 10; }
function recordFailure(ip) { const entry = attempts.get(ip) || { started: Date.now(), count: 0 }; entry.count += 1; attempts.set(ip, entry); }
function send(res, status, data) { res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store, private', 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' }); res.end(JSON.stringify(data)); }
async function bodyJson(req) { let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > 16384) throw new Error('payload_too_large'); } return raw ? JSON.parse(raw) : {}; }
const findBook = id => books.find(book => book.id === id);
const tokenFor = deviceId => createHmac('sha256', db.secret).update(`device:${deviceId}`).digest('base64url');
function authorizedDevice(req, deviceId) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const tokenHash = sha(token);
  return db.devices.find(item => item.id === deviceId && item.tokenHash === tokenHash && !item.revokedAt) || null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const ip = req.socket.remoteAddress || 'unknown';
  try {
    if (req.method === 'GET' && url.pathname === '/api/books') return send(res, 200, { books: books.map(publicBook) });
    if (req.method === 'POST' && url.pathname === '/api/activate') {
      if (limited(ip)) return send(res, 429, { error: 'Trop de tentatives. Réessayez plus tard.' });
      const body = await bodyJson(req);
      const code = String(body.code || '').toUpperCase().replace(/\s+/g, '');
      const deviceId = String(body.deviceId || '');
      if (!/^SK-[A-Z0-9]{3,5}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code) || !/^[a-f0-9-]{32,64}$/i.test(deviceId)) { recordFailure(ip); return send(res, 400, { error: 'Vérifiez le format du code et réessayez.' }); }
      const codeHash = sha(code);
      const activation = db.codes.find(item => item.hash === codeHash);
      if (!activation) { recordFailure(ip); return send(res, 404, { error: 'Ce code ne correspond à aucun livre StudyKit.' }); }
      if (activation.activatedAt && activation.deviceId !== deviceId) { recordFailure(ip); return send(res, 409, { error: 'Ce code a déjà été activé sur un autre appareil. Contactez StudyKit pour une réinitialisation.' }); }
      const book = findBook(activation.bookId);
      if (!book) return send(res, 500, { error: 'Le livre associé à ce code est indisponible.' });
      const now = new Date().toISOString();
      if (!activation.activatedAt) {
        activation.activatedAt = now;
        activation.deviceId = deviceId;
        db.entitlements.push({ bookId: book.id, deviceId, codeHash, activatedAt: now });
      }
      let device = db.devices.find(item => item.id === deviceId);
      if (!device) { device = { id: deviceId, createdAt: now, revokedAt: null, tokenHash: '' }; db.devices.push(device); }
      device.tokenHash = sha(tokenFor(deviceId));
      device.lastSeenAt = now;
      await saveDb();
      return send(res, 200, { token: tokenFor(deviceId), book: publicBook(book), message: 'Livre ajouté à votre bibliothèque.' });
    }
    if (req.method === 'GET' && url.pathname === '/api/library') {
      const deviceId = url.searchParams.get('deviceId') || '';
      if (!authorizedDevice(req, deviceId)) return send(res, 401, { error: 'Votre appareil doit être activé pour consulter la bibliothèque.' });
      const ids = new Set(db.entitlements.filter(item => item.deviceId === deviceId).map(item => item.bookId));
      return send(res, 200, { books: books.filter(book => ids.has(book.id)).map(publicBook) });
    }
    const contentMatch = url.pathname === '/api/book-content' ? [null, url.searchParams.get('bookId') || ''] : url.pathname.match(/^\/api\/books\/([a-z0-9-]+)\/content$/);
    if (req.method === 'GET' && contentMatch) {
      const deviceId = url.searchParams.get('deviceId') || '';
      if (!authorizedDevice(req, deviceId)) return send(res, 401, { error: 'Accès au livre non autorisé sur cet appareil.' });
      const book = findBook(contentMatch[1]);
      if (!book || !db.entitlements.some(item => item.deviceId === deviceId && item.bookId === book.id)) return send(res, 403, { error: 'Ce livre ne fait pas partie de votre bibliothèque.' });
      const html = await readFile(book.htmlPath, 'utf8');
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store, private', 'x-content-type-options': 'nosniff', 'content-security-policy': "default-src 'self' data: blob: https:; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; script-src 'none'; frame-ancestors 'none'" });
      return res.end(html);
    }
    if (url.pathname.startsWith('/api/admin/')) {
      if (!ADMIN_TOKEN) return send(res, 503, { error: 'Configurez STUDYKIT_ADMIN_TOKEN avant d’utiliser l’administration.' });
      const left = Buffer.from(String(req.headers['x-admin-token'] || ''));
      const right = Buffer.from(ADMIN_TOKEN);
      if (left.length !== right.length || !timingSafeEqual(left, right)) return send(res, 401, { error: 'Accès administrateur refusé.' });
      const body = await bodyJson(req);
      if (req.method === 'POST' && url.pathname === '/api/admin/codes') {
        const bookId = String(body.bookId || '');
        if (!findBook(bookId)) return send(res, 400, { error: 'Livre inconnu.' });
        const count = Number(body.count ?? 1);
        if (!Number.isInteger(count) || count < 1 || count > 500) return send(res, 400, { error: 'Choisissez un lot de 1 à 500 codes.' });
        const knownHashes = new Set(db.codes.map(item => item.hash));
        const codes = [];
        while (codes.length < count) {
          const code = makeCode(bookId);
          const hash = sha(code);
          if (knownHashes.has(hash)) continue;
          knownHashes.add(hash);
          db.codes.push({ hash, bookId, createdAt: new Date().toISOString(), activatedAt: null, deviceId: null });
          codes.push(code);
        }
        await saveDb();
        return send(res, 201, { code: codes[0], codes, bookId });
      }
      if (req.method === 'POST' && url.pathname === '/api/admin/reset') {
        const codeHash = sha(String(body.code || '').toUpperCase().replace(/\s+/g, ''));
        const activation = db.codes.find(item => item.hash === codeHash);
        if (!activation) return send(res, 404, { error: 'Code introuvable.' });
        if (activation.deviceId) db.entitlements = db.entitlements.filter(item => !(item.deviceId === activation.deviceId && item.codeHash === codeHash));
        activation.activatedAt = null;
        activation.deviceId = null;
        await saveDb();
        return send(res, 200, { message: 'Activation réinitialisée. Le code peut être réutilisé sur le nouvel appareil.' });
      }
    }
    return send(res, 404, { error: 'Adresse API inconnue.' });
  } catch (error) {
    console.error('StudyKit API error:', error?.message || 'unknown');
    const tooLarge = error?.message === 'payload_too_large';
    return send(res, tooLarge ? 413 : 500, { error: tooLarge ? 'Requête trop volumineuse.' : 'Une erreur est survenue. Réessayez.' });
  }
});
server.listen(PORT, '127.0.0.1', () => console.log(`StudyKit API prête sur http://127.0.0.1:${PORT}`));
