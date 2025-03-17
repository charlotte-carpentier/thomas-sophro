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

  // Add shortcode to include SVG content directly (useful for icons)
  eleventyConfig.addShortcode("svgContents", function(filepath) {
    if (!filepath) {
      console.warn("No filepath provided to svgContents shortcode");
      return "<!-- No SVG filepath provided -->";
    }
    
    // Remove leading slash if present
    const cleanPath = filepath.startsWith('/') ? filepath.substring(1) : filepath;
    
    // Make the path relative to the project root
    const absolutePath = path.join(process.cwd(), 'src', cleanPath);
    
    try {
      if (fs.existsSync(absolutePath)) {
        const svgContent = fs.readFileSync(absolutePath, 'utf8');
        return svgContent;
      } else {
        console.warn(`SVG file not found: ${absolutePath}`);
        return `<!-- SVG not found: ${filepath} -->`;
      }
    } catch (err) {
      console.error(`Error reading SVG file ${filepath}:`, err);
      return `<!-- Error reading SVG: ${filepath} -->`;
    }
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  };
}