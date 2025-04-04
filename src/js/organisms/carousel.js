/**
 * Carousel Component
 * 
 * Implements a flexible and responsive carousel/slider with:
 * - Automatic slide transitions
 * - Navigation controls (prev/next buttons)
 * - Indicator dots for direct slide access
 * - Light/dark theme support
 * - Pause on hover functionality
 * 
 * @version 5.7
 */
document.addEventListener("DOMContentLoaded", function () {
  // Select all carousels on the page
  const carousels = document.querySelectorAll("[data-carousel]");
  
  carousels.forEach(carousel => {
    initCarousel(carousel);
  });
  
  /**
   * Initializes a carousel with all its functionality
   * 
   * @param {HTMLElement} carousel - The carousel container element
   */
  function initCarousel(carousel) {
    const carouselId = carousel.id;
    const items = [...carousel.querySelectorAll("[data-carousel-item]")];
    const prevBtn = carousel.parentElement.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.parentElement.querySelector("[data-carousel-next]");
    const indicators = document.querySelectorAll(`[data-carousel-target="${carouselId}"]`);
    
    // Determine the indicator theme
    let theme = carousel.getAttribute("data-carousel-theme") || "auto";
    let isReversed = false;
    
    if (theme === "auto") {
      // Use enhanced detection logic
      let currentElement = carousel;
      while (currentElement && currentElement !== document.body) {
        if (currentElement.hasAttribute("data-reversed")) {
          isReversed = currentElement.getAttribute("data-reversed") === "true";
          break;
        }
        currentElement = currentElement.parentElement;
      }
    } else {
      // Use explicit theme
      isReversed = theme === "light"; // "light" = light background, dark indicators
    }
    
    console.log("Carousel:", carouselId, "Theme:", theme, "IsReversed:", isReversed);
    
    let index = 0;
    let autoplayInterval = null;
    
    // Add transition to all carousel items
    items.forEach(item => {
      item.classList.add("transition-opacity", "duration-700");
    });
    
    /**
     * Shows a specific slide by index
     * 
     * @param {number} newIndex - The index of the slide to show
     */
    function showSlide(newIndex) {
      // Hide current slide
      items[index].classList.remove("opacity-100");
      items[index].classList.add("opacity-0");
      
      // Calculate new index with wrapping
      index = (newIndex + items.length) % items.length;
      
      // Show new slide
      items[index].classList.remove("opacity-0");
      items[index].classList.add("opacity-100");
      
      // Update indicators
      updateIndicators();
    }
    
    /**
     * Updates the appearance of all indicators based on current slide
     */
    function updateIndicators() {
      indicators.forEach((indicator, i) => {
        // First remove active class from all indicators
        indicator.classList.remove("carousel-indicator-active");
        
        if (i === index) {
          // Add active class to current indicator
          indicator.classList.add("carousel-indicator-active");
          
          // Direct CSS styles (complementing the class)
          if (isReversed) {
            // Light background, blue indicators for reversed mode
            indicator.style.backgroundColor = "#2b3947"; // Blue (--ma-nautic-blue)
            indicator.style.opacity = "0.7";
          } else {
            // Blue/dark background, white indicators for standard mode
            indicator.style.backgroundColor = "#ffffff"; // White
            indicator.style.opacity = "0.8";
          }
        } else {
          // Styles for inactive indicators
          if (isReversed) {
            // Light background, blue indicators for reversed mode
            indicator.style.backgroundColor = "#2b3947"; // Blue (--ma-nautic-blue)
            indicator.style.opacity = "0.3";
          } else {
            // Blue/dark background, white indicators for standard mode
            indicator.style.backgroundColor = "#ffffff"; // White
            indicator.style.opacity = "0.3";
          }
        }
      });
    }
    
    // Apply initial indicator styles
    updateIndicators();
    
    // Event handler for previous button
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(index - 1);
        resetAutoplay();
      });
    }
    
    // Event handler for next button
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(index + 1);
        resetAutoplay();
      });
    }
    
    // Event handler for indicators
    indicators.forEach((indicator, i) => {
      indicator.addEventListener("click", () => {
        showSlide(i);
        resetAutoplay();
      });
    });
    
    /**
     * Resets autoplay timer after user interaction
     */
    function resetAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    }
    
    /**
     * Starts the autoplay functionality if enabled
     */
    function startAutoplay() {
      const autoplay = carousel.getAttribute("data-autoplay") === "true";
      
      if (autoplay) {
        autoplayInterval = setInterval(() => {
          showSlide(index + 1);
        }, 7000); // Auto-slide every 7 seconds
      }
    }
    
    // Handle pause on hover
    const pauseOnHover = carousel.getAttribute("data-pause-on-hover") === "true";
    
    if (pauseOnHover) {
      carousel.addEventListener("mouseenter", () => {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      });
      
      carousel.addEventListener("mouseleave", () => {
        startAutoplay();
      });
    }
    
    // Start autoplay if configured
    startAutoplay();
  }
});