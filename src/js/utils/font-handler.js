/**
 * Gestionnaire de polices pour éviter le FOUT (Flash Of Unstyled Text)
 * Stratégie : charger les polices de manière optimisée et utiliser le cache
 */

// 1. Vérifier si les polices sont déjà chargées dans le sessionStorage
if (sessionStorage.fontsLoaded) {
  // Appliquer immédiatement la classe fonts-loaded pour éviter tout clignotement
  document.documentElement.classList.add('fonts-loaded');
} else {
  // 2. Ajouter un style inline pour cacher temporairement le texte pendant un très court moment
  const style = document.createElement('style');
  style.textContent = `
    body {
      opacity: 0.99; /* Légèrement transparent pour un effet plus doux */
      transition: opacity 0.1s;
    }
    .fonts-loaded body {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // 3. Vérifier si l'API Fonts est disponible
  if ('fonts' in document) {
    // Utiliser Promise.race pour ne pas attendre trop longtemps
    Promise.race([
      // 4. Essayer de charger toutes les polices
      Promise.all([
        document.fonts.load('400 1em Vibur'),
        document.fonts.load('400 1em Roboto'),
        document.fonts.load('700 1em Roboto'),
        document.fonts.load('900 1em Roboto')
      ]),
      // 5. Timeout pour ne pas bloquer trop longtemps (300ms maximum)
      new Promise(resolve => setTimeout(resolve, 300))
    ]).then(() => {
      // 6. Marquer les polices comme chargées même si le timeout a été atteint
      document.documentElement.classList.add('fonts-loaded');
      sessionStorage.fontsLoaded = true;
      
      // 7. Retirer le style inline après un court délai
      setTimeout(() => {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, 50);
    });
  } else {
    // Pour les navigateurs qui ne supportent pas l'API, on ajoute quand même la classe
    document.documentElement.classList.add('fonts-loaded');
  }
}

// 8. Préchargement en arrière-plan des polices pour les visites ultérieures
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Préchargement des polices en arrière-plan
    const fontPreloadLink = document.createElement('link');
    fontPreloadLink.href = '/assets/fonts/vibur.woff2';
    fontPreloadLink.rel = 'preload';
    fontPreloadLink.as = 'font';
    fontPreloadLink.type = 'font/woff2';
    fontPreloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreloadLink);
    
    // Faire de même pour Roboto si nécessaire
  });
}