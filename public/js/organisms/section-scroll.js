document.addEventListener('DOMContentLoaded', () => {
    console.log("Script section-scroll.js chargé.");
    
    // Fonction de défilement personnalisé avec des options plus précises
    function smoothScroll(target, duration = 800) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Fonction d'ease pour un défilement plus naturel
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Ajouter un comportement de défilement fluide aux liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Utiliser le défilement personnalisé
                smoothScroll(targetElement);
                
                // Mettre à jour l'URL avec l'ancre (optionnel)
                history.pushState(null, null, targetId);
            }
        });
    });
});