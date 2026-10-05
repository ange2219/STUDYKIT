import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const devEnv = { ...process.env, NODE_ENV: process.env.NODE_ENV || 'development' };
const api = spawn(process.execPath, ['server/index.mjs'], { cwd: root, stdio: 'inherit', env: devEnv });
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js'], { cwd: root, stdio: 'inherit', env: process.env });
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  api.kill();
  vite.kill();
  process.exitCode = code;
}
api.on('exit', code => { if (!stopping) { console.error('L’API StudyKit s’est arrêtée.'); stop(code || 1); } });
vite.on('exit', code => { if (!stopping) stop(code || 0); });
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
