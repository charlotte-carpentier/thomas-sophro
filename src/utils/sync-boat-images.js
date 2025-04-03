import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Synchronise les images entre bateaux et carousels dans les deux sens
 * et ajoute les noms/modèles de bateaux au fichier headings.json
 * @returns {void}
 */
export function syncBoatImages() {
  const boatsDir = './src/collection-boats';
  const carouselsDir = './src/collection-carousels';
  const imagesJsonPath = './src/_data/atoms/images.json';
  const headingsJsonPath = './src/_data/atoms/headings.json';
  
  console.log("Démarrage de la synchronisation bidirectionnelle...");
  
  // Vérifier et créer les dossiers nécessaires
  if (!fs.existsSync(carouselsDir)) {
    fs.mkdirSync(carouselsDir, { recursive: true });
  }
  
  // Charger images.json
  let imagesJson;
  try {
    imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
    console.log(`Images.json chargé avec ${imagesJson.images.length} images`);
  } catch (error) {
    console.error('Erreur lors de la lecture de images.json:', error);
    return;
  }
  
  // Charger headings.json
  let headingsJson;
  try {
    headingsJson = JSON.parse(fs.readFileSync(headingsJsonPath, 'utf8'));
    console.log(`Headings.json chargé avec ${headingsJson.headings.length} entrées`);
  } catch (error) {
    console.error('Erreur lors de la lecture de headings.json:', error);
    return;
  }
  
  // Créer des sets pour les vérifications rapides
  const existingImageIds = new Set(imagesJson.images.map(img => img.name));
  const existingHeadingNames = new Set(headingsJson.headings.map(heading => heading.name));
  
  // Charger tous les carousels existants
  const existingCarousels = {};
  if (fs.existsSync(carouselsDir)) {
    fs.readdirSync(carouselsDir)
      .filter(file => file.endsWith('.md'))
      .forEach(file => {
        try {
          const carouselFilePath = path.join(carouselsDir, file);
          const carouselData = matter(fs.readFileSync(carouselFilePath, 'utf8')).data;
          if (carouselData.name) {
            existingCarousels[carouselData.name] = {
              path: carouselFilePath,
              data: carouselData
            };
          }
        } catch (error) {
          console.error(`Erreur lors de la lecture du carousel ${file}:`, error);
        }
      });
  }
  
  if (fs.existsSync(boatsDir)) {
    const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
    console.log(`Traitement de ${boatFiles.length} fichiers de bateaux`);
    
    boatFiles.forEach(file => {
      try {
        console.log(`\nTraitement du bateau: ${file}`);
        const boatFilePath = path.join(boatsDir, file);
        const boatFileContent = fs.readFileSync(boatFilePath, 'utf8');
        const parsedBoatFile = matter(boatFileContent);
        
        // Gérer le modèle et le nom technique pour les nouveaux bateaux
        if (parsedBoatFile.data.model) {
          const modelName = parsedBoatFile.data.model;
          
          // Vérifier si le modèle existe déjà dans headings.json
          if (!existingHeadingNames.has(modelName)) {
            // Ajouter le nouveau modèle avec le formatage approprié
            headingsJson.headings.push({
              name: modelName,
              text: `_${modelName}`,
              level: 2,
              style: "ma_nautic_section_title"
            });
            existingHeadingNames.add(modelName);
            console.log(`Nouveau modèle ajouté à headings.json: ${modelName}`);
          }
        }
        
        if (parsedBoatFile.data.name) {
          const technicalName = parsedBoatFile.data.name;
          
          // Vérifier si le nom technique existe déjà dans headings.json
          if (!existingHeadingNames.has(technicalName)) {
            // Ajouter le nouveau nom technique avec le formatage approprié
            headingsJson.headings.push({
              name: technicalName,
              text: technicalName.replace('boat_', ''),
              level: 2,
              style: "ma_nautic_subtitle_boat"
            });
            existingHeadingNames.add(technicalName);
            console.log(`Nouveau nom technique ajouté à headings.json: ${technicalName}`);
          }
        }
        
        // Déterminer le nom du carousel associé au bateau
        const carouselName = parsedBoatFile.data.carousel_name;
        
        if (!carouselName) {
          console.log("Pas de carousel_name défini pour ce bateau, passage au suivant");
          return;
        }
        
        console.log(`Carousel associé: ${carouselName}`);
        
        // Vérifier si le bateau a des images
        if (!parsedBoatFile.data.boat_images || !Array.isArray(parsedBoatFile.data.boat_images) || parsedBoatFile.data.boat_images.length === 0) {
          console.log("Aucune image dans le bateau, vérification du carousel existant...");
          
          // Si le bateau n'a pas d'images mais qu'un carousel existe, récupérer les images du carousel
          if (existingCarousels[carouselName]) {
            const carouselImages = existingCarousels[carouselName].data.images || [];
            
            if (carouselImages.length > 0) {
              // Récupérer les URLs des images depuis images.json
              const imageUrls = carouselImages
                .map(imgRef => {
                  if (!imgRef || !imgRef.name) return null;
                  const imageInfo = imagesJson.images.find(img => img.name === imgRef.name);
                  return imageInfo ? imageInfo.src : null;
                })
                .filter(img => img !== null);
              
              if (imageUrls.length > 0) {
                console.log(`${imageUrls.length} images trouvées dans le carousel, mise à jour du bateau`);
                
                // Mise à jour du bateau avec les images du carousel
                parsedBoatFile.data.boat_images = imageUrls;
                
                const updatedContent = matter.stringify(parsedBoatFile.content, parsedBoatFile.data);
                fs.writeFileSync(boatFilePath, updatedContent);
                console.log(`Bateau ${file} mis à jour avec ${imageUrls.length} images`);
              }
            }
          }
          
          // Pas d'images à synchroniser vers le carousel, passer au bateau suivant
          return;
        }
        
        console.log(`${parsedBoatFile.data.boat_images.length} images trouvées dans le bateau`);
        
        // Créer ou mettre à jour les entrées dans images.json et préparer les références pour le carousel
        const carouselImageRefs = [];
        
        parsedBoatFile.data.boat_images.forEach((imgUrl, index) => {
          // Créer un ID unique pour l'image
          const imageId = `${carouselName}_slide_${index + 1}`;
          
          // Vérifier si cette URL existe déjà dans images.json sous un autre nom
          const existingImage = imagesJson.images.find(img => img.src === imgUrl);
          
          if (existingImage) {
            // Si l'image existe déjà, utiliser son ID existant
            carouselImageRefs.push({
              name: existingImage.name,
              objectPosition: "center"
            });
            console.log(`Image existante trouvée: ${existingImage.name} -> ${imgUrl}`);
          } else {
            // Vérifier si l'ID existe déjà (pour éviter les doublons)
            if (!existingImageIds.has(imageId)) {
              // Ajouter l'image à images.json
              imagesJson.images.push({
                name: imageId,
                src: imgUrl,
                alt: parsedBoatFile.data.imageAlt || `Image ${index + 1} du bateau ${parsedBoatFile.data.model}`,
                group: "block-media"
              });
              existingImageIds.add(imageId);
              console.log(`Nouvelle image ajoutée: ${imageId} -> ${imgUrl}`);
            } else {
              // Mettre à jour l'image existante
              const imgIndex = imagesJson.images.findIndex(img => img.name === imageId);
              if (imgIndex !== -1) {
                imagesJson.images[imgIndex].src = imgUrl;
                imagesJson.images[imgIndex].alt = parsedBoatFile.data.imageAlt || `Image ${index + 1} du bateau ${parsedBoatFile.data.model}`;
                console.log(`Image mise à jour: ${imageId} -> ${imgUrl}`);
              }
            }
            
            carouselImageRefs.push({
              name: imageId,
              objectPosition: "center"
            });
          }
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
${carouselImageRefs.map(img => `  - name: ${img.name}\n    objectPosition: ${img.objectPosition}`).join('\n')}
---`;
        
        fs.writeFileSync(carouselFilePath, carouselContent);
        console.log(`Carousel ${carouselName} créé/mis à jour avec ${carouselImageRefs.length} images`);
        
      } catch (error) {
        console.error(`Erreur lors du traitement du bateau ${file}:`, error);
        console.error(error.stack);
      }
    });
    
    // Sauvegarder les modifications dans les fichiers JSON
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
    console.log(`\nImages.json mis à jour avec ${imagesJson.images.length} images`);
    
    fs.writeFileSync(headingsJsonPath, JSON.stringify(headingsJson, null, 2));
    console.log(`\nHeadings.json mis à jour avec ${headingsJson.headings.length} titres`);
  }
}