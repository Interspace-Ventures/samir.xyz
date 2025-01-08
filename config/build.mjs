import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { validateBuildConfig } from '../dist/config/validateBuildConfig.js';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildProject() {
  try {
    console.log('Starting build process...');

    // Compile the validation script first
    console.log('Compiling validation script...');
    await execAsync('npx tsc src/config/validateBuildConfig.ts --outDir dist/config --module ES2020 --target ES2020');

    // Validate build configuration
    console.log('Validating build configuration...');
    const validation = validateBuildConfig();

    if (!validation.isValid) {
      console.error('Build configuration validation failed:');
      validation.errors.forEach(error => console.error(`❌ ${error}`));
      validation.warnings.forEach(warning => console.warn(`⚠️ ${warning}`));
      process.exit(1);
    }

    if (validation.warnings.length > 0) {
      console.warn('\nBuild configuration warnings:');
      validation.warnings.forEach(warning => console.warn(`⚠️ ${warning}`));
    }

    console.log('✅ Build configuration validation passed');

    // Setup directories
    const distPath = path.resolve(__dirname, '..', 'dist');
    const assetsDir = path.join(distPath, 'assets');

    // Create directory structure if it doesn't exist
    fs.mkdirSync(path.join(assetsDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'img'), { recursive: true });
    fs.mkdirSync(path.join(assetsDir, 'logos'), { recursive: true });
    console.log('Created/verified directory structure');

    // Build static site
    console.log('Building static site...');
    process.env.NODE_ENV = 'production';

    const { stdout, stderr } = await execAsync('npx vite build');
    console.log('Build output:', stdout);
    if (stderr) console.error('Build stderr:', stderr);

    // Verify the build output
    if (!fs.existsSync(path.join(distPath, 'index.html'))) {
      throw new Error('Build verification failed: index.html not found');
    }

    console.log('Build process completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();
