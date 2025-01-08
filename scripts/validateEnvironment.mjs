import { fileURLToPath } from 'url';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function validateEnvironment() {
  console.log('Validating build environment...\n');

  try {
    // Execute the validation using tsx to support TypeScript
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