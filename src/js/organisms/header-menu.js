/**
 * Header burger menu functionality
 * Toggles the dropdown menu visibility on mobile devices
 */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector(".toggle-button");
    const dropdown = document.querySelector(".dropdown-menu");

    if (toggleBtn && dropdown) {
        toggleBtn.addEventListener("click", () => {
            dropdown.classList.toggle('top-20');
        });
    }
});