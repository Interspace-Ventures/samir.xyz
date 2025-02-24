import sharp from 'sharp';

// Process the Goodmylk logo
async function processLogo() {
  const inputPath = 'public/assets/images/logos/Goodmylk.png';
  
  // Generate WebP version
  await sharp(inputPath)
    .webp({ quality: 90 })
    .toFile('public/assets/images/logos/Goodmylk.webp');
    
  // Create placeholder version
  await sharp(inputPath)
    .resize(50, 50, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .png()
    .toFile('public/assets/images/logos/Goodmylk-placeholder.png');
}

processLogo().catch(console.error);
