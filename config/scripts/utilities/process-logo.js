const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImage() {
  try {
    console.log('Processing logo image...');
    
    // Input path
    const inputPath = './public/assets/images/original/samir-logo-with-bg.png';
    
    // Output path
    const outputPath = './public/assets/images/samir-full-logo.png';
    
    // Process the image using sharp
    await sharp(inputPath)
      // Remove the black background - make black transparent
      .ensureAlpha()
      .composite([{
        input: Buffer.from(
          '<svg><rect width="100%" height="100%" fill="black"/></svg>'
        ),
        blend: 'dest-out'
      }])
      // Resize to appropriate height while maintaining aspect ratio
      .resize({ height: 36, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      // Output as PNG with transparency
      .png({ quality: 100 })
      .toFile(outputPath);
    
    console.log(`Image processed successfully and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

// Run the function
processImage();