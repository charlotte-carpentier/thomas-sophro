/**
 * Active Navigation Link Highlighter
 * 
 * Robust solution for navigation link animation with:
 * - Immediate current page link styling
 * - Active link gold text color 
 * - Animated gold underline on hover for other links
 * - Accessibility improvements
 * - Prevention of click on current page link
 * 
 * @version 4.2
 */
(function() {
  // Function to handle current page link
  function setupCurrentPageLink() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const currentPath = window.location.pathname;

    // Check if we're on the homepage
    const isHomePage = currentPath === '/' || currentPath === '/index.html';
    
    // If on homepage, disable the logo link
    if (isHomePage) {
      const logoLink = document.querySelector('header a[href="/"]');
      if (logoLink) {
        logoLink.addEventListener('click', function(event) {
          event.preventDefault();
        });
        logoLink.style.cursor = 'default';
        logoLink.setAttribute('aria-current', 'page');
        logoLink.setAttribute('title', 'Page d\'accueil (page actuelle)');
      }
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const isActive = 
        currentPath === href || 
        (href !== '/' && currentPath.startsWith(href)) ||
        (href === '/' && (currentPath === '/' || currentPath === '/index.html'));

      if (isActive) {
        // Immediately mark as current page
        link.setAttribute('aria-current', 'page');
        
        // Style for current page link
        link.style.color = '#e8ab55'; // Gold color
        link.style.pointerEvents = 'none';
        link.style.cursor = 'default';
        
        // Prevent default click
        link.addEventListener('click', function(event) {
          event.preventDefault();
        });
      }
    });
  }

  // Add hover effect to non-current links
  function addHoverEffects() {
    const navLinks = document.querySelectorAll('[data-nav-link]:not([aria-current="page"])');
    
    navLinks.forEach(link => {
      // Ensure link has relative positioning
      link.style.position = 'relative';
      
      // Create hover underline element
      const hoverUnderline = document.createElement('span');
      hoverUnderline.className = 'hover-gold-underline';
      hoverUnderline.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #e8ab55;
        transition: width 600ms ease;
        z-index: 1;
      `;
      
      // Add underline to link
      link.appendChild(hoverUnderline);
      
      // Hover events
      link.addEventListener('mouseenter', function() {
        hoverUnderline.style.width = '100%';
      });
      
      link.addEventListener('mouseleave', function() {
        hoverUnderline.style.width = '0';
      });
    });
  }

  // Run setup immediately and on page load
  setupCurrentPageLink();
  addHoverEffects();

  // Re-run on dynamic content changes if needed
  document.addEventListener('DOMContentLoaded', function() {
    setupCurrentPageLink();
    addHoverEffects();
  });
})();