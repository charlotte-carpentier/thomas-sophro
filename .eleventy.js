import { DateTime } from "luxon";
import fs from 'fs';
import path from 'path';
import { syncBoatImages } from './src/js/utils/sync-boat-images.js';
import { sortBoatsByPrice } from './src/js/utils/price-utils.js';

export default function (eleventyConfig) {
  // Copy static assets directory to output
  eleventyConfig.addPassthroughCopy('./src/assets');
  // Copy admin interface files to output
  eleventyConfig.addPassthroughCopy('./src/admin');
  // Copy docs files to output
  eleventyConfig.addPassthroughCopy('./src/docs');
  // Copy JavaScript files to output
  eleventyConfig.addPassthroughCopy('./src/js');

  // Add shortcode to display current year dynamically
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add filter to format post date
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Add endsWith filter for string comparison (used for SVG detection)
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Add filter to sort boats by price (maintenant utilisant notre utilitaire)
  eleventyConfig.addFilter("sortByPrice", sortBoatsByPrice);

  // Create a custom collection for carousels
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });
  
  // Create a custom collection for boats
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  // Ignorer les fichiers JSON et les carousels pour éviter les boucles infinies
  eleventyConfig.watchIgnores.add("./src/_data/atoms/images.json");
  eleventyConfig.watchIgnores.add("./src/_data/atoms/headings.json");
  eleventyConfig.watchIgnores.add("./src/collection-carousels/**/*.md");

  // Synchroniser les images des bateaux avec les carousels et images.json
  // Uniquement au démarrage et lors des modifications des bateaux
  eleventyConfig.on('beforeBuild', syncBoatImages);
  
  // Option supplémentaire : ajouter un event handler pour surveiller les changements des bateaux spécifiquement
  eleventyConfig.addWatchTarget("./src/collection-boats/");

  return {
    dir: {
      input: "src",
      output: "public",
    }
  };
}