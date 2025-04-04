/**
 * Boat Image Synchronization Utility
 * 
 * Bidirectional synchronization between boat data files and carousel components with:
 * - Automatic image mapping between boats and carousels
 * - Updating image references in images.json
 * - Adding boat models and names to headings.json
 * - Anti-loop protection to prevent excessive execution
 * 
 * @version 7.2
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Global variable to track last execution
let lastSyncTime = 0;

/**
 * Synchronizes images between boats and carousels bidirectionally
 * and adds boat names/models to headings.json
 * 
 * @returns {void}
 */
export function syncBoatImages() {
  // Anti-loop: check time elapsed since last execution
  const now = Date.now();
  if (now - lastSyncTime < 3000) { // Minimum 3 seconds between executions
    console.log("Synchronization skipped (too recent execution)");
    return;
  }
  lastSyncTime = now;
  
  const boatsDir = './src/collection-boats';
  const carouselsDir = './src/collection-carousels';
  const imagesJsonPath = './src/_data/atoms/images.json';
  const headingsJsonPath = './src/_data/atoms/headings.json';
  
  console.log("Starting bidirectional synchronization...");
  
  // Check and create required directories
  if (!fs.existsSync(carouselsDir)) {
    fs.mkdirSync(carouselsDir, { recursive: true });
  }
  
  // Load images.json
  let imagesJson;
  try {
    imagesJson = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf8'));
    console.log(`Images.json loaded with ${imagesJson.images.length} images`);
  } catch (error) {
    console.error('Error reading images.json:', error);
    return;
  }
  
  // Load headings.json
  let headingsJson;
  try {
    headingsJson = JSON.parse(fs.readFileSync(headingsJsonPath, 'utf8'));
    console.log(`Headings.json loaded with ${headingsJson.headings.length} entries`);
  } catch (error) {
    console.error('Error reading headings.json:', error);
    return;
  }
  
  // Create sets for quick lookups
  const existingImageIds = new Set(imagesJson.images.map(img => img.name));
  const existingHeadingNames = new Set(headingsJson.headings.map(heading => heading.name));
  
  // Load all existing carousels
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
          console.error(`Error reading carousel ${file}:`, error);
        }
      });
  }
  
  if (fs.existsSync(boatsDir)) {
    const boatFiles = fs.readdirSync(boatsDir).filter(file => file.endsWith('.md'));
    console.log(`Processing ${boatFiles.length} boat files`);
    
    boatFiles.forEach(file => {
      try {
        console.log(`\nProcessing boat: ${file}`);
        const boatFilePath = path.join(boatsDir, file);
        const boatFileContent = fs.readFileSync(boatFilePath, 'utf8');
        const parsedBoatFile = matter(boatFileContent);
        
        // Handle model and technical name for new boats
        if (parsedBoatFile.data.model) {
          const modelName = parsedBoatFile.data.model;
          
          // Check if model already exists in headings.json
          if (!existingHeadingNames.has(modelName)) {
            // Add new model with appropriate formatting
            headingsJson.headings.push({
              name: modelName,
              text: `_${modelName}`,
              level: 2,
              style: "ma_nautic_section_title"
            });
            existingHeadingNames.add(modelName);
            console.log(`New model added to headings.json: ${modelName}`);
          }
        }
        
        if (parsedBoatFile.data.name) {
          const technicalName = parsedBoatFile.data.name;
          
          // Check if technical name already exists in headings.json
          if (!existingHeadingNames.has(technicalName)) {
            // Add new technical name with appropriate formatting
            headingsJson.headings.push({
              name: technicalName,
              text: technicalName.replace('boat_', ''),
              level: 2,
              style: "ma_nautic_subtitle_boat"
            });
            existingHeadingNames.add(technicalName);
            console.log(`New technical name added to headings.json: ${technicalName}`);
          }
        }
        
        // Determine carousel name associated with the boat
        const carouselName = parsedBoatFile.data.carousel_name;
        
        if (!carouselName) {
          console.log("No carousel_name defined for this boat, skipping to next");
          return;
        }
        
        console.log(`Associated carousel: ${carouselName}`);
        
        // Check if boat has images
        if (!parsedBoatFile.data.boat_images || !Array.isArray(parsedBoatFile.data.boat_images) || parsedBoatFile.data.boat_images.length === 0) {
          console.log("No images in boat, checking existing carousel...");
          
          // If boat has no images but a carousel exists, retrieve images from carousel
          if (existingCarousels[carouselName]) {
            const carouselImages = existingCarousels[carouselName].data.images || [];
            
            if (carouselImages.length > 0) {
              // Retrieve image URLs from images.json
              const imageUrls = carouselImages
                .map(imgRef => {
                  if (!imgRef || !imgRef.name) return null;
                  const imageInfo = imagesJson.images.find(img => img.name === imgRef.name);
                  return imageInfo ? imageInfo.src : null;
                })
                .filter(img => img !== null);
              
              if (imageUrls.length > 0) {
                console.log(`${imageUrls.length} images found in carousel, updating boat`);
                
                // Update boat with carousel images
                parsedBoatFile.data.boat_images = imageUrls;
                
                const updatedContent = matter.stringify(parsedBoatFile.content, parsedBoatFile.data);
                fs.writeFileSync(boatFilePath, updatedContent);
                console.log(`Boat ${file} updated with ${imageUrls.length} images`);
              }
            }
          }
          
          // No images to sync to carousel, move to next boat
          return;
        }
        
        console.log(`${parsedBoatFile.data.boat_images.length} images found in boat`);
        
        // Create or update entries in images.json and prepare references for carousel
        const carouselImageRefs = [];
        
        parsedBoatFile.data.boat_images.forEach((imgUrl, index) => {
          // Create unique ID for image
          const imageId = `${carouselName}_slide_${index + 1}`;
          
          // Check if this URL already exists in images.json under another name
          const existingImage = imagesJson.images.find(img => img.src === imgUrl);
          
          if (existingImage) {
            // If image already exists, use its existing ID
            carouselImageRefs.push({
              name: existingImage.name,
              objectPosition: "center"
            });
            console.log(`Existing image found: ${existingImage.name} -> ${imgUrl}`);
          } else {
            // Check if ID already exists (to avoid duplicates)
            if (!existingImageIds.has(imageId)) {
              // Add image to images.json
              imagesJson.images.push({
                name: imageId,
                src: imgUrl,
                alt: parsedBoatFile.data.imageAlt || `Image ${index + 1} of boat ${parsedBoatFile.data.model}`,
                group: "block-media"
              });
              existingImageIds.add(imageId);
              console.log(`New image added: ${imageId} -> ${imgUrl}`);
            } else {
              // Update existing image
              const imgIndex = imagesJson.images.findIndex(img => img.name === imageId);
              if (imgIndex !== -1) {
                imagesJson.images[imgIndex].src = imgUrl;
                imagesJson.images[imgIndex].alt = parsedBoatFile.data.imageAlt || `Image ${index + 1} of boat ${parsedBoatFile.data.model}`;
                console.log(`Image updated: ${imageId} -> ${imgUrl}`);
              }
            }
            
            carouselImageRefs.push({
              name: imageId,
              objectPosition: "center"
            });
          }
        });
        
        // Create or update carousel file
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
        console.log(`Carousel ${carouselName} created/updated with ${carouselImageRefs.length} images`);
        
      } catch (error) {
        console.error(`Error processing boat ${file}:`, error);
        console.error(error.stack);
      }
    });
    
    // Save changes to JSON files
    fs.writeFileSync(imagesJsonPath, JSON.stringify(imagesJson, null, 2));
    console.log(`\nImages.json updated with ${imagesJson.images.length} images`);
    
    fs.writeFileSync(headingsJsonPath, JSON.stringify(headingsJson, null, 2));
    console.log(`\nHeadings.json updated with ${headingsJson.headings.length} titles`);
  }
}