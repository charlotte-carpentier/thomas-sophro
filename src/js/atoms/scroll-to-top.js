/**
 * Scroll to Top Button
 * 
 * Shows/hides scroll-to-top button based on header visibility
 * Provides smooth scroll to top functionality
 * 
 * @version 1.0
 */

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopButton = document.getElementById('scroll-to-top-btn');
  const header = document.querySelector('.header-thomas');
  
  if (!scrollToTopButton || !header) {
    console.warn('Scroll-to-top: Button or header not found');
    return;
  }

  let isScrolling = false;

  /**
   * Check if header is visible in viewport
   * @returns {boolean} True if header is visible
   */
  function isHeaderVisible() {
    const headerRect = header.getBoundingClientRect();
    return headerRect.bottom > 0;
  }

  /**
   * Toggle scroll-to-top button visibility
   */
  function toggleScrollButton() {
    if (isScrolling) return; // Prevent toggle during smooth scroll
    
    if (isHeaderVisible()) {
      scrollToTopButton.classList.remove('visible');
    } else {
      scrollToTopButton.classList.add('visible');
    }
  }

  /**
   * Smooth scroll to top of page
   */
  function scrollToTop() {
    isScrolling = true;
    scrollToTopButton.classList.remove('visible'); // Hide immediately when clicked
    
    // Custom smooth scroll with slower duration
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 1500; // 1.5 seconds instead of default ~500ms
    
    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, startPosition * (1 - easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        isScrolling = false;
      }
    }
    
    requestAnimationFrame(animateScroll);
  }

  // Event listeners
  window.addEventListener('scroll', toggleScrollButton, { passive: true });
  scrollToTopButton.addEventListener('click', scrollToTop);
  
  // Initial check on page load
  toggleScrollButton();
});

/**
 * Usage Notes:
 * 
 * 1. Add the scroll-to-top button to your HTML:
 *    <div id="scroll-to-top-btn" class="scroll-to-top">
 *      {{ renderButton({ name: "btn_scroll_top", datas: atoms.button.buttons }) }}
 *    </div>
 * 
 * 2. Include this script in your page:
 *    <script src="/js/scroll-to-top.js"></script>
 * 
 * 3. Make sure your header has class "header-thomas"
 */