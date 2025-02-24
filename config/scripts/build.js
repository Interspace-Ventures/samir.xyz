import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildProject() {
  try {
    console.log('Starting build process...');

    // Setup directories
    const distDir = path.resolve(__dirname, '..', 'dist');
    const publicDir = path.resolve(__dirname, '..', 'public');
    const assetsDirs = ['js', 'css', 'images', 'logos'].map(dir => 
      path.join(distDir, 'assets', dir)
    );

    // Create directory structure
    console.log('Setting up directory structure...');
    [...assetsDirs, publicDir].forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
    });

    // Copy public assets
    console.log('Copying public assets...');
    if (fs.existsSync(publicDir)) {
      fs.cpSync(publicDir, path.join(distDir, 'assets'), { 
        recursive: true,
        force: true
      });
    }

    // Build the application
    console.log('Building application...');
    process.env.NODE_ENV = 'production';

    const { stdout, stderr } = await execAsync(
      'npx vite build --config src/vite.config.ts'
    );

    if (stdout) console.log('Build output:', stdout);
    if (stderr) console.error('Build warnings/errors:', stderr);

    // Verify the build output
    const requiredFiles = ['index.html', 'assets'];
    const missingFiles = requiredFiles.filter(
      file => !fs.existsSync(path.join(distDir, file))
    );

    if (missingFiles.length > 0) {
      throw new Error(
        `Build verification failed: Missing files: ${missingFiles.join(', ')}`
      );
    }

    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();