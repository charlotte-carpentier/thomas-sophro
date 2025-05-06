/**
 * Sitemap Update Utilities
 * 
 * Automatically updates the sitemap.xml file with current dates:
 * - Locates the sitemap.xml file in the src directory
 * - Updates all <lastmod> tags with the current date
 * - Saves the updated sitemap back to the original location
 * 
 * @version 1.0
 */

import fs from 'fs';
import path from 'path';

/**
 * Updates all lastmod dates in the sitemap.xml file to current date
 * Reads the existing sitemap, modifies dates, and writes it back
 * Provides console logging for verification and debugging
 * 
 * @returns {void}
 */
// Specify path to sitemap.xml file in src folder
const sitemapPath = path.resolve(process.cwd(), 'src/sitemap.xml');

// Log file path to confirm it's correct
console.log(`Path to sitemap.xml file: ${sitemapPath}`);

// Get current date in "YYYY-MM-DD" format for sitemap
const currentDate = new Date().toISOString().split('T')[0]; // Format: "2025-04-28"

// Read sitemap.xml file
fs.readFile(sitemapPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading sitemap.xml file', err);
    return;
  }

  // Verify file was read correctly
  console.log('Sitemap.xml content before update:', data);

  // Replace all <lastmod> occurrences with current date
  const updatedData = data.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`);

  // Verify changes before writing
  console.log('Updated sitemap.xml content:', updatedData);

  // Write modified content back to sitemap.xml
  fs.writeFile(sitemapPath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error saving sitemap.xml file', err);
      return;
    }
    console.log(`Sitemap updated with date: ${currentDate}`);
  });
});