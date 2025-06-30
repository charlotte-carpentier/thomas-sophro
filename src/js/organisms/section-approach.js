/**
 * SECTION-APPROACH JavaScript functionality
 * Handles text truncation toggle for approach section
 */

function toggleApproachText(device) {
  event.preventDefault(); // Prevent page scroll to top
  
  // Determine which section to target based on device
  const sectionClass = device === 'mobile' ? '.section-approach-mobile' : '.section-approach-desktop';
  const suffix = device === 'mobile' ? '-mobile' : '-desktop';
  
  // Find elements in the specific device section
  const section = document.querySelector(sectionClass);
  
  if (!section) {
    console.error('Section not found for device:', device);
    return;
  }
  
  // Find elements with device-specific IDs
  const truncated = section.querySelector('#truncated-approach' + suffix);
  const full = section.querySelector('#full-approach' + suffix);
  const linkMore = section.querySelector('#link-more-approach' + suffix);
  const linkLess = section.querySelector('#link-less-approach' + suffix);
  
  if (truncated && full && linkMore && linkLess) {
    // Check if currently in truncated mode (default state)
    const isCurrentlyTruncated = !truncated.classList.contains('hide');
    
    if (isCurrentlyTruncated) {
      // Currently truncated -> Switch to full mode
      truncated.classList.add('hide');
      full.classList.add('show');
      linkMore.style.display = 'none';
      linkLess.style.display = 'block';
    } else {
      // Currently full -> Return to truncated mode
      truncated.classList.remove('hide');
      full.classList.remove('show');
      linkMore.style.display = 'block';
      linkLess.style.display = 'none';
    }
  } else {
    console.error('Some elements not found in section for device:', device);
    console.error('Truncated:', truncated);
    console.error('Full:', full);
    console.error('Link More:', linkMore);
    console.error('Link Less:', linkLess);
  }
}

// Initialize section-approach functionality
function initSectionApproach() {
  console.log('Section-approach component initialized');
  
  // Additional initialization if needed
  // Could add intersection observers, smooth scrolling, etc.
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initSectionApproach();
});