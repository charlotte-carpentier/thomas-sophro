/**
 * Fixed Header Utilities
 * 
 * Manages the fixed header behavior across the site:
 * - Creates a spacer element to prevent content jumping
 * - Ensures header stays fixed at the top at all times
 * - Handles mobile menu positioning for responsive display
 * - Adjusts layout on window resize events
 * 
 * @version 1.0
 */

/**
 * Initializes the fixed header functionality
 * Ensures the header remains at the top of the viewport
 * Adjusts dropdown menu positioning for mobile devices
 * 
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', function() {
  // Select header and menu elements
  const header = document.querySelector('header');
  const toggleBtn = document.querySelector(".toggle-button");
  const dropdown = document.querySelector(".dropdown-menu");
  
  // Exit if header is not found
  if (!header) return;
  
  // Create spacer with same height as header
  const spacer = document.createElement('div');
  spacer.id = 'header-spacer';
  header.parentNode.insertBefore(spacer, header.nextSibling);
  
  // Remove shadow-bottom from header (ensure no shadow)
  header.classList.remove('shadow-bottom');
  
  // Store original background color
  const headerBgColor = window.getComputedStyle(header).backgroundColor;
  
  /**
   * Updates spacer height to match header
   * Prevents content jump when header becomes fixed
   */
  function updateSpacer() {
    const headerHeight = header.offsetHeight;
    spacer.style.height = headerHeight + 'px';
  }
  
  /**
   * Sets header to fixed position
   * Configures all necessary styles for fixed positioning
   */
  function fixHeader() {
    // Configure header as fixed
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.width = '100%';
    header.style.zIndex = '40';
    header.style.backgroundColor = headerBgColor;
    header.style.boxShadow = 'none'; // Ensure no shadow
    
    // Adjust dropdown menu in mobile mode
    if (dropdown && window.innerWidth < 1024) {
      dropdown.style.position = 'fixed';
      dropdown.style.width = '100%';
    }
    
    // Update spacer height
    updateSpacer();
  }
  
  // Mobile menu toggle event handler
  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', function() {
      // Ensure dropdown stays properly positioned
      if (window.innerWidth < 1024) {
        dropdown.style.position = 'fixed';
        dropdown.style.width = '100%';
      }
    });
  }
  
  // Window resize event listener
  window.addEventListener('resize', function() {
    updateSpacer();
    
    // Adjust dropdown position based on screen size
    if (dropdown) {
      if (window.innerWidth < 1024) {
        dropdown.style.position = 'fixed';
        dropdown.style.width = '100%';
      } else {
        dropdown.style.position = '';
        dropdown.style.width = '';
      }
    }
  });
  
  // Initialize header
  fixHeader();
});