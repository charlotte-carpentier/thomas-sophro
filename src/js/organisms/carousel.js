document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne tous les carousels sur la page
  const carousels = document.querySelectorAll("[data-carousel]");
  
  carousels.forEach(carousel => {
    initCarousel(carousel);
  });
  
  function initCarousel(carousel) {
    const carouselId = carousel.id;
    const items = [...carousel.querySelectorAll("[data-carousel-item]")];
    const prevBtn = carousel.parentElement.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.parentElement.querySelector("[data-carousel-next]");
    const indicators = document.querySelectorAll(`[data-carousel-target="${carouselId}"]`);
    
    let index = 0;
    let autoplayInterval = null;
    
    // Ajouter la transition à tous les éléments du carrousel
    items.forEach(item => {
      item.classList.add("transition-opacity", "duration-700");
    });
    
    // Fonction pour afficher une slide spécifique
    function showSlide(newIndex) {
      // Masquer la slide actuelle
      items[index].classList.remove("opacity-100");
      items[index].classList.add("opacity-0");
      
      // Calculer le nouvel index
      index = (newIndex + items.length) % items.length;
      
      // Afficher la nouvelle slide
      items[index].classList.remove("opacity-0");
      items[index].classList.add("opacity-100");
      
      // Mettre à jour les indicateurs
      updateIndicators();
    }
    
    // Mettre à jour l'apparence des indicateurs
    function updateIndicators() {
      indicators.forEach((indicator, i) => {
        // Supprime d'abord la classe active de tous les indicateurs
        indicator.classList.remove("carousel-indicator-active");
        
        if (i === index) {
          // Ajoute la classe active à l'indicateur courant
          indicator.classList.add("carousel-indicator-active");
          
          // Styles CSS directs (en complément de la classe)
          indicator.style.backgroundColor = "#2b3947"; // Gris très foncé (--ma-nautic-blue)
          indicator.style.opacity = "0.6"; // Opacité pour l'indicateur actif
        } else {
          // Styles pour les indicateurs inactifs
          indicator.style.backgroundColor = "#2b3947"; // Gris très foncé (--ma-nautic-blue)
          indicator.style.opacity = "0.2"; // Opacité réduite
        }
      });
    }
    
    // Appliquer les styles initiaux des indicateurs
    updateIndicators();
    
    // Gestionnaire d'événement pour le bouton précédent
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(index - 1);
        resetAutoplay();
      });
    }
    
    // Gestionnaire d'événement pour le bouton suivant
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(index + 1);
        resetAutoplay();
      });
    }
    
    // Gestionnaire d'événement pour les indicateurs
    indicators.forEach((indicator, i) => {
      indicator.addEventListener("click", () => {
        showSlide(i);
        resetAutoplay();
      });
    });
    
    // Fonction pour réinitialiser l'autoplay
    function resetAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    }
    
    // Fonction pour démarrer l'autoplay
    function startAutoplay() {
      const autoplay = carousel.getAttribute("data-autoplay") === "true";
      
      if (autoplay) {
        autoplayInterval = setInterval(() => {
          showSlide(index + 1);
        }, 7000); // Auto-slide toutes les 7s
      }
    }
    
    // Gestion de pause au survol
    const pauseOnHover = carousel.getAttribute("data-pause-on-hover") === "true";
    
    if (pauseOnHover) {
      carousel.addEventListener("mouseenter", () => {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
        }
      });
      
      carousel.addEventListener("mouseleave", () => {
        startAutoplay();
      });
    }
    
    // Démarrer l'autoplay si configuré
    startAutoplay();
  }
});