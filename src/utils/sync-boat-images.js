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
        const { data: boatData, content } = matter(boatContent);
        
        // Récupérer les images du carousel correspondant
        const carouselFilePath = path.join(carouselsDir, `${boatData.carousel_name}.md`);
        
        if (fs.existsSync(carouselFilePath)) {
          const carouselContent = fs.readFileSync(carouselFilePath, 'utf8');
          const carouselData = matter(carouselContent).data;
          
          // Récupérer les chemins des images depuis les données du carousel
          const carouselImages = carouselData.images 
            ? carouselData.images.map(img => img.name)
            : [];
          
          // Ajouter ces images au boat_images s'ils n'y sont pas déjà
          const existingBoatImages = boatData.boat_images || [];
          const updatedBoatImages = [
            ...existingBoatImages,
            ...carouselImages.filter(imgName => 
              !existingBoatImages.includes(imgName)
            )
          ];
          
          // Mettre à jour le frontmatter si nécessaire
          if (updatedBoatImages.length !== existingBoatImages.length) {
            const updatedContent = matter.stringify({
              ...boatData,
              boat_images: updatedBoatImages
            }, content);
            
            fs.writeFileSync(boatFilePath, updatedContent);
            console.log(`Mise à jour des images pour ${file}`);
          }
        }
        
      } catch (error) {
        console.error(`Erreur lors du traitement du bateau ${file}:`, error);
      }
    });
  }
}