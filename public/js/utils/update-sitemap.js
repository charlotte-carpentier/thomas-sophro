import fs from 'fs';
import path from 'path';

// Spécifie le chemin vers le fichier sitemap.xml dans le dossier src
const sitemapPath = path.resolve(process.cwd(), 'src/sitemap.xml');

// Affiche le chemin du fichier pour confirmer qu'il est correct
console.log(`Chemin vers le fichier sitemap.xml : ${sitemapPath}`);

// La nouvelle date à insérer dans le sitemap (au format "YYYY-MM-DD")
const currentDate = new Date().toISOString().split('T')[0]; // Format: "2025-04-28"

// Lire le fichier sitemap.xml
fs.readFile(sitemapPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur de lecture du fichier sitemap.xml', err);
    return;
  }

  // Vérification de la lecture du fichier
  console.log('Contenu du sitemap.xml avant mise à jour :', data);

  // Remplacer toutes les occurrences de <lastmod> avec la date actuelle
  const updatedData = data.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`);

  // Vérification des modifications avant d'écrire
  console.log('Contenu mis à jour du sitemap.xml :', updatedData);

  // Écrire le contenu modifié dans le fichier sitemap.xml
  fs.writeFile(sitemapPath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Erreur de sauvegarde du fichier sitemap.xml', err);
      return;
    }
    console.log(`Sitemap mis à jour avec la date : ${currentDate}`);
  });
});
