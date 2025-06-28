/**
 * ACC-CARD JavaScript functionality
 * Handles text truncation toggle for accompaniment cards
 */

function toggleAccCardText(cardName) {
  const truncated = document.getElementById('truncated-' + cardName);
  const full = document.getElementById('full-' + cardName);
  const linkMore = document.getElementById('link-more-' + cardName);
  const linkLess = document.getElementById('link-less-' + cardName);
  
  if (truncated && full && linkMore && linkLess) {
    if (truncated.classList.contains('hide')) {
      // Show truncated, hide full
      truncated.classList.remove('hide');
      full.classList.remove('show');
      // Show "En savoir plus", hide "Fermer"
      linkMore.style.display = 'block';
      linkLess.style.display = 'none';
    } else {
      // Show full, hide truncated
      truncated.classList.add('hide');
      full.classList.add('show');
      // Hide "En savoir plus", show "Fermer"
      linkMore.style.display = 'none';
      linkLess.style.display = 'block';
    }
  }
}

// Initialize acc-card functionality
function initAccCards() {
  console.log('ACC-Card components initialized');
  // Additional initialization if needed
}