/**
 * fixed-header.js
 * Header toujours fixe sans aucun mouvement
 */
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner le header et les éléments du menu
  const header = document.querySelector('header');
  const toggleBtn = document.querySelector(".toggle-button");
  const dropdown = document.querySelector(".dropdown-menu");
  
  // Si pas de header, ne rien faire
  if (!header) return;
  
  // Créer un spacer avec la même hauteur que le header
  const spacer = document.createElement('div');
  spacer.id = 'header-spacer';
  header.parentNode.insertBefore(spacer, header.nextSibling);
  
  // Supprimer shadow-bottom du header (pour être sûr qu'il n'y a pas d'ombre)
  header.classList.remove('shadow-bottom');
  
  // Copier la couleur de fond originale
  const headerBgColor = window.getComputedStyle(header).backgroundColor;
  
  // Fonction pour mettre à jour la hauteur du spacer
  function updateSpacer() {
    const headerHeight = header.offsetHeight;
    spacer.style.height = headerHeight + 'px';
  }
  
  // Rendre le header fixe immédiatement
  function fixHeader() {
    // Configurer le header comme fixe
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.width = '100%';
    header.style.zIndex = '40';
    header.style.backgroundColor = headerBgColor;
    header.style.boxShadow = 'none'; // S'assurer qu'il n'y a pas d'ombre
    
    // Adapter le menu dropdown en mode mobile
    if (dropdown && window.innerWidth < 1024) {
      dropdown.style.position = 'fixed';
      dropdown.style.width = '100%';
    }
    
    // Mettre à jour le spacer
    updateSpacer();
  }
  
  // Gestionnaire d'événement pour le bouton de menu en mobile
  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', function() {
      // S'assurer que le dropdown reste correctement positionné
      if (window.innerWidth < 1024) {
        dropdown.style.position = 'fixed';
        dropdown.style.width = '100%';
      }
    });
  }
  
  // Écouter le redimensionnement pour ajuster le spacer
  window.addEventListener('resize', function() {
    updateSpacer();
    
    // Réajuster la position du dropdown en fonction de la taille de l'écran
    if (dropdown) {
      if (window.innerWidth < 1024) {
        dropdown.style.position = 'fixed';
        dropdown.style.width = '100%';
      } else {
        dropdown.style.position = '';
        dropdown.style.width = '';
      }
    }
  });
  
  // Initialiser
  fixHeader();
});