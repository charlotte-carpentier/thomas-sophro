// active-links.js - Detect and style active navigation links
document.addEventListener('DOMContentLoaded', function() {
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
      
      // Make sure the link is positioned relatively
      link.classList.add('relative', 'text-gray-900');
      
      // Create and add the indicator line
      const indicator = document.createElement('span');
      
      // Add Tailwind classes for styling
      indicator.className = 'absolute left-1/2 bottom-[-8px] w-8 h-1 bg-gray-400 rounded-full transform -translate-x-1/2';
      
      // Add the indicator to the link
      link.appendChild(indicator);
    }
  });
});