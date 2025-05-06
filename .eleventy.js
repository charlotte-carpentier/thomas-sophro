import { sortBoatsByPrice } from './src/js/utils/price-utils.js';

export default function (eleventyConfig) {
  // Static files passthrough
  eleventyConfig.addPassthroughCopy('./src/assets'); // Copy assets folder
  eleventyConfig.addPassthroughCopy('./src/admin');  // Copy admin folder (for Netlify CMS)
  eleventyConfig.addPassthroughCopy('./src/docs');   // Copy docs folder
  eleventyConfig.addPassthroughCopy('./src/js');     // Copy js folder (for custom scripts)
  eleventyConfig.addPassthroughCopy('_redirects');   // Copy _redirects file

  // Passthrough for robots.txt
  eleventyConfig.addPassthroughCopy('./src/robots.txt');  // Copy robots.txt

  // Copy sitemap.xml from src folder to public
  eleventyConfig.addPassthroughCopy('./src/sitemap.xml');  // Copy sitemap.xml

  // Shortcode to get current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Filter to check if a string ends with a given suffix
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Filter to sort boats by price
  eleventyConfig.addFilter("sortByPrice", sortBoatsByPrice);

  // Custom collection for carousels
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });

  // Custom collection for boats
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  // Watch target for changes in boat collection
  eleventyConfig.addWatchTarget("./src/collection-boats/");

  // Folder structure configuration
  return {
    dir: {
      input: "src",  // Source files folder
      output: "public",  // Output (build) folder
    }
  };
}