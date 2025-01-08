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
  'config',
  'public/assets/images',
  'public/assets/logos',
  'public/assets/css',
  'public/assets/js',
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

// Move files to their correct locations
const filesToMove = [
  { from: 'build.js', to: 'scripts/build.js' },
  { from: 'build.mjs', to: 'scripts/build.mjs' },
  { from: 'config/build.js', to: 'scripts/build.js' },
  { from: 'config/build.mjs', to: 'scripts/build.mjs' }
];

console.log('\nOrganizing build files...');
filesToMove.forEach(({ from, to }) => {
  const sourcePath = path.join(rootDir, from);
  const destPath = path.join(rootDir, to);

  if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.renameSync(sourcePath, destPath);
    console.log(`Moved ${from} to ${to}`);
  }
});

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