import { DateTime } from "luxon";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function (eleventyConfig) {
  // Copy static assets directory to output
  eleventyConfig.addPassthroughCopy('./src/assets');
  // Copy admin interface files to output
  eleventyConfig.addPassthroughCopy('./src/admin');
  // Copy docs files to output
  eleventyConfig.addPassthroughCopy('./src/docs');
  // Copy JavaScript files to output
  eleventyConfig.addPassthroughCopy('./src/js');

  // Add shortcode to display current year dynamically
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Add filter to format post date
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Add endsWith filter for string comparison (used for SVG detection)
  eleventyConfig.addFilter("endsWith", function(str, suffix) {
    if (!str || !suffix) return false;
    return str.toString().toLowerCase().endsWith(suffix.toLowerCase());
  });

  // Add filter to sort boats by price (extracts number from price string)
  eleventyConfig.addFilter("sortByPrice", function(boats) {
    if (!boats || !Array.isArray(boats)) {
      console.warn("sortByPrice filter called with invalid input:", boats);
      return boats; // Return as-is if not an array
    }
    
    return [...boats].sort((a, b) => {
      // Make sure a and b have data.price property
      if (!a.data || !a.data.price || !b.data || !b.data.price) {
        console.warn("Boat missing price data:", a, b);
        return 0; // Don't change order if data is missing
      }
      
      // Extract numeric price from string using regex
      const priceRegex = /(\d+)/;
      
      const priceAMatch = a.data.price.match(priceRegex);
      const priceBMatch = b.data.price.match(priceRegex);
      
      // Default values in case a price doesn't match expected format
      const priceA = priceAMatch ? parseInt(priceAMatch[0]) : 9999;
      const priceB = priceBMatch ? parseInt(priceBMatch[0]) : 9999;
      
      // Return difference for ascending sort
      return priceA - priceB;
    });
  });

  // Create a custom collection for carousels
  eleventyConfig.addCollection('carousel', function(collection) {
    return collection.getFilteredByGlob('./src/collection-carousels/*.md');
  });
  
  // Create a custom collection for boats
  eleventyConfig.addCollection("boat", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/collection-boats/*.md");
  });

  // AJOUT: Synchroniser les images des bateaux avec les carousels et images.json
  eleventyConfig.on('beforeBuild', () => {
    const boatsDir = './src/collection-boats';
    const carouselsDir = './src/collection-carousels';
    const imagesJsonPath = './src/_data/atoms/images.json';
    
    // Créer le dossier des carousels s'il n'existe pas
    if (!fs.existsSync(carouselsDir)) {
      fs.mkdirSync(carouselsDir, { recursive: true });
    }
    
    // Charger images.json
    let imagesJson;
    try {
      imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
      
      // Garder une copie des images existantes pour référence
      const originalImages = [...imagesJson.images];
      
      // Créer un ensemble des IDs d'images du système (non liées aux bateaux)
      const systemImageIds = new Set(originalImages
        .filter(img => !img.name.startsWith('carousel_'))
        .map(img => img.name));
      
      // Nous allons reconstruire la liste des images liées aux bateaux
      // tout en préservant les images système
      imagesJson.images = originalImages.filter(img => 
        !img.name.startsWith('carousel_') || 
        systemImageIds.has(img.name)
      );
      
    } catch (error) {
      console.error('Erreur lors de la lecture de images.json:', error);
      return;
    }
    
    // Créer un ensemble des IDs d'images existantes après le filtrage
    const existingImageIds = new Set(imagesJson.images.map(img => img.name));
    
    // Traiter chaque fichier de bateau et reconstruire les images et carousels
    if (fs.existsSync(boatsDir)) {
      const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
      
      boatFiles.forEach(file => {
        try {
          // Lire le fichier du bateau
          const boatFilePath = path.join(boatsDir, file);
          const boatContent = fs.readFileSync(boatFilePath, 'utf8');
          const boatData = matter(boatContent).data;
          
          // Ignorer si pas de carousel défini
          if (!boatData.carousel) {
            return;
          }
          
          // Préparer le contenu du carousel
          const carouselImages = [];
          
          // Traiter les images du bateau (s'il y en a)
          if (boatData.boat_images && Array.isArray(boatData.boat_images) && boatData.boat_images.length > 0) {
            boatData.boat_images.forEach((imgPath, index) => {
              // Créer un ID unique pour l'image
              const imageId = `${boatData.carousel}_slide_${index + 1}`;
              
              // Vérifier si l'image existe déjà dans images.json
              if (!existingImageIds.has(imageId)) {
                // Ajouter l'image à images.json
                imagesJson.images.push({
                  name: imageId,
                  src: imgPath,
                  alt: boatData.imageAlt || `Image ${index + 1} du bateau ${boatData.model}`,
                  group: "block-media"
                });
                existingImageIds.add(imageId);
                console.log(`Image ajoutée: ${imageId}`);
              } else {
                // Mettre à jour les informations de l'image si elle existe déjà
                const imgIndex = imagesJson.images.findIndex(img => img.name === imageId);
                if (imgIndex !== -1) {
                  imagesJson.images[imgIndex].src = imgPath;
                  imagesJson.images[imgIndex].alt = boatData.imageAlt || `Image ${index + 1} du bateau ${boatData.model}`;
                }
              }
              
              // Ajouter l'image au carousel
              carouselImages.push({
                name: imageId,
                objectPosition: "center"
              });
            });
          }
          
          // Créer ou mettre à jour le fichier carousel
          const carouselFilePath = path.join(carouselsDir, `${boatData.carousel}.md`);
          const carouselContent = `---
layout: 01-organisms/carousel.njk
tags: carousel
name: ${boatData.carousel}
autoplay: true
pauseOnHover: true
images:
${carouselImages.map(img => `  - name: ${img.name}\n    objectPosition: ${img.objectPosition}`).join('\n')}
---`;
          
          fs.writeFileSync(carouselFilePath, carouselContent);
          console.log(`Carousel mis à jour: ${boatData.carousel}`);
          
        } catch (error) {
          console.error(`Erreur lors du traitement du bateau ${file}:`, error);
        }
      });
      
      // Écrire le fichier images.json mis à jour
      fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
      console.log(`Images.json mis à jour avec ${imagesJson.images.length} images`);
    }
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  };
}