/**
 * Active Navigation Link Highlighter
 * 
 * Robust solution for navigation link animation with:
 * - Automatic current page detection
 * - Animated underlines
 * - Hover and focus interactions
 * - Accessibility improvements
 * - Prevention of click on current page link
 * - Disabled home logo click when on homepage
 * 
 * @version 3.8
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('[data-nav-link]');
  
  // Find the active link and store a reference
  let activeLink = null;
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
    
    // Determine if this is the active link
    const isActive = currentPath === href || 
      (href !== '/' && currentPath.startsWith(href));
    
    if (isActive) {
      // Mark as active for accessibility
      link.setAttribute('aria-current', 'page');
      activeLink = link;
      
      // Disable active link (prevent navigation)
      link.addEventListener('click', function(event) {
        event.preventDefault();
      });
      
      // Keep cursor as pointer for user experience
      link.style.cursor = 'default';
      
      // Ensure navigation link class is applied
      if (!link.classList.contains('ma-nautic-nav-link')) {
        link.classList.add('ma-nautic-nav-link');
      }
    }
  });
  
  // If no active link is found, exit here
  if (!activeLink) return;
  
  // Create elements for the animation
  // We'll create real DOM elements rather than using pseudo-elements
  // for better control
  
  // Create gold underline element (default)
  const goldUnderline = document.createElement('span');
  goldUnderline.className = 'active-link-gold-underline';
  goldUnderline.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px; /* equivalent to var(--ma-nautic-border-width-large) */
    background-color: #e8ab55; /* equivalent to var(--ma-nautic-gold) */
    transition: all 600ms;
    z-index: 1;
  `;
  
  // Create teal underline element (for hover effect)
  const tealUnderline = document.createElement('span');
  tealUnderline.className = 'active-link-teal-underline';
  tealUnderline.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px; /* equivalent to var(--ma-nautic-border-width-large) */
    background-color: #63a595; /* equivalent to var(--ma-nautic-teal) */
    transition: all 600ms;
    z-index: 2;
  `;
  
  // Ensure active link has position: relative
  activeLink.style.position = 'relative';
  
  // Add underlines to active link
  activeLink.appendChild(goldUnderline);
  activeLink.appendChild(tealUnderline);
  
  // Add event listeners to other navigation links
  navLinks.forEach(link => {
    if (link !== activeLink) {
      // When hovering over another link
      link.addEventListener('mouseenter', function() {
        // Animation: gold moves out to the right
        goldUnderline.style.width = '0';
        goldUnderline.style.left = '100%';
        
        // Animation: teal enters from the left
        tealUnderline.style.width = '100%';
      });
      
      // When leaving another link
      link.addEventListener('mouseleave', function() {
        // Animation: gold returns from the left
        goldUnderline.style.width = '100%';
        goldUnderline.style.left = '0';
        
        // Animation: teal disappears to the right
        tealUnderline.style.width = '0';
      });
    }
  });
  
  // Handle case when mouse leaves navigation completely
  const navContainer = document.querySelector('[data-nav-container]');
  if (navContainer) {
    navContainer.addEventListener('mouseleave', function() {
      // Reset to default state
      goldUnderline.style.width = '100%';
      goldUnderline.style.left = '0';
      tealUnderline.style.width = '0';
    });
  }
});