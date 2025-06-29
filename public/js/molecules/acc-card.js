/**
 * ACC-CARD JavaScript functionality
 * Handles text truncation toggle for accompaniment cards
 */

function toggleAccCardText(cardName) {
  event.preventDefault(); // Empêche le scroll vers le haut de la page
  
  // Find elements in the VISIBLE section (desktop or mobile)
  const visibleSection = window.innerWidth <= 768 ? 
    document.querySelector('.section-acc-mobile:not([style*="display: none"])') : 
    document.querySelector('.section-acc-desktop:not([style*="display: none"])');
  
  if (!visibleSection) {
    console.error('No visible section found');
    return;
  }
  
  // Find elements ONLY in the visible section
  const truncated = visibleSection.querySelector('#truncated-' + cardName);
  const full = visibleSection.querySelector('#full-' + cardName);
  const linkMore = visibleSection.querySelector('#link-more-' + cardName);
  const linkLess = visibleSection.querySelector('#link-less-' + cardName);
  
  if (truncated && full && linkMore && linkLess) {
    // Vérifier si on est actuellement en mode "tronqué" (version par défaut)
    const isCurrentlyTruncated = !truncated.classList.contains('hide');
    
    if (isCurrentlyTruncated) {
      // On est en mode tronqué -> Passer en mode complet
      truncated.classList.add('hide');
      full.classList.add('show');
      linkMore.style.display = 'none';
      linkLess.style.display = 'block';
    } else {
      // On est en mode complet -> Retourner en mode tronqué
      truncated.classList.remove('hide');
      full.classList.remove('show');
      linkMore.style.display = 'block';
      linkLess.style.display = 'none';
    }
  } else {
    console.error('Some elements not found in visible section for card:', cardName);
  }
}

// Initialize acc-card functionality
function initAccCards() {
  console.log('ACC-Card components initialized');
  // Additional initialization if needed
}