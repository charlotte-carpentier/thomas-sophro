import { DateTime } from "luxon";
import { sortBoatsByPrice } from './src/js/utils/price-utils.js';

export default function (eleventyConfig) {
  // Copie des fichiers statiques dans le dossier de sortie
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy('./src/docs');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('_redirects');

  // Shortcode pour l'année actuelle
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Filtre pour formater la date des posts
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Filtre pour vérifier si une chaîne de caractères se termine par un suffixe
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Filtre pour trier les bateaux par prix
  eleventyConfig.addFilter("sortByPrice", sortBoatsByPrice);

  // Collection personnalisée pour les carrousels
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });

  // Collection personnalisée pour les bateaux
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  // Ajouter une cible de surveillance pour les modifications des collections de bateaux
  eleventyConfig.addWatchTarget("./src/collection-boats/");

  return {
    dir: {
      input: "src",  // Dossier des fichiers source
      output: "public",  // Dossier de sortie (build final)
    }
  };
}
