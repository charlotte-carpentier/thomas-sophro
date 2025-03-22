// current-link.js - Detect and style active navigation links based on their context
document.addEventListener('DOMContentLoaded', function() {
  // Add global CSS for completely disabling hover effects on current links
  const style = document.createElement('style');
  style.textContent = `
    /* Aggressive solution to prevent ANY hover effects on current links */
    [aria-current="page"] {
      pointer-events: none !important; /* Disable hover entirely */
      cursor: pointer !important; /* But still look clickable */
      color: #9ca3af !important; /* Force text-gray-400 color */
    }
    
    /* Prevent hover effects on any child elements */
    [aria-current="page"] * {
      pointer-events: none !important;
    }
    
    /* Hide any pseudo-elements that might be used for hover effects */
    [aria-current="page"]::after,
    [aria-current="page"]::before,
    [aria-current="page"] *::after,
    [aria-current="page"] *::before {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
    }
    
    /* For extra safety - specific targeting for navigation links */
    .navigation-secondary [data-nav-link][aria-current="page"]:hover::after,
    .navigation-secondary [data-nav-link][aria-current="page"]:hover::before,
    nav [data-nav-link][aria-current="page"]:hover::after,
    nav [data-nav-link][aria-current="page"]:hover::before {
      display: none !important;
      content: none !important;
    }
  `;
  document.head.appendChild(style);

  // Get current path
  const currentPath = window.location.pathname;
  
  // Find all navigation links (with data-nav-link attribute)
  const navLinks = document.querySelectorAll('[data-nav-link]');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Consider a link active if it matches the current path
    // or if it's a parent path (not the homepage)
    const isActive = 
      currentPath === href || 
      (href !== '/' && currentPath.startsWith(href));
    
    if (isActive) {
      // Mark as active for accessibility
      link.setAttribute('aria-current', 'page');
      
      // Remove any existing text color classes that might conflict
      link.classList.remove('text-gray-900', 'text-gray-800', 'text-gray-700', 'text-gray-600');
      
      // Set the text color to gray-400 for all current links
      link.classList.add('text-gray-400');
      
      // Position the link relatively (needed for absolute positioning of indicator)
      link.classList.add('relative');
      
      // Determine if the link is in a secondary navigation
      const isSecondaryNav = isLinkInSecondaryNav(link);
      
      // Create and add the indicator line
      const indicator = document.createElement('span');
      
      if (isSecondaryNav) {
        // For secondary navigation: indicator goes to the left
        // Smaller height (h-5 instead of h-8) and rounded corners (rounded-full)
        indicator.className = 'absolute left-[-12px] top-1/2 w-1 h-5 bg-gray-400 rounded-full transform -translate-y-1/2';
      } else {
        // For primary navigation: indicator goes to the bottom
        indicator.className = 'absolute left-1/2 bottom-[-8px] w-8 h-1 bg-gray-400 rounded-full transform -translate-x-1/2';
      }
      
      // Add the indicator to the link
      link.appendChild(indicator);
    }
  });
  
  /**
   * Checks if a link is inside a secondary navigation by traversing up the DOM tree
   * @param {HTMLElement} link - The link element to check
   * @return {boolean} - True if the link is inside a secondary navigation
   */
  function isLinkInSecondaryNav(link) {
    // Look for parent with navigation element
    let parent = link.parentElement;
    
    // Traverse up to find navigation container
    while (parent && parent.tagName !== 'NAV') {
      parent = parent.parentElement;
    }
    
    // If no container found, return false
    if (!parent) return false;
    
    // Check if it's a secondary navigation
    return parent.classList.contains('navigation-secondary') || 
           parent.hasAttribute('data-nav-secondary') || 
           // Check if any parent element has a class that contains "secondary"
           parent.closest('[class*="secondary"]') !== null;
  }
});