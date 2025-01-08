import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure these directories exist
const directories = [
  'src/components/ui',
  'src/hooks',
  'src/lib',
  'src/pages',
  'src/types',
  'public/assets/images',
  'public/assets/js',
  'public/assets/css'
];

console.log('Creating directory structure...');
directories.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  } else {
    console.log(`Directory already exists: ${dir}`);
  }
});

// Clean up any misplaced assets
const moveAssets = (fromDir, toDir, extensions) => {
  if (!fs.existsSync(fromDir)) return;

  const files = fs.readdirSync(fromDir);
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext)) {
      const sourcePath = path.join(fromDir, file);
      const destPath = path.join(toDir, file);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Moved ${file} to ${toDir}`);
      }
    }
  });
};

// Move assets to their proper locations
const publicDir = path.join(rootDir, 'public');
const assetsDir = path.join(publicDir, 'assets');

// Create asset type mappings
const assetMappings = {
  images: ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'],
  js: ['.js', '.jsx', '.ts', '.tsx'],
  css: ['.css', '.scss', '.sass']
};

// Move assets to their respective directories
Object.entries(assetMappings).forEach(([type, extensions]) => {
  const typeDir = path.join(assetsDir, type);
  if (!fs.existsSync(typeDir)) {
    fs.mkdirSync(typeDir, { recursive: true });
  }
  moveAssets(publicDir, typeDir, extensions);
});

console.log('Asset organization completed!');


// Clean up duplicate build files
const filesToClean = [
  'build.js',
  'build.mjs',
  'config/build.js',
  'config/build.mjs'
];

console.log('\nCleaning up duplicate files...');
filesToClean.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed duplicate file: ${file}`);
  }
});

// Move configuration files to config directory
const configFiles = [
  { from: 'tailwind.config.js', to: 'config/tailwind.config.js' },
  { from: 'postcss.config.js', to: 'config/postcss.config.js' }
];

configFiles.forEach(({ from, to }) => {
  const sourcePath = path.join(rootDir, from);
  const destPath = path.join(rootDir, to);

  if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Moved ${from} to ${to}`);
  }
});

console.log('\nDirectory organization completed!');