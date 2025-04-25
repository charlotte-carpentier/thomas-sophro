// Import required modules
import imagemin from 'imagemin';             // Image compression library
import imageminMozjpeg from 'imagemin-mozjpeg'; // JPEG compression plugin
import imageminPngquant from 'imagemin-pngquant'; // PNG compression plugin
import imageminSvgo from 'imagemin-svgo';        // SVG compression plugin
import { globSync } from 'glob';  // Use globSync instead of glob function (for ESM compatibility)

(async () => {
  // Use globSync to find all image files in the specified directory and subdirectories
  const files = globSync('src/assets/images/**/*.{jpg,png,svg}');

  if (!files || files.length === 0) {
    console.error('No images found!');
    return;
  }

  // Compress the found image files
  try {
    await imagemin(files, {
      destination: 'src/assets/images',  // Overwrite the existing images
      plugins: [
        imageminMozjpeg({ quality: 75 }),  // Set JPEG compression quality
        imageminPngquant({ quality: [0.6, 0.8] }),  // Set PNG compression quality
        imageminSvgo()  // Optimize SVG files
      ]
    });

    console.log('Images compressed and overwritten successfully!');
  } catch (error) {
    console.error('Error during image compression:', error);
  }
})();
