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
  
  console.log("Démarrage de la synchronisation...");
  
  if (!fs.existsSync(carouselsDir)) {
    fs.mkdirSync(carouselsDir, { recursive: true });
    console.log("Dossier carousels créé");
  }
  
  let imagesJson;
  try {
    imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
    console.log(`Images.json chargé avec ${imagesJson.images.length} images`);
  } catch (error) {
    console.error('Erreur lors de la lecture de images.json:', error);
    return;
  }
  
  const existingImageIds = new Set(imagesJson.images.map(img => img.name));
  
  if (fs.existsSync(boatsDir)) {
    const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
    console.log(`Traitement de ${boatFiles.length} fichiers de bateaux`);
    
    boatFiles.forEach(file => {
      try {
        console.log(`\nTraitement du bateau: ${file}`);
        const boatFilePath = path.join(boatsDir, file);
        const boatFileContent = fs.readFileSync(boatFilePath, 'utf8');
        const parsedBoatFile = matter(boatFileContent);
        
        // PARTIE 1: Synchroniser les images des carousels vers les bateaux
        if (parsedBoatFile.data.carousel_name) {
          console.log(`Synchronisation des images du carousel ${parsedBoatFile.data.carousel_name} vers le bateau`);
          const currentCarouselFilePath = path.join(carouselsDir, `${parsedBoatFile.data.carousel_name}.md`);
          
          if (fs.existsSync(currentCarouselFilePath)) {
            const carouselFileContent = fs.readFileSync(currentCarouselFilePath, 'utf8');
            const carouselData = matter(carouselFileContent).data;
            
            // Récupérer les chemins des images depuis images.json
            const carouselImages = carouselData.images
              ? carouselData.images
                .map(imgRef => {
                  if (!imgRef || !imgRef.name) return null;
                  const imageInfo = imagesJson.images.find(img => img.name === imgRef.name);
                  return imageInfo ? imageInfo.src : null;
                })
                .filter(img => img !== null)
              : [];
            
            console.log(`${carouselImages.length} images trouvées dans le carousel`);
            
            if (carouselImages.length > 0) {
              // Mise à jour du bateau avec les images du carousel
              parsedBoatFile.data.boat_images = carouselImages;
              
              // Utiliser matter.stringify pour préserver le format
              const updatedContent = matter.stringify(parsedBoatFile.content, parsedBoatFile.data);
              fs.writeFileSync(boatFilePath, updatedContent);
              console.log(`Bateau ${file} mis à jour avec ${carouselImages.length} images`);
            }
          } else {
            console.log(`Carousel ${parsedBoatFile.data.carousel_name}.md non trouvé`);
          }
        } else {
          console.log("Pas de carousel_name défini pour ce bateau");
        }
        
        // PARTIE 2: Synchroniser les images des bateaux vers les carousels
        const carouselName = parsedBoatFile.data.carousel;
        if (!carouselName) {
          console.log("Pas de carousel défini pour ce bateau, fin du traitement");
          return;
        }
        
        console.log(`Synchronisation des images du bateau vers le carousel ${carouselName}`);
        
        // Préparer le contenu du carousel
        const carouselImages = [];
        
        // Traiter les images du bateau (s'il y en a)
        if (parsedBoatFile.data.boat_images && Array.isArray(parsedBoatFile.data.boat_images) && parsedBoatFile.data.boat_images.length > 0) {
          console.log(`${parsedBoatFile.data.boat_images.length} images trouvées dans le bateau`);
          
          parsedBoatFile.data.boat_images.forEach((imgPath, index) => {
            // Créer un ID unique pour l'image
            const imageId = `${carouselName}_slide_${index + 1}`;
            
            // Vérifier si l'image existe déjà dans images.json
            if (!existingImageIds.has(imageId)) {
              // Ajouter l'image à images.json
              imagesJson.images.push({
                name: imageId,
                src: imgPath,
                alt: parsedBoatFile.data.imageAlt || `Image ${index + 1} du bateau ${parsedBoatFile.data.model}`,
                group: "block-media"
              });
              existingImageIds.add(imageId);
              console.log(`Image ajoutée à images.json: ${imageId}`);
            } else {
              // Mettre à jour les informations de l'image si elle existe déjà
              const imgIndex = imagesJson.images.findIndex(img => img.name === imageId);
              if (imgIndex !== -1) {
                imagesJson.images[imgIndex].src = imgPath;
                imagesJson.images[imgIndex].alt = parsedBoatFile.data.imageAlt || `Image ${index + 1} du bateau ${parsedBoatFile.data.model}`;
                console.log(`Image mise à jour dans images.json: ${imageId}`);
              }
            }
            
            // Ajouter l'image au carousel
            carouselImages.push({
              name: imageId,
              objectPosition: "center"
            });
          });
          
          // Créer ou mettre à jour le fichier carousel
          const carouselFilePath = path.join(carouselsDir, `${carouselName}.md`);
          const carouselContent = `---
layout: 01-organisms/carousel.njk
tags: carousel
name: ${carouselName}
autoplay: true
pauseOnHover: true
images:
${carouselImages.map(img => `  - name: ${img.name}\n    objectPosition: ${img.objectPosition}`).join('\n')}
---`;
          
          fs.writeFileSync(carouselFilePath, carouselContent);
          console.log(`Carousel ${carouselName} créé/mis à jour`);
        } else {
          console.log("Pas d'images trouvées dans le bateau");
        }
        
      } catch (error) {
        console.error(`Erreur lors du traitement du bateau ${file}:`, error);
        console.error(error.stack);
      }
    });
    
    // Sauvegarder les modifications dans images.json
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
    console.log(`\nImages.json mis à jour avec ${imagesJson.images.length} images`);
  } else {
    console.error(`Le dossier ${boatsDir} n'existe pas`);
  }
}