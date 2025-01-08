import { fileURLToPath } from 'url';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function validateEnvironment() {
  console.log('Validating build environment...\n');

  try {
    // First ensure the asset directories exist
    const rootDir = path.resolve(__dirname, '..');
    const assetDirs = [
      'public/assets/images',
      'public/assets/js',
      'public/assets/css'
    ];

    assetDirs.forEach(dir => {
      const fullPath = path.join(rootDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created missing asset directory: ${dir}`);
      }
    });

    // Execute the build config validation
    const { stdout, stderr } = await execAsync(
      `npx tsx ${path.resolve(__dirname, '..', 'src', 'config', 'validateBuildConfig.ts')}`
    );

    if (stderr) {
      console.error('Validation errors:', stderr);
      process.exit(1);
    }

    console.log(stdout);

    // Check if validation failed
    if (stdout.includes('❌ Build environment validation failed')) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during validation:', error);
    process.exit(1);
  }
}

validateEnvironment();