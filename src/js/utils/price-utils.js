/**
 * Price Utilities
 * 
 * Collection of utility functions for price handling:
 * - Numeric price extraction from strings
 * - Boat sorting by price
 * - Validation and error handling
 * 
 * @version 1.2
 */

/**
 * Extracts the numeric value from a price string
 * 
 * @param {string} priceString - The string containing a price (e.g. "230 €/day")
 * @param {number} defaultValue - Value to return in case of failure (default: 9999)
 * @returns {number} - The extracted numeric value
 */
export function extractNumericPrice(priceString, defaultValue = 9999) {
  // Check that the input is a string
  if (!priceString || typeof priceString !== 'string') {
    console.warn(`Invalid price: ${priceString}`);
    return defaultValue;
  }
  
  // Use regex to extract the first number found
  const priceRegex = /(\d+)/;
  const match = priceString.match(priceRegex);
  
  // If a number is found, convert it to a number, otherwise return the default value
  return match ? parseInt(match[0], 10) : defaultValue;
}

/**
 * Sorts an array of boats by price (ascending)
 * 
 * @param {Array} boats - Array of boats with a data.price property
 * @returns {Array} - Array sorted by price
 */
export function sortBoatsByPrice(boats) {
  if (!boats || !Array.isArray(boats)) {
    console.warn("sortBoatsByPrice called with invalid input:", boats);
    return boats; // Return as is if not an array
  }
  
  return [...boats].sort((a, b) => {
    // Check that a and b have the data.price property
    if (!a.data || !a.data.price || !b.data || !b.data.price) {
      console.warn("Boat without price data:", a, b);
      return 0; // Don't change the order if data is missing
    }
    
    // Extract and compare prices
    const priceA = extractNumericPrice(a.data.price);
    const priceB = extractNumericPrice(b.data.price);
    
    // Return the difference for ascending sort
    return priceA - priceB;
  });
}