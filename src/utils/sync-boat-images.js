import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Synchronise les images des bateaux avec les carousels et images.json
 * @returns {void}
 */
export function syncBoatImages() {
  const boatsDir = './src/collection-boats';
  const carouselsDir = './src/collection-carousels';
  const imagesJsonPath = './src/_data/atoms/images.json';
  
  // Vérifier si le dossier des carousels existe
  if (!fs.existsSync(carouselsDir)) {
    fs.mkdirSync(carouselsDir, { recursive: true });
  }
  
  // Charger images.json
  let imagesJson;
  try {
    imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
  } catch (error) {
    console.error('Erreur lors de la lecture de images.json:', error);
    return;
  }
  
  // Créer un Set pour vérifier l'existence des images
  const existingImageIds = new Set(imagesJson.images.map(img => img.name));
  
  // Traiter chaque fichier de bateau
  if (fs.existsSync(boatsDir)) {
    const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
    
    boatFiles.forEach(file => {
      try {
        // Lire le fichier du bateau
        const boatFilePath = path.join(boatsDir, file);
        const boatContent = fs.readFileSync(boatFilePath, 'utf8');
        const boatData = matter(boatContent).data;
        
        // Récupérer les images du carousel existant
        if (boatData.carousel_name) {
          const currentCarouselFilePath = path.join(carouselsDir, `${boatData.carousel_name}.md`);
          
          if (fs.existsSync(currentCarouselFilePath)) {
            const carouselContent = fs.readFileSync(currentCarouselFilePath, 'utf8');
            const carouselData = matter(carouselContent).data;
            
            // Récupérer les chemins des images depuis images.json
            const carouselImages = carouselData.images
              ? carouselData.images
                .map(imgRef => {
                  const imageInfo = imagesJson.images.find(img => img.name === imgRef.name);
                  return imageInfo ? imageInfo.src : null;
                })
                .filter(img => img !== null)
              : [];
            
            // Fusionner les images existantes avec les nouvelles du carousel
            const existingBoatImages = boatData.boat_images || [];
            const updatedBoatImages = [
              ...existingBoatImages,
              ...carouselImages.filter(imgSrc => 
                !existingBoatImages.includes(imgSrc)
              )
            ];
            
            // Mettre à jour le fichier si de nouvelles images sont trouvées
            if (updatedBoatImages.length !== existingBoatImages.length) {
              const updatedContent = matter.stringify({
                ...boatData,
                boat_images: updatedBoatImages
              }, boatContent);
              
              fs.writeFileSync(boatFilePath, updatedContent);
              console.log(`Mise à jour des images pour ${file} : ${carouselImages.length} images ajoutées`);
            }
          }
        }
        
        // CRÉATION DU CAROUSEL
        // Ignorer si pas de carousel défini
        if (!boatData.carousel_name) {
          return;
        }
        
        // Préparer le contenu du carousel
        const carouselImages = [];
        
        // Traiter les images du bateau (s'il y en a)
        if (boatData.boat_images && Array.isArray(boatData.boat_images) && boatData.boat_images.length > 0) {
          boatData.boat_images.forEach((imgPath, index) => {
            // Créer un ID unique pour l'image
            const imageId = `${boatData.carousel_name}_slide_${index + 1}`;
            
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
        const carouselFilePath = path.join(carouselsDir, `${boatData.carousel_name}.md`);
        const carouselContent = `---
layout: 01-organisms/carousel.njk
tags: carousel
name: ${boatData.carousel_name}
autoplay: true
pauseOnHover: true
images:
${carouselImages.map(img => `  - name: ${img.name}\n    objectPosition: ${img.objectPosition}`).join('\n')}
---`;
        
        fs.writeFileSync(carouselFilePath, carouselContent);
        console.log(`Carousel mis à jour: ${boatData.carousel_name}`);
        
      } catch (error) {
        console.error(`Erreur lors du traitement du bateau ${file}:`, error);
      }
    });
    
    // Écrire le fichier images.json mis à jour
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
    console.log(`Images.json mis à jour avec ${imagesJson.images.length} images`);
  }
}