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
  
  if (!fs.existsSync(carouselsDir)) {
    fs.mkdirSync(carouselsDir, { recursive: true });
  }
  
  let imagesJson;
  try {
    imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
  } catch (error) {
    console.error('Erreur lors de la lecture de images.json:', error);
    return;
  }
  
  const existingImageIds = new Set(imagesJson.images.map(img => img.name));
  
  if (fs.existsSync(boatsDir)) {
    const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
    
    boatFiles.forEach(file => {
      try {
        const boatFilePath = path.join(boatsDir, file);
        const boatFileContent = fs.readFileSync(boatFilePath, 'utf8');
        const parsedBoatFile = matter(boatFileContent);
        
        // Récupérer les images du carousel si un carousel est défini
        if (parsedBoatFile.data.carousel_name) {
          const currentCarouselFilePath = path.join(carouselsDir, `${parsedBoatFile.data.carousel_name}.md`);
          
          if (fs.existsSync(currentCarouselFilePath)) {
            const carouselFileContent = fs.readFileSync(currentCarouselFilePath, 'utf8');
            const carouselData = matter(carouselFileContent).data;
            
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
            const existingBoatImages = parsedBoatFile.data.boat_images || [];
            const updatedBoatImages = [
              ...existingBoatImages,
              ...carouselImages.filter(imgSrc => 
                !existingBoatImages.includes(imgSrc)
              )
            ];
            
            // Construire manuellement le frontmatter
            const frontmatterLines = Object.entries(parsedBoatFile.data)
              .filter(([key]) => key !== 'boat_images')
              .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
              .concat(`boat_images: ${JSON.stringify(updatedBoatImages)}`);
            
            const updatedFileContent = `---
${frontmatterLines.join('\n')}
---
${parsedBoatFile.content || ''}`;
            
            fs.writeFileSync(boatFilePath, updatedFileContent);
          }
        }
        
        // CODE ORIGINAL COMMENCE ICI
        // Ignorer si pas de carousel défini
        if (!parsedBoatFile.data.carousel) {
          return;
        }
        
        // Préparer le contenu du carousel
        const carouselImages = [];
        
        // Traiter les images du bateau (s'il y en a)
        if (parsedBoatFile.data.boat_images && Array.isArray(parsedBoatFile.data.boat_images) && parsedBoatFile.data.boat_images.length > 0) {
          parsedBoatFile.data.boat_images.forEach((imgPath, index) => {
            // Créer un ID unique pour l'image
            const imageId = `${parsedBoatFile.data.carousel}_slide_${index + 1}`;
            
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
            } else {
              // Mettre à jour les informations de l'image si elle existe déjà
              const imgIndex = imagesJson.images.findIndex(img => img.name === imageId);
              if (imgIndex !== -1) {
                imagesJson.images[imgIndex].src = imgPath;
                imagesJson.images[imgIndex].alt = parsedBoatFile.data.imageAlt || `Image ${index + 1} du bateau ${parsedBoatFile.data.model}`;
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
        const carouselFilePath = path.join(carouselsDir, `${parsedBoatFile.data.carousel}.md`);
        const carouselContent = `---
layout: 01-organisms/carousel.njk
tags: carousel
name: ${parsedBoatFile.data.carousel}
autoplay: true
pauseOnHover: true
images:
${carouselImages.map(img => `  - name: ${img.name}\n    objectPosition: ${img.objectPosition}`).join('\n')}
---`;
        
        fs.writeFileSync(carouselFilePath, carouselContent);
        
      } catch (error) {
        console.error(`Erreur lors du traitement du bateau ${file}:`, error);
      }
    });
    
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
  }
}