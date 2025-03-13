/**
 * HAT Component Test Page Loader
 * This script loads the test framework and injects it into the page
 */
(function() {
    // Path to the test framework script
    const scriptPath = '/js/component-test.js';
    
    // Create script element
    const script = document.createElement('script');
    script.src = scriptPath;
    script.async = true;
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'test-framework-loading';
    loadingIndicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 9999;
    `;
    loadingIndicator.textContent = 'Chargement du framework de test...';
    
    document.body.appendChild(loadingIndicator);
    
    // Handle script loading
    script.onload = function() {
      console.log('Test framework loaded successfully');
      loadingIndicator.textContent = 'Framework de test chargé ✓';
      
      // Remove indicator after delay
      setTimeout(() => {
        loadingIndicator.remove();
      }, 2000);
    };
    
    script.onerror = function() {
      console.error('Failed to load test framework');
      loadingIndicator.textContent = 'Erreur de chargement du framework ✗';
      loadingIndicator.style.backgroundColor = 'rgba(220, 38, 38, 0.8)';
      
      // Provide instructions
      setTimeout(() => {
        loadingIndicator.innerHTML = `
          Erreur de chargement ✗<br>
          <small>Vérifiez que le fichier <code>${scriptPath}</code> existe</small>
        `;
        
        // Add dismiss button
        const dismissBtn = document.createElement('button');
        dismissBtn.textContent = '×';
        dismissBtn.style.cssText = `
          position: absolute;
          top: 4px;
          right: 4px;
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
        `;
        dismissBtn.onclick = function() {
          loadingIndicator.remove();
        };
        
        loadingIndicator.appendChild(dismissBtn);
      }, 2000);
    };
    
    // Add script to document
    document.head.appendChild(script);
  })();