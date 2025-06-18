/**
 * Boat Options Synchronization Utility
 * 
 * Synchronizes boat collection with input dropdown options in inputs.json
 * - Updates options for input_boat field in inputs.json
 * - Preserves all other configuration
 * 
 * @version 1.0
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Global variable to track last execution time
let lastSyncTime = 0;

/**
 * Capitalize first letter of a string
 * 
 * @param {string} string - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Synchronizes boat collection with input_boat options in inputs.json
 * 
 * @returns {void}
 */
export function syncBoatOptions() {
  // Anti-loop: check time elapsed since last execution
  const now = Date.now();
  if (now - lastSyncTime < 3000) { // Minimum 3 seconds between executions
    console.log("Boat options synchronization skipped (too recent execution)");
    return;
  }
  lastSyncTime = now;
  
  console.log("Starting boat options synchronization...");
  
  const boatsDir = './src/collection-boats';
  const inputsJsonPath = './src/_data/atoms/inputs.json';
  const headingsJsonPath = './src/_data/atoms/headings.json';
  
  // Check if directories exist
  if (!fs.existsSync(boatsDir)) {
    console.error(`Boats directory not found: ${boatsDir}`);
    return;
  }
  
  // Load inputs.json
  let inputsJson;
  try {
    inputsJson = JSON.parse(fs.readFileSync(inputsJsonPath, 'utf8'));
    console.log(`Inputs.json loaded with ${inputsJson.inputs.length} input fields`);
  } catch (error) {
    console.error('Error reading inputs.json:', error);
    return;
  }
  
  // Load headings.json to get model names
  let headingsJson;
  try {
    headingsJson = JSON.parse(fs.readFileSync(headingsJsonPath, 'utf8'));
    console.log(`Headings.json loaded with ${headingsJson.headings.length} headings`);
  } catch (error) {
    console.error('Error reading headings.json:', error);
    return;
  }
  
  // Create a map of model IDs to model names
  const modelMap = {};
  headingsJson.headings.forEach(heading => {
    modelMap[heading.name] = heading.text;
  });
  
  // Find the boat input field
  const boatInputIndex = inputsJson.inputs.findIndex(input => input.name === 'input_boat');
  
  if (boatInputIndex === -1) {
    console.error('Error: input_boat field not found in inputs.json');
    return;
  }
  
  // Process boat files
  const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
  console.log(`Processing ${boatFiles.length} boat files for input options`);
  
  // Create new options array
  const boatOptions = [];
  
  // Process each boat file
  boatFiles.forEach(file => {
    try {
      const boatFilePath = path.join(boatsDir, file);
      const boatContent = fs.readFileSync(boatFilePath, 'utf8');
      const boatData = matter(boatContent).data;
      
      // Extract boat information
      if (boatData.name && boatData.model) {
        // Extract technical name (without boat_ prefix)
        const technicalName = boatData.name.replace('boat_', '');
        
        // Capitalize first letter of technical name
        const displayName = capitalizeFirstLetter(technicalName);
        
        // Get the full model name from headings.json
        const modelName = modelMap[boatData.model] || boatData.model;
        
        // Create option for select
        boatOptions.push({
          value: technicalName,
          label: `${modelName} "${displayName}"`
        });
        
        console.log(`Added option: ${modelName} "${displayName}"`);
      }
    } catch (error) {
      console.error(`Error processing boat ${file}:`, error);
    }
  });
  
  // Sort options alphabetically by label
  boatOptions.sort((a, b) => a.label.localeCompare(b.label));
  
  // Update the boat input options
  inputsJson.inputs[boatInputIndex].options = boatOptions;
  
  // Write updated inputs.json
  fs.writeFileSync(inputsJsonPath, JSON.stringify(inputsJson, null, 2));
  console.log(`Updated inputs.json with ${boatOptions.length} boat options`);
}