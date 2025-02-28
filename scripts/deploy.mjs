// deploy.mjs
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function deploy() {
  try {
    console.log('Starting deployment process...');

    // Run the build process
    console.log('Building application...');
    const { stdout: buildOutput, stderr: buildErrors } = await execAsync('npm run build');
    
    if (buildOutput) console.log(buildOutput);
    if (buildErrors) console.error('Build warnings/errors:', buildErrors);

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
          if (fs.statSync(filePath).isDirectory() && !['assets'].includes(file)) {
            // Keep the assets directory
            fs.rmSync(filePath, { recursive: true, force: true });
          } else if (!fs.statSync(filePath).isDirectory()) {
            // Remove files in the root
            fs.rmSync(filePath, { force: true });
          }
        }
        console.log('Cleaned public directory');
      }

      // Copy all build files to public directory
      const buildFiles = fs.readdirSync(buildDir);
      for (const file of buildFiles) {
        const srcPath = path.join(buildDir, file);
        const destPath = path.join(publicDir, file);
        
        if (fs.statSync(srcPath).isDirectory()) {
          // For directories, merge instead of overwrite
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          fs.cpSync(srcPath, destPath, { recursive: true, force: true });
        } else {
          // For files, just copy
          fs.copyFileSync(srcPath, destPath);
        }
      }
      console.log('Copied build files to public directory');
    } else {
      throw new Error('Build directory does not exist. Build process may have failed.');
    }

    // Make sure we have an index.html in the public directory
    if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
      throw new Error('Failed to create index.html in the public directory');
    }

    console.log('Deployment preparation completed!');
    console.log('You can now use the "Deploy" button in Replit');

  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();