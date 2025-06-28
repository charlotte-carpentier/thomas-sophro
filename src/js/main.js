/**
 * Main JavaScript file that imports all required components
 */

// Main initialization code
document.addEventListener('DOMContentLoaded', () => {
  console.log('HAT Dynamic Template initialized');
  
  // Initialize ACC-Card functionality if function exists
  if (typeof initAccCards === 'function') {
    initAccCards();
    console.log('ACC-Card components initialized');
  }
  
  // Initialize Reco-Card functionality if function exists
  if (typeof initRecoCards === 'function') {
    initRecoCards();
    console.log('Reco-Card components initialized');
  }
});