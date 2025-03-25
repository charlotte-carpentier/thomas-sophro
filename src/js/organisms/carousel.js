/**
 * Carousel functionality for MA-Nautic
 * Gère les fonctionnalités de carrousel pour les sections du site
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les carrousels présents sur la page
  const carousels = document.querySelectorAll('[data-carousel]');
  
  console.log('Carrousels trouvés:', carousels.length);
  
  carousels.forEach(carousel => {
    // Identifie le carousel par son nom
    const carouselName = carousel.getAttribute('data-carousel');
    console.log('Initialisation du carousel:', carouselName);
    
    // Éléments du carrousel
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('[data-carousel-indicator]');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    
    console.log('Éléments trouvés:', {
      slides: slides.length,
      indicators: indicators.length,
      prevButton: !!prevButton,
      nextButton: !!nextButton
    });
    
    // Positionner les flèches à l'extérieur
    if (prevButton) {
      prevButton.style.position = 'absolute';
      prevButton.style.left = '-20px'; 
    }
    
    if (nextButton) {
      nextButton.style.position = 'absolute';
      nextButton.style.right = '-20px';
    }
    
    // Positionner les indicateurs en bas du carousel
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    if (indicatorsContainer) {
      indicatorsContainer.style.position = 'absolute';
      indicatorsContainer.style.bottom = '-20px';
      indicatorsContainer.style.left = '0';
      indicatorsContainer.style.right = '0';
    }
    
    // Assurons-nous que les slides sont positionnés correctement
    if (slides.length > 0) {
      // Ajuster la hauteur du container en fonction de la première image
      const firstSlide = slides[0];
      const img = firstSlide.querySelector('img');
      
      if (img) {
        img.onload = () => {
          const container = carousel.querySelector('.carousel-container');
          if (container && container.offsetHeight < 200) {
            const imgHeight = img.offsetHeight || 400;
            console.log('Ajustement de la hauteur du container à', imgHeight, 'px');
            container.style.minHeight = `${imgHeight}px`;
          }
        };
        
        // Au cas où l'image est déjà chargée
        if (img.complete) {
          const container = carousel.querySelector('.carousel-container');
          if (container && container.offsetHeight < 200) {
            const imgHeight = img.offsetHeight || 400;
            console.log('Image déjà chargée, hauteur ajustée à', imgHeight, 'px');
            container.style.minHeight = `${imgHeight}px`;
          }
        }
      }
    }
    
    // Garde en mémoire l'index de slide active
    let currentIndex = 0;
    let autoplayInterval = null;
    
    // Mise à jour de l'affichage du carrousel
    const updateCarousel = (index) => {
      // Vérifions que l'index est valide
      if (index < 0 || index >= slides.length) {
        console.warn('Index invalide pour le carousel', index);
        return;
      }
      
      console.log('Mise à jour du carousel à l\'index', index);
      
      // Désactive toutes les slides et indicateurs
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      // Active la slide et l'indicateur correspondant
      slides[index].classList.add('active');
      indicators[index]?.classList.add('active');
      
      // Mise à jour de l'index courant
      currentIndex = index;
    };
    
    // Navigation vers la slide précédente
    const goToPrevSlide = () => {
      console.log('Navigation vers la slide précédente');
      const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      updateCarousel(newIndex);
    };
    
    // Navigation vers la slide suivante
    const goToNextSlide = () => {
      console.log('Navigation vers la slide suivante');
      const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      updateCarousel(newIndex);
    };
    
    // Démarrage de l'autoplay
    const startAutoplay = () => {
      stopAutoplay(); // Pour éviter les doublons
      console.log('Démarrage de l\'autoplay');
      autoplayInterval = setInterval(goToNextSlide, 5000); // Change de slide toutes les 5 secondes
    };
    
    // Arrêt de l'autoplay
    const stopAutoplay = () => {
      if (autoplayInterval) {
        console.log('Arrêt de l\'autoplay');
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };
    
    // Mise en place des écouteurs d'événements
    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        goToPrevSlide();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        goToNextSlide();
      });
    }
    
    // Navigation par indicateurs
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        const slideIndex = parseInt(indicator.getAttribute('data-carousel-indicator'), 10);
        updateCarousel(slideIndex);
      });
    });
    
    // Initialisation
    console.log('Initialisation terminée, démarrage avec la première slide');
    updateCarousel(0);
    
    // Autoplay désactivé par défaut
    // Pour activer l'autoplay, décommentez la ligne suivante
    // startAutoplay();
  });
});