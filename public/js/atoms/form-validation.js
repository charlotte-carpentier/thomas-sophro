/**
 * Form validation utility for Ma-Nautic
 * 
 * This script provides client-side validation for form inputs
 * based on HTML5 validation attributes (required, pattern)
 * 
 * @author Charlie
 */

/**
 * Validates an input field based on its pattern and required attributes
 * @param {HTMLElement} input - The input element to validate
 * @param {string} patternMessage - Custom message for pattern validation failure
 * @param {string} requiredMessage - Custom message for required field
 */
function validateInput(input, patternMessage, requiredMessage) {
    // Get error span
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (!errorSpan) return;
    
    // Apply base classes
    let baseClasses = input.className.split(' ')
      .filter(cls => !cls.startsWith('border-'))
      .join(' ');
    
    // Check if field is empty but required
    if (input.required && !input.value.trim()) {
      input.className = `${baseClasses} border-red-500`;
      errorSpan.textContent = requiredMessage || "Ce champ est obligatoire";
      errorSpan.style.display = 'block';
      return;
    }
    
    // If field has pattern and value doesn't match
    if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
      input.className = `${baseClasses} border-red-500`;
      errorSpan.textContent = patternMessage || "Format invalide";
      errorSpan.style.display = 'block';
      return;
    }
    
    // Check select without selected value
    if (input.tagName === 'SELECT' && input.required && !input.value) {
      input.className = `${baseClasses} border-red-500`;
      errorSpan.textContent = requiredMessage || "Veuillez sélectionner une option";
      errorSpan.style.display = 'block';
      return;
    }
    
    // Valid input
    input.className = `${baseClasses} border-gray-300`;
    errorSpan.style.display = 'none';
  }
  
  /**
   * Validates all inputs in a form
   * @param {HTMLFormElement} form - The form to validate
   * @returns {boolean} - True if all inputs are valid
   */
  function validateForm(form) {
    let isValid = true;
    
    // Validate all inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      // Trigger validation
      const event = new Event('blur');
      input.dispatchEvent(event);
      
      // Check if input has error
      const errorSpan = document.getElementById(`${input.id}-error`);
      if (errorSpan && errorSpan.style.display !== 'none') {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // Add form validation to all forms when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        if (!validateForm(this)) {
          event.preventDefault();
          // Scroll to first error
          const firstError = form.querySelector('[id$="-error"][style*="block"]');
          if (firstError) {
            firstError.previousElementSibling.focus();
            firstError.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  });