import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ensure these directories exist
const directories = [
  'public/assets/images/profile',
  'public/assets/images/logos',
  'public/assets/js',
  'public/assets/css',
  'public/attached_assets/icons',
  'public/attached_assets/profile',
  'public/attached_assets/logos',
  'public/attached_assets/images'
];

console.log('Creating directory structure...');
directories.forEach(dir => {
  const fullPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Copy profile image if it exists in attached_assets
const attachedProfileDir = path.join(rootDir, 'public/attached_assets/profile');
const profileImagesDir = path.join(rootDir, 'public/assets/images/profile');

if (fs.existsSync(attachedProfileDir)) {
  const profileImages = fs.readdirSync(attachedProfileDir);
  profileImages.forEach(file => {
    if (file === 'samir-profile-photo.png') {
      const sourcePath = path.join(attachedProfileDir, file);
      const destPath = path.join(profileImagesDir, file);
      if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied profile image to ${destPath}`);
      }
    }
  });
}

// Move favicon and other icons to attached_assets/icons
const iconFiles = ['favicon.png', 'generated-icon.png'];
const sourceDir = path.join(rootDir, 'public');
const targetDir = path.join(rootDir, 'public/attached_assets/icons');

console.log('\nMoving icon files...');
iconFiles.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    fs.unlinkSync(sourcePath);
    console.log(`Moved ${file} to attached_assets/icons`);
  }
});

// Update HTML files to reference new icon locations
const htmlFiles = [
  'index.html',
  'src/index.html',
  'public/index.html'
];

console.log('\nUpdating HTML files with new icon paths...');
htmlFiles.forEach(htmlFile => {
  const filePath = path.join(rootDir, htmlFile);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(
      /href="\/(?:public\/)?(?:assets\/)?(?:images\/)?favicon\.png"/,
      'href="/attached_assets/icons/favicon.png"'
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