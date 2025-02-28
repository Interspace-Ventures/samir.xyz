// prepare-deploy.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Source and target directories
const buildDir = path.join(rootDir, 'build');
const publicDir = path.join(rootDir, 'public');

console.log('Preparing files for Replit deployment...');

// Create public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('Created public directory');
}

// Copy all files from build directory to public directory
if (fs.existsSync(buildDir)) {
  // First, remove existing files in public directory to avoid conflicts
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    for (const file of files) {
      const filePath = path.join(publicDir, file);
      fs.rmSync(filePath, { recursive: true, force: true });
    }
    console.log('Cleaned public directory');
  }

  // Copy all build files to public directory
  fs.cpSync(buildDir, publicDir, { 
    recursive: true,
    force: true 
  });
  console.log('Copied build files to public directory');
}

console.log('Deployment preparation completed!');