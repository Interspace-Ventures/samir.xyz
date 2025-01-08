import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeAssets() {
  console.log('Starting asset optimization...');

  try {
    // Ensure required directories exist
    const rootDir = path.resolve(__dirname, '..');
    const directories = {
      source: {
        logos: path.join(rootDir, 'public/attached_assets/logos'),
        profile: path.join(rootDir, 'public/attached_assets/profile'),
        images: path.join(rootDir, 'public/attached_assets/images')
      },
      output: {
        logos: path.join(rootDir, 'public/assets/images/logos'),
        profile: path.join(rootDir, 'public/assets/images/profile'),
        images: path.join(rootDir, 'public/assets/images/general')
      }
    };

    // Create output directories if they don't exist
    Object.values(directories.output).forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Process each directory
    for (const [key, sourcePath] of Object.entries(directories.source)) {
      if (fs.existsSync(sourcePath)) {
        const files = fs.readdirSync(sourcePath);
        const outputPath = directories.output[key];

        console.log(`\nProcessing ${key} directory...`);
        for (const file of files) {
          if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            const inputFile = path.join(sourcePath, file);
            const outputFile = path.join(outputPath, file);

            // Skip if output file exists and is newer than input file
            if (fs.existsSync(outputFile)) {
              const inputStat = fs.statSync(inputFile);
              const outputStat = fs.statSync(outputFile);
              if (outputStat.mtimeMs > inputStat.mtimeMs) {
                console.log(`Skipping ${file} - already optimized`);
                continue;
              }
            }

            console.log(`Optimizing ${file}...`);
            
            // Optimize using sharp module
            const sharp = (await import('sharp')).default;
            await sharp(inputFile)
              .resize(800, 800, {
                fit: 'inside',
                withoutEnlargement: true
              })
              .webp({ quality: 80 })
              .toFile(outputFile.replace(/\.[^.]+$/, '.webp'));

            // Create a fallback PNG version
            await sharp(inputFile)
              .resize(800, 800, {
                fit: 'inside',
                withoutEnlargement: true
              })
              .png({ quality: 80 })
              .toFile(outputFile.replace(/\.[^.]+$/, '.png'));

            console.log(`✓ Optimized ${file}`);
          }
        }
      }
    }

    console.log('\nAsset optimization completed successfully!');
  } catch (error) {
    console.error('Error during asset optimization:', error);
    process.exit(1);
  }
}

optimizeAssets();
