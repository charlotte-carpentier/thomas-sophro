/**
 * Scroll to Top Button
 * 
 * Shows/hides scroll-to-top button based on header visibility
 * Provides smooth scroll to top functionality
 * 
 * @version 1.1 - Fixed speed
 */

document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopButton = document.getElementById('scroll-to-top-btn');
  const header = document.querySelector('.header-thomas');
  
  if (!scrollToTopButton || !header) {
    console.warn('Scroll-to-top: Button or header not found');
    return;
  }

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
    if (isHeaderVisible()) {
      scrollToTopButton.classList.remove('visible');
    } else {
      scrollToTopButton.classList.add('visible');
    }
  }

  /**
   * INSTANT scroll to top - no animation
   */
  function scrollToTop() {
    window.scrollTo(0, 0);
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