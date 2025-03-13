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

  // Import styles from atoms.json
  try {
    const filePath = path.join('src', '_data', 'styles', 'atoms.json');
    const atomsContent = fs.readFileSync(filePath, 'utf8');
    const styles = JSON.parse(atomsContent);

    // Add styles directly to the global environment
    eleventyConfig.addGlobalData("styles", styles);
    console.log("🔍 styles:", JSON.stringify(styles, null, 2));

    console.log("✅ Styles loaded successfully from atoms.json:", styles);
  } catch (error) {
    console.error("❌ Error loading styles from atoms.json:", error.message);
  }

  return {
    dir: {
      input: "src",
      output: "public",
    }
  };
}