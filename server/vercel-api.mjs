import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { Client } from '@neondatabase/serverless';
import { get as getBlob } from '@vercel/blob';
import { books, publicBook } from '../server/books.mjs';

const prefixes = { 'guide-pct4': 'PCT4', 'guide-pct3': 'PCT3', 'apprendre-mieux': 'AMMP', 'lecon-epreuve': 'DLEP' };
const sha = value => createHash('sha256').update(value).digest('hex');
const tokenFor = id => createHmac('sha256', process.env.STUDYKIT_TOKEN_SECRET || '').update(`device:${id}`).digest('base64url');
const send = (res, status, data) => { res.status(status).setHeader('content-type', 'application/json; charset=utf-8'); res.setHeader('cache-control', 'no-store, private'); res.setHeader('x-content-type-options', 'nosniff'); res.end(JSON.stringify(data)); };
async function bodyJson(req) { let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > 16384) throw new Error('payload_too_large'); } return raw ? JSON.parse(raw) : {}; }
async function dbRun(fn) {
  if (!process.env.DATABASE_URL || !process.env.STUDYKIT_TOKEN_SECRET) throw new Error('cloud_env_missing');
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();
  try { return await fn(client); } finally { await client.end(); }
}
async function authorized(client, req, id) {
  const bearer = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!bearer || !id) return false;
  const result = await client.query('SELECT 1 FROM devices WHERE device_id=$1 AND token_hash=$2 AND revoked_at IS NULL', [id, sha(bearer)]);
  return result.rowCount > 0;
}
function newCode(bookId) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const group = () => Array.from(randomBytes(4), b => alphabet[b % alphabet.length]).join('');
  return `SK-${prefixes[bookId]}-${group()}-${group()}`;
}

