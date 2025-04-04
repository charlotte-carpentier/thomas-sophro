/**
 * Extrait la valeur numérique d'une chaîne de prix
 * 
 * @param {string} priceString - La chaîne contenant un prix (ex: "230 €/jour")
 * @param {number} defaultValue - Valeur à retourner en cas d'échec (défaut: 9999)
 * @returns {number} - La valeur numérique extraite
 */
export function extractNumericPrice(priceString, defaultValue = 9999) {
    // Vérifier que l'entrée est bien une chaîne
    if (!priceString || typeof priceString !== 'string') {
      console.warn(`Prix invalide: ${priceString}`);
      return defaultValue;
    }
    
    // Utiliser une regex pour extraire le premier nombre trouvé
    const priceRegex = /(\d+)/;
    const match = priceString.match(priceRegex);
    
    // Si un nombre est trouvé, le convertir en nombre, sinon retourner la valeur par défaut
    return match ? parseInt(match[0], 10) : defaultValue;
  }
  
  /**
   * Trie un tableau de bateaux par prix (croissant)
   * 
   * @param {Array} boats - Tableau de bateaux avec une propriété data.price
   * @returns {Array} - Tableau trié par prix
   */
  export function sortBoatsByPrice(boats) {
    if (!boats || !Array.isArray(boats)) {
      console.warn("sortBoatsByPrice appelé avec une entrée invalide:", boats);
      return boats; // Retourner tel quel si ce n'est pas un tableau
    }
    
    return [...boats].sort((a, b) => {
      // Vérifier que a et b ont la propriété data.price
      if (!a.data || !a.data.price || !b.data || !b.data.price) {
        console.warn("Bateau sans donnée de prix:", a, b);
        return 0; // Ne pas changer l'ordre si des données sont manquantes
      }
      
      // Extraire et comparer les prix
      const priceA = extractNumericPrice(a.data.price);
      const priceB = extractNumericPrice(b.data.price);
      
      // Retourner la différence pour un tri croissant
      return priceA - priceB;
    });
  }