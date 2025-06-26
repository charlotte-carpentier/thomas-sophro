// Tab Menu Mobile Toggle - Simple Version
document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('[data-burger-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const iconOpen = document.querySelector('.burger-icon-open');
    const iconClose = document.querySelector('.burger-icon-close');
    
    if (burgerButton && mobileMenu) {
        burgerButton.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.remove('active');
                iconOpen.style.display = 'block';
                iconClose.style.display = 'none';
            } else {
                // Open menu  
                mobileMenu.classList.add('active');
                iconOpen.style.display = 'none';
                iconClose.style.display = 'block';
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                iconOpen.style.display = 'block';
                iconClose.style.display = 'none';
            });
        });
    }
});