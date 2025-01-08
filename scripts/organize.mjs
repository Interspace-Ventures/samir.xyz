import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Source and target directories for assets
const directories = {
  source: {
    logos: path.join(rootDir, 'attached_assets', 'logos'),
    profile: path.join(rootDir, 'attached_assets', 'profile'),
    images: path.join(rootDir, 'attached_assets', 'images')
  },
  target: {
    logos: path.join(rootDir, 'public', 'assets', 'images', 'logos'),
    profile: path.join(rootDir, 'public', 'assets', 'images', 'profile'),
    general: path.join(rootDir, 'public', 'assets', 'images', 'general')
  }
};

// Create all necessary directories
Object.values(directories).forEach(dirGroup => {
  Object.values(dirGroup).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
});

// Move profile image if it exists in root
['png', 'webp'].forEach(ext => {
  const sourcePath = path.join(rootDir, `profile-photo.${ext}`);
  if (fs.existsSync(sourcePath)) {
    const targetPath = path.join(directories.source.profile, `profile-photo.${ext}`);
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Moved profile-photo.${ext} to source directory`);
  }
});

// Move any existing logos to source directory
const existingLogosDir = path.join(rootDir, 'logos');
if (fs.existsSync(existingLogosDir)) {
  fs.readdirSync(existingLogosDir).forEach(file => {
    if (file.match(/\.(png|jpg|webp)$/i)) {
      const sourcePath = path.join(existingLogosDir, file);
      const targetPath = path.join(directories.source.logos, file);
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Moved ${file} to source logos directory`);
    }
  });
}


// Move favicon and other icons to assets/icons
const iconFiles = ['favicon.png', 'favicon.ico'];
const sourceDir = path.join(rootDir, 'public');
const targetDir = path.join(rootDir, 'public/assets/icons');

console.log('\nMoving icon files...');
iconFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    fs.unlinkSync(sourcePath);
    console.log(`Moved ${file} to assets/icons`);
  }
});

// Update HTML files to reference new icon locations
const htmlFiles = ['index.html', 'public/index.html'];

console.log('\nUpdating HTML files with new icon paths...');
htmlFiles.forEach(htmlFile => {
  const filePath = path.join(rootDir, htmlFile);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      /href="\/(?:attached_assets|assets)\/icons\/favicon\.png"/,
      'href="/assets/icons/favicon.png"'
    );
    fs.writeFileSync(filePath, content);
    console.log(`Updated icon path in ${htmlFile}`);
  }
});

console.log('\nAsset organization completed!');

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