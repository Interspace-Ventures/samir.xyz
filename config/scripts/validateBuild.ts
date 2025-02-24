import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateBuildConfig(): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Check required files exist
  const requiredFiles = [
    { path: '../src/vite.config.ts', name: 'Vite config' },
    { path: '../tailwind.config.js', name: 'Tailwind config' },
    { path: '../tsconfig.json', name: 'TypeScript config' },
    { path: '../index.html', name: 'HTML entry point' }
  ];

  for (const file of requiredFiles) {
    const filePath = path.resolve(__dirname, file.path);
    if (!fs.existsSync(filePath)) {
      result.errors.push(`Missing ${file.name} file at ${filePath}`);
      result.isValid = false;
    }
  }

  // Validate public directory exists
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    result.warnings.push('Public directory is missing. It will be created during build.');
  }

  // Check source directories
  const srcDir = path.resolve(__dirname, '../src');
  const requiredDirs = ['components', 'pages', 'lib'];
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(srcDir, dir);
    if (!fs.existsSync(dirPath)) {
      result.errors.push(`Missing required directory: ${dir}`);
      result.isValid = false;
    }
  }

  // Validate package.json
  try {
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    const requiredScripts = ['dev', 'build'];
    for (const script of requiredScripts) {
      if (!packageJson.scripts?.[script]) {
        result.errors.push(`Missing required script in package.json: ${script}`);
        result.isValid = false;
      }
    }
  } catch (error) {
    result.errors.push('Failed to read or parse package.json');
    result.isValid = false;
  }

  return result;
}
