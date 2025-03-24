/**
 * Header burger menu functionality
 * Toggles the dropdown menu visibility on mobile devices
 * and switches between burger and close icons
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector(".toggle-button");
    const dropdown = document.querySelector(".dropdown-menu");

    if (toggleBtn && dropdown) {
        // Ajuster le z-index du bouton toggle
        toggleBtn.style.position = 'relative';
        toggleBtn.style.zIndex = '50';
        
        // Sauvegarde l'icône burger originale
        const burgerIcon = toggleBtn.innerHTML;
        
        // Crée l'icône de croix
        const closeIcon = `<span class="inline-flex items-center justify-center w-6 h-6 text-[theme(--ma-nautic-white)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </span>`;

        toggleBtn.addEventListener("click", () => {
            if (dropdown.classList.contains('-top-full')) {
                // Ouvre le menu
                dropdown.classList.remove('-top-full');
                dropdown.classList.add('top-16');
                dropdown.classList.add('pt-24');
                
                // Change l'icône en croix
                toggleBtn.innerHTML = closeIcon;
            } else {
                // Ferme le menu
                dropdown.classList.remove('top-16');
                dropdown.classList.remove('pt-24');
                dropdown.classList.add('-top-full');
                
                // Remet l'icône burger
                toggleBtn.innerHTML = burgerIcon;
            }
        });
    }
});