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

  // Add filter to sort boats by price (extracts number from price string)
  eleventyConfig.addFilter("sortByPrice", function(boats) {
    if (!boats || !Array.isArray(boats)) {
      console.warn("sortByPrice filter called with invalid input:", boats);
      return boats; // Return as-is if not an array
    }
    
    return [...boats].sort((a, b) => {
      // Make sure a and b have data.price property
      if (!a.data || !a.data.price || !b.data || !b.data.price) {
        console.warn("Boat missing price data:", a, b);
        return 0; // Don't change order if data is missing
      }
      
      // Extract numeric price from string using regex
      const priceRegex = /(\d+)/;
      
      const priceAMatch = a.data.price.match(priceRegex);
      const priceBMatch = b.data.price.match(priceRegex);
      
      // Default values in case a price doesn't match expected format
      const priceA = priceAMatch ? parseInt(priceAMatch[0]) : 9999;
      const priceB = priceBMatch ? parseInt(priceBMatch[0]) : 9999;
      
      // Return difference for ascending sort
      return priceA - priceB;
    });
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