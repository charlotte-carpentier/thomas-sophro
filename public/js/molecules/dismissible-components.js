/**
 * Dismissible Component Handler
 * 
 * This script enables dismiss functionality for components such as toast messages, 
 * disclaimers, alerts, and multi-select chips. It listens for clicks on elements 
 * with the `data-dismiss` attribute and applies a fade-out animation before hiding them.
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Dismisses a component by adding opacity transition and removing it after animation.
   * 
   * @param {HTMLElement} element - The element to be dismissed.
   * @param {number} animationDuration - Duration of the fade-out animation in milliseconds (default: 300ms).
   */
  function dismissComponent(element, animationDuration = 300) {
    if (element) {
      // Apply opacity transition effect
      element.classList.add('opacity-0', 'transition-opacity', 'duration-300');

      // Wait for animation to complete before removing the element
      setTimeout(() => {
        element.remove();
      }, animationDuration);
    }
  }

  /**
   * Global click listener to detect dismiss button clicks.
   * It searches for the closest dismissible component and triggers the dismiss function.
   */
  document.addEventListener('click', (event) => {
    // Prevent default behavior to avoid unintended reloads
    event.preventDefault();

    // Find the closest element with the `data-dismiss` attribute
    const dismissButton = event.target.closest('[data-dismiss]');
    
    if (dismissButton) {
      // Locate the nearest parent that is a dismissible component
      const component = dismissButton.closest('[data-toast], [data-disclaimer], [data-alert], [data-chip-multiselect]');
      
      if (component) {
        dismissComponent(component);
      }
    }
  });
});
