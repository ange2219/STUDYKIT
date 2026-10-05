import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { Client } from '@neondatabase/serverless';
import { put } from '@vercel/blob';
import { books } from '../server/books.mjs';
import { loadEnv } from '../server/env.mjs';

await loadEnv();

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Configurez DATABASE_URL et BLOB_READ_WRITE_TOKEN dans .env avant cette commande.');
  process.exit(1);
}

const client = new Client(databaseUrl);
const partBytes = 3 * 1024 * 1024;
try {
  await client.connect();
  const schema = await readFile(path.join(root, 'server/schema.sql'), 'utf8');
  for (const statement of schema.split(';').map(value => value.trim()).filter(Boolean)) await client.query(statement);

  for (const book of books) {
    const html = await readFile(book.htmlPath);
    const digest = createHash('sha256').update(html).digest('hex').slice(0, 16);
    const count = Math.ceil(html.length / partBytes);
    const uploaded = [];
    console.log(`Publication privée : ${book.title} (${(html.length / 1024 / 1024).toFixed(1)} Mo)`);
    for (let index = 0; index < count; index += 1) {
      const pathname = `studykit/books/${book.id}/${digest}/part-${String(index).padStart(3, '0')}.html`;
      const part = html.subarray(index * partBytes, Math.min((index + 1) * partBytes, html.length));
      const blob = await put(pathname, part, { access: 'private', addRandomSuffix: false, contentType: 'application/octet-stream' });
      uploaded.push({ index, pathname: blob.pathname, length: part.length });
    }
    await client.query('BEGIN');
    try {
      await client.query('DELETE FROM book_content_parts WHERE book_id=$1', [book.id]);
      for (const part of uploaded) {
        await client.query('INSERT INTO book_content_parts(book_id,part_index,pathname,byte_length) VALUES($1,$2,$3,$4)', [book.id, part.index, part.pathname, part.length]);
      }
      await client.query('COMMIT');
    } catch (error) { await client.query('ROLLBACK'); throw error; }
    console.log(`  ${count} partie(s) stockée(s) en privé.`);
  }
} catch (error) {
  console.error('Publication des livres interrompue :', error instanceof Error ? error.message : 'erreur inconnue');
  process.exitCode = 1;
} finally {
  await client.end().catch(() => undefined);
}
