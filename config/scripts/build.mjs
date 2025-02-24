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

    // Run validation first
    console.log('\nValidating build environment...');
    try {
      await execAsync('node scripts/validateEnvironment.mjs');
    } catch (error) {
      console.error('Build environment validation failed:', error.message);
      process.exit(1);
    }

    // Organize assets first
    console.log('\nOrganizing assets...');
    try {
      await execAsync('node scripts/organize.mjs');
    } catch (error) {
      console.error('Asset organization failed:', error.message);
      process.exit(1);
    }

    // Optimize assets
    console.log('\nOptimizing assets...');
    try {
      await execAsync('node scripts/optimizeAssets.mjs');
    } catch (error) {
      console.error('Asset optimization failed:', error.message);
      process.exit(1);
    }

    // Setup directories
    const distDir = path.resolve(__dirname, '..', 'dist');
    const publicDir = path.resolve(__dirname, '..', 'public');
    const assetsDirs = ['js', 'css', 'images'].map(dir => 
      path.join(distDir, 'assets', dir)
    );

    // Create directory structure
    console.log('\nSetting up directory structure...');
    [...assetsDirs, publicDir].forEach(dir => {
      fs.mkdirSync(dir, { recursive: true });
    });

    // Build the application
    console.log('\nBuilding application...');
    process.env.NODE_ENV = 'production';

    const { stdout, stderr } = await execAsync('npx vite build');

    if (stdout) console.log('Build output:', stdout);
    if (stderr) console.log('Build warnings:', stderr);

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

    console.log('\nBuild completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();