export default async function handler(req, res) {
  const url = new URL(req.url || '/', `https://${req.headers.host || 'localhost'}`);
  const route = url.pathname.replace(/^\/api\/?/, '');
  try {
    if (req.method === 'GET' && route === 'books') return send(res, 200, { books: books.map(publicBook) });
    if (req.method === 'POST' && route === 'activate') {
      const body = await bodyJson(req);
      const code = String(body.code || '').toUpperCase().replace(/\s+/g, '');
      const deviceId = String(body.deviceId || '');
      if (!/^SK-[A-Z0-9]{3,5}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code) || !/^[a-f0-9-]{32,64}$/i.test(deviceId)) return send(res, 400, { error: 'Vérifiez le format du code et réessayez.' });
      const codeHash = sha(code);
      const result = await dbRun(async client => {
        await client.query('BEGIN');
        try {
          const ipKey = sha(`${process.env.STUDYKIT_TOKEN_SECRET}:${req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'}`);
          const rate = await client.query(`INSERT INTO activation_attempts(ip_hash,window_start,attempt_count) VALUES($1,NOW(),1)
            ON CONFLICT(ip_hash) DO UPDATE SET window_start=CASE WHEN activation_attempts.window_start < NOW()-INTERVAL '1 hour' THEN NOW() ELSE activation_attempts.window_start END,
            attempt_count=CASE WHEN activation_attempts.window_start < NOW()-INTERVAL '1 hour' THEN 1 ELSE activation_attempts.attempt_count+1 END RETURNING attempt_count`, [ipKey]);
          if (Number(rate.rows[0].attempt_count) > 10) { await client.query('ROLLBACK'); return { status: 429, error: 'Trop de tentatives. Réessayez plus tard.' }; }
          const found = await client.query('SELECT book_id,activated_at,device_id FROM activation_codes WHERE code_hash=$1 FOR UPDATE', [codeHash]);
          const activation = found.rows[0];
          if (!activation) { await client.query('COMMIT'); return { status: 404, error: 'Ce code ne correspond à aucun livre StudyKit.' }; }
          if (activation.activated_at && activation.device_id !== deviceId) { await client.query('COMMIT'); return { status: 409, error: 'Ce code a déjà été activé sur un autre appareil. Contactez StudyKit pour une réinitialisation.' }; }
          const book = books.find(item => item.id === activation.book_id);
          if (!book) { await client.query('ROLLBACK'); return { status: 500, error: 'Livre indisponible.' }; }
          const token = tokenFor(deviceId);
          await client.query('INSERT INTO devices(device_id,token_hash) VALUES($1,$2) ON CONFLICT(device_id) DO UPDATE SET token_hash=EXCLUDED.token_hash,last_seen_at=NOW()', [deviceId, sha(token)]);
          if (!activation.activated_at) {
            await client.query('UPDATE activation_codes SET activated_at=NOW(),device_id=$2 WHERE code_hash=$1', [codeHash, deviceId]);
            await client.query('INSERT INTO entitlements(device_id,book_id,code_hash) VALUES($1,$2,$3) ON CONFLICT(device_id,book_id) DO NOTHING', [deviceId, book.id, codeHash]);
          }
          await client.query('COMMIT');
          return { status: 200, token, book: publicBook(book) };
        } catch (error) { await client.query('ROLLBACK'); throw error; }
      });
      return result.status === 200 ? send(res, 200, { token: result.token, book: result.book, message: 'Livre ajouté à votre bibliothèque.' }) : send(res, result.status, { error: result.error });
    }
    if (req.method === 'GET' && route === 'library') {
      const id = url.searchParams.get('deviceId') || '';
      return dbRun(async client => {
        if (!await authorized(client, req, id)) return send(res, 401, { error: 'Votre appareil doit être activé pour consulter la bibliothèque.' });
        const owned = await client.query('SELECT DISTINCT book_id FROM entitlements WHERE device_id=$1', [id]);
        const ids = new Set(owned.rows.map(row => row.book_id));
        return send(res, 200, { books: books.filter(book => ids.has(book.id)).map(publicBook) });
      });
    }
    const match = route === 'book-content' ? [null, url.searchParams.get('bookId') || ''] : route.match(/^books\/([a-z0-9-]+)\/content$/);
    if (req.method === 'GET' && match && match[1]) {
      const id = url.searchParams.get('deviceId') || '';
      const bookId = match[1];
      return dbRun(async client => {
        if (!await authorized(client, req, id)) return send(res, 401, { error: 'Accès au livre non autorisé sur cet appareil.' });
        const own = await client.query('SELECT 1 FROM entitlements WHERE device_id=$1 AND book_id=$2', [id, bookId]);
        if (!own.rowCount) return send(res, 403, { error: 'Ce livre ne fait pas partie de votre bibliothèque.' });
        const index = Number(url.searchParams.get('part') || 0);
        if (!Number.isSafeInteger(index) || index < 0) return send(res, 400, { error: 'Partie invalide.' });
        const parts = await client.query('SELECT part_index,pathname FROM book_content_parts WHERE book_id=$1 ORDER BY part_index', [bookId]);
        const part = parts.rows.find(row => Number(row.part_index) === index);
        if (!part) return send(res, 404, { error: 'Contenu du livre indisponible.' });
        const blob = await getBlob(part.pathname, { access: 'private' });
        if (!blob || blob.statusCode !== 200) return send(res, 404, { error: 'Contenu du livre indisponible.' });
        const bytes = Buffer.from(await new Response(blob.stream).arrayBuffer());
        res.status(200).setHeader('content-type', 'application/octet-stream'); res.setHeader('content-length', bytes.length);
        res.setHeader('cache-control', 'no-store, private'); res.setHeader('x-book-parts', parts.rowCount); res.setHeader('x-book-part', index); res.setHeader('x-content-type-options', 'nosniff');
        return res.end(bytes);
      });
    }
    if (route.startsWith('admin/') || route.startsWith('admin-')) {
      const secret = Buffer.from(process.env.STUDYKIT_ADMIN_TOKEN || '');
      const provided = Buffer.from(String(req.headers['x-admin-token'] || ''));
      if (!secret.length || secret.length !== provided.length || !timingSafeEqual(secret, provided)) return send(res, 401, { error: 'Accès administrateur refusé.' });
      const body = await bodyJson(req);
      if (req.method === 'POST' && (route === 'admin/codes' || route === 'admin-codes')) {
        const bookId = String(body.bookId || ''); const count = Number(body.count ?? 1);
        if (!prefixes[bookId]) return send(res, 400, { error: 'Livre inconnu.' });
        if (!Number.isInteger(count) || count < 1 || count > 500) return send(res, 400, { error: 'Choisissez un lot de 1 à 500 codes.' });
        return dbRun(async client => {
          const codes = []; await client.query('BEGIN');
          try {
            while (codes.length < count) { const code = newCode(bookId); const saved = await client.query('INSERT INTO activation_codes(code_hash,book_id) VALUES($1,$2) ON CONFLICT DO NOTHING RETURNING code_hash', [sha(code), bookId]); if (saved.rowCount) codes.push(code); }
            await client.query('COMMIT'); return send(res, 201, { code: codes[0], codes, bookId });
          } catch (error) { await client.query('ROLLBACK'); throw error; }
        });
      }
      if (req.method === 'POST' && (route === 'admin/reset' || route === 'admin-reset')) {
        const hash = sha(String(body.code || '').toUpperCase().replace(/\s+/g, ''));
        return dbRun(async client => {
          await client.query('BEGIN');
          try {
            const found = await client.query('SELECT code_hash FROM activation_codes WHERE code_hash=$1 FOR UPDATE', [hash]);
            if (!found.rowCount) { await client.query('ROLLBACK'); return send(res, 404, { error: 'Code introuvable.' }); }
            await client.query('DELETE FROM entitlements WHERE code_hash=$1', [hash]); await client.query('UPDATE activation_codes SET activated_at=NULL,device_id=NULL WHERE code_hash=$1', [hash]);
            await client.query('COMMIT'); return send(res, 200, { message: 'Activation réinitialisée. Le code peut être réutilisé sur le nouvel appareil.' });
          } catch (error) { await client.query('ROLLBACK'); throw error; }
        });
      }
    }
    return send(res, 404, { error: 'Adresse API inconnue.' });
  } catch (error) {
    console.error('StudyKit API error:', error?.message || 'unknown');
    if (error?.message === 'payload_too_large') return send(res, 413, { error: 'Requête trop volumineuse.' });
    if (error?.message === 'cloud_env_missing') return send(res, 503, { error: 'La base de données ou la clé StudyKit n’est pas configurée.' });
    return send(res, 500, { error: 'Une erreur est survenue. Réessayez.' });
  }
}
