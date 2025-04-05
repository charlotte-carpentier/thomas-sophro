/**
 * Enhanced Form Validation Utility for Ma-Nautic
 * 
 * Provides robust client-side form validation with:
 * - Input sanitization
 * - Advanced validation
 * - Internationalization support
 * - Accessibility improvements
 * 
 * @author Charlie
 * @version 2.0
 */
class EnhancedFormValidator {
  /**
   * Constructor for form validator
   * @param {string} formId - ID of the form to validate
   * @param {Object} config - Validation configuration
   * @param {Object} options - Additional validation options
   */
  constructor(formId, config, options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      console.error(`Form with ID ${formId} not found`);
      return;
    }

    this.config = config;
    this.options = {
      lang: 'fr',
      maxLength: 500,
      sanitize: true,
      debug: false,
      ...options
    };

    this.initValidation();
  }

  /**
   * Sanitize input to prevent XSS
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  sanitizeInput(input) {
    if (!this.options.sanitize) return input;
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .trim();
  }

  /**
   * Advanced email validation
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  validateEmail(email) {
    // Comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }

  /**
   * Advanced phone number validation
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Whether phone number is valid
   */
  validatePhone(phone) {
    // International phone number validation
    const phoneRegex = /^(\+?[0-9]{1,4}[-\s]?)?(\([0-9]{1,4}\)[-\s]?)?[0-9]{1,5}[-\s]?[0-9]{1,5}([-\s]?[0-9]{1,5})?([-\s]?[0-9]{1,5})?$/;
    return phoneRegex.test(phone);
  }

  /**
   * Get localized error messages
   * @param {string} type - Type of error
   * @param {string} lang - Language code
   * @returns {string} Localized error message
   */
  getErrorMessage(type, lang = 'fr') {
    const messages = {
      fr: {
        required: 'Ce champ est obligatoire',
        email: 'Veuillez entrer un email valide',
        phone: 'Numéro de téléphone invalide',
        maxLength: 'Le champ est trop long',
        pattern: 'Format invalide'
      },
      en: {
        required: 'This field is required',
        email: 'Please enter a valid email',
        phone: 'Invalid phone number',
        maxLength: 'Field is too long',
        pattern: 'Invalid format'
      }
    };

    return messages[lang][type] || messages['fr'][type];
  }

  /**
   * Validate a single input
   * @param {HTMLInputElement} input - Input to validate
   * @returns {boolean} Whether input is valid
   */
  validateInput(input) {
    // Sanity check
    if (!input) return true;

    // Get associated error span
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (!errorSpan) return true;

    // Sanitize input value
    const value = this.sanitizeInput(input.value);
    
    // Only update value when sanitization changes it
    // Ceci évite de perturber la saisie normale de l'utilisateur
    if (value !== input.value) {
      input.value = value;
    }

    // Reset error state
    errorSpan.textContent = '';
    errorSpan.style.display = 'none';
    input.setAttribute('aria-invalid', 'false');

    // Get validation rules
    const rules = this.config[input.name] || {};

    // Required field validation
    if (rules.required && (!value || value.trim() === '')) {
      this.showError(input, errorSpan, 
        this.getErrorMessage('required', this.options.lang)
      );
      return false;
    }

    // Skip further validation for empty optional fields
    if (!rules.required && !value) return true;

    // Max length validation
    const maxLength = input.maxLength || this.options.maxLength;
    if (maxLength && value.length > maxLength) {
      this.showError(input, errorSpan, 
        this.getErrorMessage('maxLength', this.options.lang)
      );
      return false;
    }

    // Type-specific validations
    switch(input.type) {
      case 'email':
        if (!this.validateEmail(value)) {
          this.showError(input, errorSpan, 
            this.getErrorMessage('email', this.options.lang)
          );
          return false;
        }
        break;
      case 'tel':
        if (!this.validatePhone(value)) {
          this.showError(input, errorSpan, 
            this.getErrorMessage('phone', this.options.lang)
          );
          return false;
        }
        break;
    }

    // Pattern validation
    if (input.pattern && !new RegExp(input.pattern).test(value)) {
      this.showError(input, errorSpan, 
        this.getErrorMessage('pattern', this.options.lang)
      );
      return false;
    }

    // Debug logging
    if (this.options.debug) {
      console.log(`Validation passed for ${input.name}`);
    }

    return true;
  }

  /**
   * Show validation error
   * @param {HTMLInputElement} input - Input with error
   * @param {HTMLElement} errorSpan - Error message span
   * @param {string} message - Error message
   */
  showError(input, errorSpan, message) {
    // Update input classes
    input.classList.add('border-red-500');
    input.setAttribute('aria-invalid', 'true');

    // Show error message
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';

    // Ne pas forcer le focus automatiquement - cela pourrait bloquer la navigation
    // input.focus(); // Cette ligne est commentée pour éviter de forcer le focus
  }

  /**
   * Validate entire form
   * @returns {boolean} Whether the entire form is valid
   */
  validateForm() {
    let isValid = true;
    const inputs = this.form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Initialize form validation
   */
  initValidation() {
    // Validation uniquement lors de la sortie (blur) d'un champ
    // N'intercepte pas les autres événements comme mousedown ou click
    this.form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('blur', () => {
        this.validateInput(input);
      });
    });

    // Form submission validation - bloque uniquement l'envoi du formulaire
    this.form.addEventListener('submit', (event) => {
      if (!this.validateForm()) {
        event.preventDefault();
        this.scrollToFirstError();
      }
    });
  }

  /**
   * Scroll to first validation error
   */
  scrollToFirstError() {
    const firstError = this.form.querySelector('[aria-invalid="true"]');
    if (firstError) {
      // Utilise un délai pour éviter les problèmes de timing avec les événements
      setTimeout(() => {
        firstError.focus();
        firstError.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }
}

// Default validation configuration
const defaultValidationConfig = {
  input_name: {
    required: true,
    maxLength: 50
  },
  input_email: {
    required: true,
    type: 'email'
  },
  input_phone: {
    required: true,
    type: 'tel'
  },
  input_boat: {
    required: false // Le select n'est pas obligatoire
  },
  input_message: {
    required: false,
    maxLength: 500
  }
};

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Find all forms and apply validation
  const forms = document.querySelectorAll('form[id]');  // Seulement les formulaires avec un ID
  forms.forEach(form => {
    new EnhancedFormValidator(form.id, defaultValidationConfig, {
      lang: 'fr',
      sanitize: true,
      debug: false
    });
  });
});