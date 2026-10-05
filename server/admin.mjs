import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from './env.mjs';
import { books } from './books.mjs';

await loadEnv();
const [action, value, countArg] = process.argv.slice(2);
const token = process.env.STUDYKIT_ADMIN_TOKEN || (process.env.NODE_ENV === 'development' ? 'studykit-dev-admin' : '');
if (!token) {
  console.error('Définissez STUDYKIT_ADMIN_TOKEN dans .env avant cette commande.');
  process.exit(1);
}
const localRoute = action === 'code' || action === 'codes' ? '/api/admin/codes' : action === 'reset' ? '/api/admin/reset' : '';
const route = process.env.STUDYKIT_API_URL ? (action === 'code' || action === 'codes' ? '/api/admin-codes' : action === 'reset' ? '/api/admin-reset' : '') : localRoute;
if (!route || !value || (action === 'codes' && (!/^\d+$/.test(countArg || '') || Number(countArg) < 1 || Number(countArg) > 500))) {
  console.error('Usage : npm run admin:code -- <id-livre> | npm run admin:codes -- <id-livre> <quantité 1-500> | npm run admin:reset -- <code>');
  process.exit(1);
}
const apiBase = (process.env.STUDYKIT_API_URL || `http://127.0.0.1:${process.env.API_PORT || 5052}`).replace(/\/$/, '');
const payload = action === 'code' || action === 'codes'
  ? { bookId: value, ...(action === 'codes' ? { count: Number(countArg) } : {}) }
  : { code: value };
try {
  const response = await fetch(apiBase + route, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-admin-token': token },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'La demande a échoué.');
  if (action === 'code') console.log('Code à transmettre à l’acheteur : ' + data.code);
  else if (action === 'codes') {
    const book = books.find(item => item.id === value);
    const exportDir = path.resolve('server/data/exports');
    await mkdir(exportDir, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportPath = path.join(exportDir, 'studykit-' + value + '-' + timestamp + '.txt');
    await writeFile(exportPath, data.codes.join('\n') + '\n', { flag: 'wx', mode: 0o600 });
    console.log(data.codes.length + ' codes uniques créés pour ' + (book?.title || value) + '.');
    console.log('Fichier à importer dans le stock de licences Chariow : ' + exportPath);
    console.log('Le fichier contient les codes en clair : importez-le dans Chariow, puis gardez-le en lieu sûr.');
  } else console.log(data.message);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'API StudyKit indisponible.');
  process.exitCode = 1;
}
