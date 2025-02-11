const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets directory to output
  eleventyConfig.addPassthroughCopy('./src/assets');
  // Copy main stylesheet to output
  eleventyConfig.addPassthroughCopy('./src/style.css');
  // Copy admin interface files to output
  eleventyConfig.addPassthroughCopy('./src/admin');
  // Add shortcode to display current year dynamically
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`); 
  // Add filter to format post date
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};