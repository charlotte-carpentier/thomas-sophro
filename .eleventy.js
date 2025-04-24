import { DateTime } from "luxon";
import fs from 'fs';
import path from 'path';
import { syncBoatImages } from './src/js/utils/sync-boat-images.js';
import { sortBoatsByPrice } from './src/js/utils/price-utils.js';

export default function (eleventyConfig) {
  // Copy static assets directory to output folder
  eleventyConfig.addPassthroughCopy('./src/assets');
  
  // Copy admin interface files to output folder
  eleventyConfig.addPassthroughCopy('./src/admin');
  
  // Copy documentation files to output folder
  eleventyConfig.addPassthroughCopy('./src/docs');
  
  // Copy JavaScript files to output folder
  eleventyConfig.addPassthroughCopy('./src/js');
  
  // Copy _redirects file to output folder for Netlify redirection management
  eleventyConfig.addPassthroughCopy('_redirects');
  
  // Add a shortcode to dynamically display the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add a filter to format post date using Luxon
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Add a filter to check if a string ends with a given suffix (used for SVG detection)
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Add a filter to sort boats by price (using our custom utility)
  eleventyConfig.addFilter("sortByPrice", sortBoatsByPrice);

  // Create a custom collection for carousel items
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });

  // Create a custom collection for boats
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  // Ignore certain files to avoid infinite loops during the watch process
  eleventyConfig.watchIgnores.add("./src/_data/atoms/images.json");
  eleventyConfig.watchIgnores.add("./src/_data/atoms/headings.json");
  eleventyConfig.watchIgnores.add("./src/collection-carousels/**/*.md");

  // Synchronize boat images with carousels and images.json before build
  // This only runs once at the start and when boat data is modified
  eleventyConfig.on('beforeBuild', syncBoatImages);

  // Add an additional watch target for boat collection changes specifically
  eleventyConfig.addWatchTarget("./src/collection-boats/");

  return {
    dir: {
      input: "src",  // Input directory (source files)
      output: "public",  // Output directory (final build)
    }
  };
}