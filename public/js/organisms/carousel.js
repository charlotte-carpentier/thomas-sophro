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
 * @version 6.0
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
    if (!carouselId) {
      console.error("Carousel must have an ID attribute");
      return;
    }
    
    console.log(`Initializing carousel #${carouselId}`);
    
    // Core elements
    const items = [...carousel.querySelectorAll("[data-carousel-item]")];
    if (items.length === 0) {
      console.error(`No carousel items found for carousel #${carouselId}`);
      return;
    }
    
    // Navigation buttons
    const prevBtn = carousel.parentElement.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.parentElement.querySelector("[data-carousel-next]");
    
    // Find all indicators that target this carousel
    // IMPORTANT FIX: In the HTML template, indicators have both data-carousel-target AND data-carousel-indicator
    const indicators = [...document.querySelectorAll(`[data-carousel-target="${carouselId}"]`)];
    console.log(`Found ${indicators.length} indicators for carousel #${carouselId}`);
    
    // Theme detection
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
    
    // Visual appearance settings
    const activeColor = isReversed ? "#2b3947" : "#ffffff"; // Blue or White
    const activeOpacity = isReversed ? "0.7" : "0.8";
    const inactiveOpacity = "0.3";
    
    // State variables
    let currentIndex = 0;
    let autoplayInterval = null;
    let transitionLock = false;
    
    /**
     * Shows a specific slide by index
     * 
     * @param {number} targetIndex - The index of the slide to show
     */
    function showSlide(targetIndex) {
      // Prevent rapid transitions and normalize index
      if (transitionLock) return;
      transitionLock = true;
      
      // Calculate valid index with wrapping
      const newIndex = (targetIndex + items.length) % items.length;
      
      // Skip if trying to show current slide
      if (newIndex === currentIndex) {
        transitionLock = false;
        return;
      }
      
      console.log(`Carousel #${carouselId}: changing slide from ${currentIndex} to ${newIndex}`);
      
      // Hide all slides first then show the target slide
      items.forEach((item, i) => {
        if (i === newIndex) {
          item.classList.remove("opacity-0");
          item.classList.add("opacity-100");
        } else {
          item.classList.remove("opacity-100");
          item.classList.add("opacity-0");
        }
      });
      
      // Update state BEFORE updating indicators
      currentIndex = newIndex;
      
      // Update indicators to match new state
      updateIndicators();
      
      // Release transition lock after animation completes
      setTimeout(() => {
        transitionLock = false;
      }, 700); // Match to transition duration
    }
    
    /**
     * Updates all indicator dots based on the current slide
     */
    function updateIndicators() {
      console.log(`Updating indicators for carousel #${carouselId}, current slide: ${currentIndex}`);
      
      indicators.forEach((indicator, i) => {
        // Get the indicator index from the data attribute, or use loop index if not available
        const indicatorIndex = parseInt(indicator.getAttribute("data-carousel-indicator"), 10);
        const indexToUse = isNaN(indicatorIndex) ? i : indicatorIndex;
        
        // Remove active class from all indicators
        indicator.classList.remove("carousel-indicator-active");
        
        // Update visual state based on whether this indicator matches current slide
        if (indexToUse === currentIndex) {
          // This indicator represents the current slide - make it active
          indicator.classList.add("carousel-indicator-active");
          indicator.style.backgroundColor = activeColor;
          indicator.style.opacity = activeOpacity;
        } else {
          // This indicator is inactive
          indicator.style.backgroundColor = activeColor;
          indicator.style.opacity = inactiveOpacity;
        }
      });
    }
    
    // Apply initial state for all slides
    items.forEach((item, i) => {
      if (i === 0) {
        // First slide is visible
        item.classList.add("opacity-100");
        item.classList.remove("opacity-0");
      } else {
        // All other slides are hidden
        item.classList.add("opacity-0");
        item.classList.remove("opacity-100");
      }
    });
    
    // Apply initial indicator styles
    updateIndicators();
    
    // Event listeners for navigation
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        resetAutoplay();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        resetAutoplay();
      });
    }
    
    // Event listeners for direct indicator clicks
    indicators.forEach((indicator) => {
      indicator.addEventListener("click", () => {
        // Get the index from the data attribute
        const clickedIndex = parseInt(indicator.getAttribute("data-carousel-indicator"), 10);
        
        if (!isNaN(clickedIndex)) {
          console.log(`Indicator for index ${clickedIndex} clicked for carousel #${carouselId}`);
          showSlide(clickedIndex);
          resetAutoplay();
        }
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
          // Move to next slide
          showSlide(currentIndex + 1);
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