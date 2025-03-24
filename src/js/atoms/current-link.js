// current-link.js - Detect and style active navigation links based on their context
document.addEventListener('DOMContentLoaded', function() {
  // Add global CSS for styling current links according to Ma-Nautic theme
  const style = document.createElement('style');
  style.textContent = `
    /* Specific styling for current navigation links */
    [aria-current="page"] {
      pointer-events: none !important; /* Disable hover entirely */
      cursor: pointer !important; /* But still look clickable */
      color: var(--ma-nautic-white) !important; /* Text stays white for active links */
    }
    
    /* Prevent hover effects on any child elements */
    [aria-current="page"] * {
      pointer-events: none !important;
    }
    
    /* Hide any pseudo-elements that might be used for hover effects */
    [aria-current="page"]::after,
    [aria-current="page"]::before {
      /* Instead of hiding completely, show the underline for active links */
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      width: 100% !important; /* Full width underline for active links */
      background-color: var(--ma-nautic-gold) !important; /* Gold color for underline */
      height: var(--ma-nautic-border-width-large) !important; /* Thicker underline */
    }
    
    /* For extra safety - specific targeting for navigation links */
    .ma-nautic-nav-link[aria-current="page"]::after {
      content: '' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: var(--ma-nautic-border-width-large) !important; /* Thicker underline */
      background-color: var(--ma-nautic-gold) !important; /* Gold color for underline */
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
      
      // Add Ma-Nautic specific class if it doesn't already have it
      if (!link.classList.contains('ma-nautic-nav-link')) {
        link.classList.add('ma-nautic-nav-link');
      }
      
      // Position the link relatively (needed for absolute positioning of indicator)
      link.classList.add('relative');
      
      // Determine if the link is in a secondary navigation
      const isSecondaryNav = isLinkInSecondaryNav(link);
      
      // Create and add the indicator line (only if not already using ma-nautic-nav-link style)
      if (!link.querySelector('.nav-indicator')) {
        const indicator = document.createElement('span');
        indicator.classList.add('nav-indicator');
        
        if (isSecondaryNav) {
          // For secondary navigation: indicator goes to the left
          indicator.className = 'nav-indicator absolute left-[-12px] top-1/2 w-2 h-5 bg-[var(--ma-nautic-gold)] rounded-full transform -translate-y-1/2';
        } else {
          // No need for additional indicator if using ma-nautic-nav-link
          // The ::after pseudo-element handles this
        }
        
        // Only add the indicator if it's in secondary nav
        if (isSecondaryNav) {
          link.appendChild(indicator);
        }
      }
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