document.addEventListener('DOMContentLoaded', () => {
    console.log("Script section-scroll.js chargé.");
    
    // Ajouter un comportement de défilement fluide aux liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Défilement fluide vers l'élément cible
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Mettre à jour l'URL avec l'ancre (optionnel)
                history.pushState(null, null, targetId);
            }
        });
    });
});