import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeAssets() {
  console.log('Starting asset optimization...');

  try {
    const rootDir = path.resolve(__dirname, '..');
    const directories = {
      source: {
        logos: path.join(rootDir, 'assets', 'logos'),
        profile: path.join(rootDir, 'assets', 'profile'),
        images: path.join(rootDir, 'assets', 'images')
      },
      target: {
        logos: path.join(rootDir, 'public', 'assets', 'images', 'logos'),
        profile: path.join(rootDir, 'public', 'assets', 'images', 'profile'),
        general: path.join(rootDir, 'public', 'assets', 'images', 'general')
      }
    };

    const sharp = (await import('sharp')).default;

    // Process each directory
    for (const [category, sourcePath] of Object.entries(directories.source)) {
      const targetPath = directories.target[category === 'images' ? 'general' : category];

      if (fs.existsSync(sourcePath)) {
        const files = fs.readdirSync(sourcePath);
        console.log(`\nProcessing ${category} directory...`);

        for (const file of files) {
          if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const inputFile = path.join(sourcePath, file);
            const baseName = path.parse(file).name;

            console.log(`Optimizing ${file}...`);

            // Generate placeholder (low-res, blurred)
            await sharp(inputFile)
              .resize(40, 40, { fit: 'inside' })
              .blur(2)
              .toFile(path.join(targetPath, `${baseName}-placeholder.png`));

            // Generate WebP version
            await sharp(inputFile)
              .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(path.join(targetPath, `${baseName}.webp`));

            // Generate PNG fallback
            await sharp(inputFile)
              .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
              .png({ quality: 80 })
              .toFile(path.join(targetPath, `${baseName}.png`));

            console.log(`✓ Generated optimized versions for ${file}`);
          }
        }
      } else {
        console.log(`Warning: Source directory ${sourcePath} does not exist`);
      }
    }

    console.log('\nAsset optimization completed successfully!');
  } catch (error) {
    console.error('Error during asset optimization:', error);
    process.exit(1);
  }
}

optimizeAssets();