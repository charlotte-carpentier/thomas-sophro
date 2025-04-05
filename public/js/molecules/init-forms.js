// init-forms.js - À placer dans /js/atoms/ ou /js/
document.addEventListener('DOMContentLoaded', function() {
    // Chercher tous les formulaires avec l'attribut novalidate
    const forms = document.querySelectorAll('form[novalidate]');
    
    forms.forEach(form => {
      // Vérifier si l'objet EnhancedFormValidator existe
      if (typeof EnhancedFormValidator !== 'undefined') {
        // Récupérer le nom du formulaire
        const formNameInput = form.querySelector('input[name="form-name"]');
        const formId = form.id;
        
        if (formId) {
          // Créer l'instance du validateur avec la configuration standard
          new EnhancedFormValidator(formId, {
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
              required: true
            },
            input_message: {
              required: false,
              maxLength: 500
            }
          }, {
            lang: 'fr',
            sanitize: true,
            debug: false
          });
        }
      }
    });
  });