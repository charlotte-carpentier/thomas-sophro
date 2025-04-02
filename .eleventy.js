import { DateTime } from "luxon";
import fs from 'fs';
import path from 'path';

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

  // Create a custom collection for carousels
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });
  // Create a custom collection for boats
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  };
}