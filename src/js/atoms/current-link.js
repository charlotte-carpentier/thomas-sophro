// current-link.js - Solution robuste pour l'animation des liens de navigation
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer tous les liens de navigation
  const navLinks = document.querySelectorAll('[data-nav-link]');
  
  // Trouver le lien actif et stocker une référence
  let activeLink = null;
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Déterminer si c'est le lien actif
    const isActive = currentPath === href || 
      (href !== '/' && currentPath.startsWith(href));
    
    if (isActive) {
      link.setAttribute('aria-current', 'page');
      activeLink = link;
      
      // S'assurer que la classe de lien de navigation est appliquée
      if (!link.classList.contains('ma-nautic-nav-link')) {
        link.classList.add('ma-nautic-nav-link');
      }
    }
  });
  
  // Si aucun lien actif trouvé, on termine ici
  if (!activeLink) return;
  
  // Créer les éléments pour l'animation
  // Nous allons créer des éléments DOM réels plutôt que d'utiliser des pseudo-éléments
  // pour un meilleur contrôle
  
  // Créer l'élément de soulignement gold (par défaut)
  const goldUnderline = document.createElement('span');
  goldUnderline.className = 'active-link-gold-underline';
  goldUnderline.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px; /* équivalent à var(--ma-nautic-border-width-large) */
    background-color: #e8ab55; /* équivalent à var(--ma-nautic-gold) */
    transition: all 600ms;
    z-index: 1;
  `;
  
  // Créer l'élément de soulignement teal (pour l'effet de hover)
  const tealUnderline = document.createElement('span');
  tealUnderline.className = 'active-link-teal-underline';
  tealUnderline.style.cssText = `
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px; /* équivalent à var(--ma-nautic-border-width-large) */
    background-color: #63a595; /* équivalent à var(--ma-nautic-teal) */
    transition: all 600ms;
    z-index: 2;
  `;
  
  // S'assurer que le lien actif a position: relative
  activeLink.style.position = 'relative';
  
  // Ajouter les soulignements au lien actif
  activeLink.appendChild(goldUnderline);
  activeLink.appendChild(tealUnderline);
  
  // Ajouter les écouteurs d'événements aux autres liens de navigation
  navLinks.forEach(link => {
    if (link !== activeLink) {
      // Quand on survole un autre lien
      link.addEventListener('mouseenter', function() {
        // Animation : gold sort vers la droite
        goldUnderline.style.width = '0';
        goldUnderline.style.left = '100%';
        
        // Animation : teal entre depuis la gauche
        tealUnderline.style.width = '100%';
      });
      
      // Quand on quitte un autre lien
      link.addEventListener('mouseleave', function() {
        // Animation : gold revient depuis la gauche
        goldUnderline.style.width = '100%';
        goldUnderline.style.left = '0';
        
        // Animation : teal disparaît vers la droite
        tealUnderline.style.width = '0';
      });
    }
  });
  
  // Gérer le cas où la souris quitte complètement la navigation
  const navContainer = document.querySelector('[data-nav-container]');
  if (navContainer) {
    navContainer.addEventListener('mouseleave', function() {
      // Réinitialiser à l'état par défaut
      goldUnderline.style.width = '100%';
      goldUnderline.style.left = '0';
      tealUnderline.style.width = '0';
    });
  }
});