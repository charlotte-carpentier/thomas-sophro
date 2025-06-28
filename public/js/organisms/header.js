/* 
=========================
    HEADER ORGANISM JS
      v1.0 - Thomas       
=========================
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    function initMobileMenu() {
        const burgerToggle = document.getElementById('burger-toggle');
        const mobileOverlay = document.getElementById('mobile-overlay');
        
        if (!burgerToggle || !mobileOverlay) {
            console.warn('Header: Mobile menu elements not found');
            return;
        }
        
        // Toggle mobile menu
        function toggleMobileMenu() {
            const isExpanded = burgerToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded (pour l'animation des icônes)
            burgerToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle overlay visibility
            if (!isExpanded) {
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            } else {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scroll
            }
        }
        
        // Close mobile menu
        function closeMobileMenu() {
            burgerToggle.setAttribute('aria-expanded', 'false');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Event listeners
        burgerToggle.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on overlay
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileOverlay.querySelectorAll('.link--burger');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024) { // lg breakpoint
                closeMobileMenu();
            }
        });
    }
    
    // Active link highlighting
    function initActiveLinks() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.header-navigation .link--header');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href === currentPath || (currentPath === '/' && href === '#home'))) {
                link.classList.add('current');
            }
        });
    }
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('.header-navigation .link--header[href^="#"], .header-mobile-overlay .link--burger[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const mobileOverlay = document.getElementById('mobile-overlay');
                    if (mobileOverlay && mobileOverlay.classList.contains('active')) {
                        const burgerToggle = document.getElementById('burger-toggle');
                        burgerToggle.setAttribute('aria-expanded', 'false');
                        mobileOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to target
                    const headerHeight = document.getElementById('main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    document.querySelectorAll('.header-navigation .link--header').forEach(l => l.classList.remove('current'));
                    if (this.classList.contains('link--header')) {
                        this.classList.add('current');
                    }
                }
            });
        });
    }
    
    // Initialize all header functionality
    initMobileMenu();
    initActiveLinks();
    initSmoothScroll();
    
    console.log('Header organism initialized successfully! 🧙‍♂️✨');
    
});