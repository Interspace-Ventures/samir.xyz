import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Source and target directories for assets
const directories = {
  source: {
    attached: path.join(rootDir, 'attached_assets'),
    assets: path.join(rootDir, 'assets'),
  },
  target: {
    logos: path.join(rootDir, 'public', 'assets', 'images', 'logos'),
    profile: path.join(rootDir, 'public', 'assets', 'images', 'profile'),
    general: path.join(rootDir, 'public', 'assets', 'images', 'general')
  }
};

// Create all necessary directories
Object.values(directories.target).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Move files from attached_assets to appropriate target directories
if (fs.existsSync(directories.source.attached)) {
  console.log('\nMoving files from attached_assets...');
  fs.readdirSync(directories.source.attached, { withFileTypes: true })
    .forEach(dirent => {
      if (dirent.isFile() && /\.(png|jpe?g|gif|webp)$/i.test(dirent.name)) {
        const sourcePath = path.join(directories.source.attached, dirent.name);
        let targetDir = directories.target.general;

        // Determine appropriate target directory based on filename
        if (dirent.name.includes('logo')) {
          targetDir = directories.target.logos;
        } else if (dirent.name.includes('profile')) {
          targetDir = directories.target.profile;
        }

        const targetPath = path.join(targetDir, dirent.name);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Moved ${dirent.name} to ${path.relative(rootDir, targetDir)}`);
      }
    });

  // Clean up attached_assets directory after moving files
  fs.rmSync(directories.source.attached, { recursive: true, force: true });
  console.log('Removed attached_assets directory');
}

// Move files from assets directory
if (fs.existsSync(directories.source.assets)) {
  console.log('\nMoving files from assets directory...');
  fs.readdirSync(directories.source.assets, { withFileTypes: true })
    .forEach(dirent => {
      if (dirent.isFile() && /\.(png|jpe?g|gif|webp)$/i.test(dirent.name)) {
        const sourcePath = path.join(directories.source.assets, dirent.name);
        let targetDir = directories.target.general;

        // Determine appropriate target directory based on filename
        if (dirent.name.includes('logo')) {
          targetDir = directories.target.logos;
        } else if (dirent.name.includes('profile')) {
          targetDir = directories.target.profile;
        }

        const targetPath = path.join(targetDir, dirent.name);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Moved ${dirent.name} to ${path.relative(rootDir, targetDir)}`);
      }
    });
}

console.log('\nAsset organization completed!');

// Move favicon and other icons to assets/icons
const iconFiles = ['favicon.png', 'favicon.ico'];
const sourceDir = path.join(rootDir, 'public');
const targetDir = path.join(rootDir, 'public/assets/icons');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

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