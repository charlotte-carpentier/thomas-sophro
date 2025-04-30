/**
 * Header Scroll Effect
 * 
 * Adds fixed header functionality with logo size change on scroll
 * - Adds 'fixed-header' class when scrolling down
 * - Toggles between main and alternate header styles
 * - Handles smooth transitions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get the header element
    const header = document.querySelector('header');
    // Get the logo container
    const logoContainer = header.querySelector('div[class*="logoContainerStyle"]');
    // Get the logo element
    const logo = logoContainer.querySelector('a');
    
    // Default logo size classes from data attributes
    const defaultLogoSizeClasses = logo.getAttribute('data-default-size') || '';
    const scrolledLogoSizeClasses = logo.getAttribute('data-scrolled-size') || '';
    
    // Get header name for switching between main and alternate
    const headerName = header.getAttribute('data-header-name') || 'main';
    
    // Function to handle scroll
    function handleScroll() {
      const scrollPosition = window.scrollY;
      
      // Add fixed header class when scrolling down (after 100px)
      if (scrollPosition > 100) {
        header.classList.add('fixed-header');
        
        // Change logo size when scrolled
        if (scrolledLogoSizeClasses) {
          logo.className = scrolledLogoSizeClasses;
        }
        
        // Switch to alternate header if not already
        if (headerName === 'main') {
          header.setAttribute('data-current-header', 'alternate');
          // You might want to trigger a re-render or style switch here
        }
      } else {
        header.classList.remove('fixed-header');
        
        // Restore original logo size
        if (defaultLogoSizeClasses) {
          logo.className = defaultLogoSizeClasses;
        }
        
        // Switch back to main header
        if (headerName === 'main') {
          header.setAttribute('data-current-header', 'main');
          // You might want to trigger a re-render or style switch here
        }
      }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
  });