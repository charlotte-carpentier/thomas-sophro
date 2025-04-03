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
        const boatParsed = matter(boatContent);
        const boatData = boatParsed.data;
        
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
            
            // Mettre à jour le frontmatter si de nouvelles images sont trouvées
            if (updatedBoatImages.length !== existingBoatImages.length) {
              const updatedContent = matter.stringify({
                ...boatData,
                boat_images: updatedBoatImages
              }, boatParsed.content);
              
              fs.writeFileSync(boatFilePath, updatedContent);
              console.log(`Mise à jour des images pour ${file} : ${carouselImages.length} images ajoutées`);
            }
          }
        }
        
        // CONSERVER LE CODE EXISTANT POUR LA CRÉATION DES CAROUSELS
        // Ignorer si pas de carousel défini
        if (!boatData.carousel) {
          return;
        }
        
        // [Reste du code original pour la création des carousels]
        // ... (copier le code existant ici)
        
      } catch (error) {
        console.error(`Erreur lors du traitement du bateau ${file}:`, error);
      }
    });
    
    // Écrire le fichier images.json mis à jour
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
    console.log(`Images.json mis à jour avec ${imagesJson.images.length} images`);
  }
}