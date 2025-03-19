/**
 * SVG Loader - Dynamically loads SVG files and injects them inline into the DOM
 * 
 * This script finds elements with the data-svg-src attribute and replaces them
 * with the actual SVG content, allowing for styling with CSS and theme colors.
 */
document.addEventListener('DOMContentLoaded', () => {
  function loadSVGs() {
    document.querySelectorAll('[data-svg-src]').forEach(element => {
      const svgPath = element.getAttribute('data-svg-src');
      const originalClasses = element.className || '';
      
      // Load the SVG using fetch
      fetch(svgPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load SVG: ${svgPath} (${response.status} ${response.statusText})`);
          }
          return response.text();
        })
        .then(svgContent => {
          // Create a temporary element to parse the SVG
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
          const svg = svgDoc.querySelector('svg');
          
          if (!svg) {
            console.error(`No SVG element found in ${svgPath}`);
            return;
          }
          
          // Transfer classes from the original element to the SVG
          if (originalClasses) {
            // Keep any existing classes on the SVG
            const existingClasses = svg.getAttribute('class') || '';
            svg.setAttribute('class', `${existingClasses} ${originalClasses}`.trim());
          }
          
          // Ensure SVG inherits color
          if (!svg.getAttribute('fill') && !svgContent.includes('fill=')) {
            svg.setAttribute('fill', 'currentColor');
          }
          
          // Replace the element with the SVG
          element.parentNode.replaceChild(svg, element);
        })
        .catch(error => {
          console.error('SVG loading error:', error);
          // Create a fallback icon or placeholder
          const fallback = document.createElement('span');
          fallback.className = originalClasses;
          fallback.textContent = '●'; // Simple circle as fallback
          fallback.title = `Failed to load: ${svgPath}`;
          element.parentNode.replaceChild(fallback, element);
        });
    });
  }
  
  // Initial SVG load
  loadSVGs();

  // Observe changes in the DOM and reload SVGs when needed
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.hasAttribute('data-svg-src')) {
          loadSVGs();
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
