/**
 * Smooth Section Scrolling Utility
 * 
 * Enhances page navigation with:
 * - Custom smooth scrolling to section anchors
 * - Easing function for natural movement
 * - Browser history management
 * - Optimized animation frames
 * 
 * @version 1.3
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script section-scroll.js loaded.");
    
    /**
     * Custom smooth scrolling function with precise options
     * 
     * @param {HTMLElement} target - The element to scroll to
     * @param {number} duration - Duration of the scroll animation in milliseconds
     */
    function smoothScroll(target, duration = 800) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        /**
         * Animation frame callback function
         * 
         * @param {number} currentTime - Current timestamp from requestAnimationFrame
         */
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        /**
         * Easing function for more natural scrolling
         * Using quadratic ease-in-out function
         * 
         * @param {number} t - Current time
         * @param {number} b - Start value
         * @param {number} c - Change in value
         * @param {number} d - Duration
         * @returns {number} Calculated position
         */
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Add smooth scrolling behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Use custom smooth scrolling
                smoothScroll(targetElement);
                
                // Update URL with anchor (optional)
                history.pushState(null, null, targetId);
            }
        });
    });
});