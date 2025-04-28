import fs from 'fs';
import path from 'path';

// Chemin vers ton fichier sitemap.xml (ajuste ce chemin selon ton projet)
const sitemapPath = path.resolve(process.cwd(), 'sitemap.xml');  // Utilise process.cwd() pour obtenir le chemin correct

// La nouvelle date à insérer dans le sitemap (au format "YYYY-MM-DD")
const currentDate = new Date().toISOString().split('T')[0]; // Format: "2025-04-28"

// Lire le fichier sitemap.xml
fs.readFile(sitemapPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur de lecture du fichier sitemap.xml', err);
    return;
  }

  // Remplacer toutes les occurrences de <lastmod> avec la date actuelle
  const updatedData = data.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`);

  // Écrire le contenu modifié dans le fichier sitemap.xml
  fs.writeFile(sitemapPath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Erreur de sauvegarde du fichier sitemap.xml', err);
      return;
    }
    console.log(`Sitemap mis à jour avec la date : ${currentDate}`);
  });
});
