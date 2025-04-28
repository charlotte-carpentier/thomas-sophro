import { DateTime } from "luxon";
import { sortBoatsByPrice } from './src/js/utils/price-utils.js';

export default function (eleventyConfig) {
  // Passthrough pour les fichiers statiques
  eleventyConfig.addPassthroughCopy('./src/assets'); // Copier le dossier assets
  eleventyConfig.addPassthroughCopy('./src/admin');  // Copier le dossier admin (pour Netlify CMS)
  eleventyConfig.addPassthroughCopy('./src/docs');   // Copier le dossier docs
  eleventyConfig.addPassthroughCopy('./src/js');     // Copier le dossier js (pour les scripts personnalisés)
  eleventyConfig.addPassthroughCopy('_redirects');    // Copier le fichier _redirects

  // Passthrough pour robots.txt
  eleventyConfig.addPassthroughCopy('./src/robots.txt');  // Copier robots.txt

  // Copier sitemap.xml du dossier src vers public
  eleventyConfig.addPassthroughCopy('./src/sitemap.xml');  // Copier sitemap.xml

  // Shortcode pour obtenir l'année actuelle
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Filter pour formater les dates des posts
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Filter pour vérifier si une chaîne se termine par un suffixe donné
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Filter pour trier les bateaux par prix
  eleventyConfig.addFilter("sortByPrice", sortBoatsByPrice);

  // Collection personnalisée pour les carrousels
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });

  // Collection personnalisée pour les bateaux
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  // Watch target pour les changements dans la collection des bateaux
  eleventyConfig.addWatchTarget("./src/collection-boats/");

  // Configuration de la structure des dossiers
  return {
    dir: {
      input: "src",  // Dossier des fichiers source
      output: "public",  // Dossier de sortie (build)
    }
  };
}
