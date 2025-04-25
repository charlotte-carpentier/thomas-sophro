// Import required modules
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { globSync } from 'glob';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

// Define target widths for responsive images
const sizes = [480, 960, 1440];

// Step 1: Generate responsive image sizes for .jpg and .png
const originalImages = globSync('src/assets/images/**/*.{jpg,jpeg,png}', { nodir: true });

for (const inputPath of originalImages) {
  const ext = path.extname(inputPath);
  const name = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);

  for (const width of sizes) {
    const outputPath = path.join(dir, `${name}-${width}${ext}`);

    try {
      await sharp(inputPath)
        .resize({ width })
        .toFile(outputPath);

      console.log(`✅ Generated: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error resizing ${inputPath} to ${width}px:`, error);
    }
  }
}

// Step 2: Compress all image files (originals + responsive + SVG)
const allImages = globSync('src/assets/images/**/*.{jpg,jpeg,png,svg}', { nodir: true });

if (!allImages || allImages.length === 0) {
  console.error('⚠️  No images found!');
  process.exit(0);
}

try {
  await imagemin(allImages, {
    destination: 'src/assets/images',
    plugins: [
      imageminMozjpeg({ quality: 75 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
      imageminSvgo()
    ]
  });

  console.log('✨ All images compressed successfully!');
} catch (error) {
  console.error('❌ Error during image compression:', error);
}
