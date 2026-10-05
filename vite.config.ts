import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { rm } from 'node:fs/promises'
import path from 'node:path'

const publicPrivateFiles = new Set([
  '/ebook-apprendre-mieux.html',
  '/ebook-de-la-lecon-a-l-epreuve.html',
  '/Studykit-KITE01-Mieux-Apprendre-Ses-Cours.pdf',
  '/Studykit-KITE02-De-La-Lecon-A-L-Epreuve.pdf',
  '/Apprendre mieux, pas seulement plus ebook.pdf',
  '/De la lecon à l’épreuve ebook.pdf',
  '/De-La-Lecon-A-L-Epreuve.pdf',
])

function privateBookFiles(): Plugin {
  return {
    name: 'studykit-private-book-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        let pathname = new URL(req.url || '/', 'http://localhost').pathname
        try { pathname = decodeURIComponent(pathname) } catch { /* garder le chemin brut */ }
        const schoolBook = /^\/(2nde|3ieme|4ieme)\/pct\/.*\.html$/i.test(pathname)
        const privateFile = publicPrivateFiles.has(pathname) || pathname.toLowerCase().endsWith('.pdf')
        if (schoolBook || privateFile) {
          res.statusCode = 404
          res.end('Contenu disponible uniquement après activation dans StudyKit.')
          return
        }
        next()
      })
    },
    async closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist')
      await Promise.all([...publicPrivateFiles].map(file => rm(path.join(outDir, file.slice(1)), { force: true })))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), privateBookFiles()],
  server: { port: 5050, strictPort: false, open: true, proxy: { '/api': 'http://127.0.0.1:5052' } },
  preview: { port: 5051, strictPort: false, open: true },
})



