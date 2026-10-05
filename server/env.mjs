const fs = await import('node:fs/promises');
const path = await import('node:path');
const { fileURLToPath } = await import('node:url');

export async function loadEnv() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  let content = '';
  try { content = await fs.readFile(path.join(root, '.env'), 'utf8'); } catch { return; }
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || match[1] in process.env) continue;
    process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, '$2');
  }
}
