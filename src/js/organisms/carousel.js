/**
 * Script simplifié pour les carousels de MA-NAUTIC
 * 
 * Ce script gère l'affichage et la navigation dans un carousel d'images
 * avec transition par opacité et défilement automatique.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Sélection de tous les carousels sur la page
  const carousels = document.querySelectorAll("[data-carousel]");
  
  carousels.forEach(carousel => {
    const items = [...carousel.querySelectorAll("[data-carousel-item]")];
    if (!items.length) return; // Pas d'items, on ne fait rien
    
    let index = 0;
    let intervalId = null;
    
    // Fonction pour afficher une diapositive
    function showSlide(newIndex) {
      // Cacher la diapositive actuelle
      items[index].classList.remove("opacity-100");
      items[index].classList.add("opacity-0");
      
      // Calculer le nouvel index (avec boucle)
      index = (newIndex + items.length) % items.length;
      
      // Afficher la nouvelle diapositive
      items[index].classList.remove("opacity-0");
      items[index].classList.add("opacity-100");
    }
    
    // Gestionnaires d'événements pour les boutons de navigation
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(index - 1);
        restartInterval();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(index + 1);
        restartInterval();
      });
    }
    
    // Fonction pour redémarrer l'intervalle
    function restartInterval() {
      if (intervalId) {
        clearInterval(intervalId);
      }
      startInterval();
    }
    
    // Fonction pour démarrer l'intervalle
    function startInterval() {
      intervalId = setInterval(() => showSlide(index + 1), 5000); // Défilement toutes les 5 secondes
    }
    
    // Démarrer le défilement automatique
    startInterval();
  });
});