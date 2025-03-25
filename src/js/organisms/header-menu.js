/**
 * Header burger menu functionality
 * Toggles the dropdown menu visibility and rotates the burger icon
 * on mobile devices
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector(".toggle-button");
    const dropdown = document.querySelector(".dropdown-menu");

    if (toggleBtn && dropdown) {
        // Ajuster le z-index du bouton toggle
        toggleBtn.style.position = 'relative';
        toggleBtn.style.zIndex = '50';
        
        // Rotation explicite avec une classe CSS plutôt qu'un style inline
        // Ajout d'une classe CSS pour la rotation
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .toggle-rotate {
                transition: transform 0.5s ease;
            }
            .toggle-rotate.active {
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(styleElement);
        
        // Ajouter la classe de transition au bouton
        toggleBtn.classList.add('toggle-rotate');
        
        toggleBtn.addEventListener("click", () => {
            // Toggle la classe active pour la rotation
            toggleBtn.classList.toggle('active');
            
            if (toggleBtn.classList.contains('active')) {
                // Ouvre le menu
                dropdown.classList.remove('-top-full');
                dropdown.classList.add('top-16');
                dropdown.classList.add('pt-24');
            } else {
                // Ferme le menu
                dropdown.classList.remove('top-16');
                dropdown.classList.remove('pt-24');
                dropdown.classList.add('-top-full');
            }
        });
    }
});