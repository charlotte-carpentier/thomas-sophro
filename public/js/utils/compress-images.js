// Import required modules
import imagemin from 'imagemin';             // Image compression library
import imageminMozjpeg from 'imagemin-mozjpeg'; // JPEG compression plugin
import imageminPngquant from 'imagemin-pngquant'; // PNG compression plugin
import imageminSvgo from 'imagemin-svgo';        // SVG compression plugin
import * as glob from 'glob';                   // Glob to match file patterns

(async () => {
  // Use glob to find all image files in the specified directory and subdirectories
  glob('src/assets/images/**/*.{jpg,png,svg}', async (err, files) => {
    if (err) {
      console.error('Error finding images:', err);
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
  });
})();
