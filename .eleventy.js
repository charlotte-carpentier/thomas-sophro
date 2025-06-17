import dotenv from 'dotenv';

// Initialize dotenv for environment variables
dotenv.config();

export default function (eleventyConfig) {
  // Static files passthrough
  eleventyConfig.addPassthroughCopy('./src/assets'); // Copy assets folder
  eleventyConfig.addPassthroughCopy('./src/admin');  // Copy admin folder (for Netlify CMS)
  eleventyConfig.addPassthroughCopy('./src/docs');   // Copy docs folder
  eleventyConfig.addPassthroughCopy('./src/js');     // Copy js folder (for custom scripts)

  // Passthrough for robots.txt and sitemap.xml
  eleventyConfig.addPassthroughCopy('./src/robots.txt');
  eleventyConfig.addPassthroughCopy('./src/sitemap.xml');

  // Shortcode to get current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Filter to check if a string ends with a given suffix
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Folder structure configuration
  return {
    dir: {
      input: "src",    // Source files folder
      output: "public" // Output (build) folder
    }
  };
}
