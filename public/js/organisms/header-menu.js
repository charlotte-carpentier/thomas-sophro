/**
 * Header Mobile Menu Controller
 * 
 * Manages the mobile navigation menu with:
 * - Toggle button animation (rotation)
 * - Dropdown menu visibility
 * - Dynamic sizing based on data attributes
 * - Smooth transitions
 * 
 * @version 3.1
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector(".toggle-button");
    const dropdown = document.querySelector(".dropdown-menu");

    if (toggleBtn && dropdown) {
        // Dynamically retrieve button sizes and styles
        const containerSize = toggleBtn.dataset.containerSize || 'w-8 h-8';
        const iconSize = toggleBtn.dataset.iconSize || '32';

        // Adjust toggle button z-index
        toggleBtn.style.position = 'relative';
        toggleBtn.style.zIndex = '50';
        
        // Add size classes dynamically
        toggleBtn.classList.add(...containerSize.split(' '));
        
        // Explicit rotation with CSS class rather than inline style
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .toggle-rotate {
                transition: transform 0.5s ease;
            }
            .toggle-rotate.active {
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(styleElement);
        
        // Add transition class to button
        toggleBtn.classList.add('toggle-rotate');
        
        /**
         * Toggle button click handler
         * Controls menu visibility and button rotation
         */
        toggleBtn.addEventListener("click", () => {
            // Toggle active class for rotation
            toggleBtn.classList.toggle('active');
            
            if (toggleBtn.classList.contains('active')) {
                // Open menu
                dropdown.classList.remove('-top-full');
                dropdown.classList.add('top-16');
                dropdown.classList.add('pt-24');
            } else {
                // Close menu
                dropdown.classList.remove('top-16');
                dropdown.classList.remove('pt-24');
                dropdown.classList.add('-top-full');
            }
        });
    }
});