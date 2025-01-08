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

  const rootDir = path.resolve(__dirname, '../..');
  console.log('Validating build configuration...');
  console.log('Root directory:', rootDir);

  // Check source directories
  const srcDirs = ['src/components', 'src/pages', 'src/lib'];
  srcDirs.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    console.log(`Checking directory: ${dirPath}`);
    if (!fs.existsSync(dirPath)) {
      result.warnings.push(`Missing recommended directory: ${dir}`);
    }
  });

  // Check for configuration files in both root and config directories
  const configFiles = [
    { name: 'Vite config', paths: ['src/vite.config.ts', 'vite.config.ts'] },
    { name: 'Tailwind config', paths: ['config/tailwind.config.js', 'tailwind.config.js'] },
    { name: 'TypeScript config', paths: ['config/tsconfig.json', 'tsconfig.json'] },
    { name: 'HTML entry', paths: ['index.html'] }
  ];

  configFiles.forEach(({ name, paths }) => {
    const exists = paths.some(filePath => {
      const fullPath = path.resolve(rootDir, filePath);
      console.log(`Checking ${name} at: ${fullPath}`);
      return fs.existsSync(fullPath);
    });

    if (!exists) {
      result.errors.push(`Missing ${name}`);
      result.isValid = false;
    }
  });

  // Check build dependencies
  try {
    const packageJsonPath = path.resolve(rootDir, 'package.json');
    console.log('Checking package.json at:', packageJsonPath);

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Verify required build dependencies
      const requiredDeps = ['vite', '@vitejs/plugin-react', 'typescript'];
      const missingDeps = requiredDeps.filter(dep => 
        !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
      );

      if (missingDeps.length > 0) {
        result.warnings.push(`Missing build dependencies: ${missingDeps.join(', ')}`);
      }
    }
  } catch (error) {
    console.error('Error checking package.json:', error);
    result.warnings.push('Error checking build dependencies');
  }

  // Check public assets directory
  const publicDir = path.join(rootDir, 'public');
  const assetsDir = path.join(publicDir, 'assets');

  if (!fs.existsSync(publicDir)) {
    console.log('Creating public directory');
    fs.mkdirSync(publicDir, { recursive: true });
    result.warnings.push('Created missing public directory');
  }

  if (!fs.existsSync(assetsDir)) {
    console.log('Creating assets directory');
    fs.mkdirSync(assetsDir, { recursive: true });
    result.warnings.push('Created missing assets directory');
  }

  // Generate report
  const report = generateValidationReport(result);
  console.log('\n' + report);

  return result;
}

function generateValidationReport(result: ValidationResult): string {
  const lines: string[] = ['Build Environment Validation Report:', ''];

  if (result.isValid) {
    lines.push('✅ Build environment is properly configured\n');
  } else {
    lines.push('❌ Build environment validation failed\n');
  }

  if (result.errors.length > 0) {
    lines.push('Errors:');
    result.errors.forEach(error => lines.push(`  ❌ ${error}`));
    lines.push('');
  }

  if (result.warnings.length > 0) {
    lines.push('Warnings:');
    result.warnings.forEach(warning => lines.push(`  ⚠️ ${warning}`));
  }

  return lines.join('\n');
}

// Run validation if this file is executed directly
if (import.meta.url === `file://${__filename}`) {
  validateBuildConfig();
}