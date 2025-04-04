/**
 * Map Contact Utilities
 * 
 * Initialize and manage the Leaflet map for contact page:
 * - Map instantiation with proper center coordinates
 * - Custom marker configuration
 * - Popup information display
 * 
 * @version 1.0
 */

/**
 * Initializes the Leaflet map on the contact page
 * Sets up a map centered on M.A Nautic location in Saint-Florent
 * Adds a custom marker with the company logo
 * 
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", function() {
    // Check if map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.warn("Map container not found");
      return;
    }
    
    // Initialize map coordinates and settings
    const mapCenter = [42.681846, 9.303704];
    const zoomLevel = 15;
    
    // Create map with center position and zoom level
    var map = L.map('map').setView(mapCenter, zoomLevel);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Define custom icon using the company logo
    var customIcon = L.icon({
      iconUrl: '/assets/logos/ma-logo.svg',
      iconSize: [50, 50],     // Icon size
      iconAnchor: [25, 50],   // Anchor point (bottom center)
      popupAnchor: [0, -50]   // Popup position (above the icon)
    });
    
    // Add marker with custom icon and popup
    L.marker(mapCenter, {icon: customIcon})
      .addTo(map)
      .bindPopup("<b>M.A Nautic</b><br>Saint-Florent, Corse")
      .openPopup();
  });