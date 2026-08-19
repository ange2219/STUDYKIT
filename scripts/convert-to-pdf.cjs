const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

async function convertToPdf() {
  console.log('🚀 Démarrage de la conversion du livre en PDF haute fidélité sans marges parasites...');

  // Détection du navigateur Chromium installé (Chrome ou Edge)
  const possiblePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  const executablePath = possiblePaths.find(p => fs.existsSync(p));
  if (!executablePath) {
    throw new Error('Aucun navigateur Chromium trouvé (Chrome ou Edge).');
  }

  console.log(`🔍 Utilisation de : ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--font-render-hinting=max'
    ]
  });

  const page = await browser.newPage();

  // Émuler le support d'impression pour activer le CSS @media print
  await page.emulateMediaType('print');

  const htmlUrl = 'http://localhost:5050/ebook-apprendre-mieux.html';
  console.log(`🌐 Chargement du document depuis ${htmlUrl}...`);

  await page.goto(htmlUrl, {
    waitUntil: ['load', 'networkidle0'],
    timeout: 60000
  });

  // Assurer le rendu des polices
  await page.evaluateHandle('document.fonts.ready');

  // Injection forcée du style d'impression pleine page A4 sans bordure parasite
  await page.addStyleTag({
    content: `
      @page {
        size: 210mm 297mm !important;
        margin: 0 !important;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        width: 210mm !important;
        height: 297mm !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .cover-page, .flow {
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        width: 210mm !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-width: 210mm !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
      }
      .cover {
        width: 210mm !important;
        height: 297mm !important;
        margin: 0 !important;
      }
      .flow {
        padding: 24mm 20mm 22mm 20mm !important;
      }
    `
  });

  const outputPath = path.resolve(__dirname, '..', 'Apprendre-Mieux-Pas-Seulement-Plus.pdf');
  const publicDownloadPath = path.resolve(__dirname, '..', 'public', 'Studykit-KITE01-Mieux-Apprendre-Ses-Cours.pdf');

  console.log('📄 Impression du PDF A4 pleine page en cours...');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    }
  });

  // Copie vers le dossier public pour téléchargement sur le site
  fs.copyFileSync(outputPath, publicDownloadPath);

  const stats = fs.statSync(outputPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

  console.log(`✅ Ebook PDF généré avec succès en pleine page A4 !`);
  console.log(`📁 Fichier 1 : ${outputPath} (${sizeMb} Mo)`);
  console.log(`📁 Fichier 2 (Public) : ${publicDownloadPath}`);

  await browser.close();
}

convertToPdf().catch(err => {
  console.error('❌ Erreur lors de la conversion en PDF :', err);
  process.exit(1);
});
