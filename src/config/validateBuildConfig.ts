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

  // Define required build environment configuration
  const requiredFiles = [
    { path: 'src/vite.config.ts', altPath: 'config/vite.config.ts', name: 'Vite config' },
    { path: 'tailwind.config.js', altPath: 'config/tailwind.config.js', name: 'Tailwind config' },
    { path: 'tsconfig.json', altPath: 'config/tsconfig.json', name: 'TypeScript config' },
    { path: 'index.html', name: 'HTML entry point' }
  ];

  const rootDir = path.resolve(__dirname, '../..');

  // Check required source directories
  const srcDirs = ['src/components', 'src/pages', 'src/lib'];
  srcDirs.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (!fs.existsSync(dirPath)) {
      result.warnings.push(`Missing recommended directory: ${dir}`);
    }
  });

  // Validate configuration files exist in either root or config directory
  requiredFiles.forEach(file => {
    const mainPath = path.resolve(rootDir, file.path);
    const altPath = file.altPath ? path.resolve(rootDir, file.altPath) : null;

    if (!fs.existsSync(mainPath) && (!altPath || !fs.existsSync(altPath))) {
      result.errors.push(`Missing ${file.name}`);
      result.isValid = false;
    }
  });

  // Validate package.json
  try {
    const packageJsonPath = path.resolve(rootDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Verify required build dependencies are present
      const requiredDeps = ['vite', '@vitejs/plugin-react', 'typescript'];
      const missingDeps = requiredDeps.filter(dep => 
        !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
      );

      if (missingDeps.length > 0) {
        result.warnings.push(`Missing build dependencies: ${missingDeps.join(', ')}`);
      }
    } else {
      result.errors.push('Missing package.json');
      result.isValid = false;
    }
  } catch (error) {
    result.errors.push('Failed to read or parse package.json');
    result.isValid = false;
  }

  // Validate public directory and assets
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    result.warnings.push('Public directory is missing. It will be created during build.');
  }


  const report = generateValidationReport(result);
  console.log(report);

  return result;
}

function generateValidationReport(result: ValidationResult): string {
  const lines: string[] = ['Build Environment Validation Report:'];

  if (result.isValid) {
    lines.push('\n✅ Build environment is properly configured\n');
  } else {
    lines.push('\n❌ Build environment validation failed\n');
  }

  if (result.errors.length > 0) {
    lines.push('\nErrors:');
    result.errors.forEach(error => lines.push(`  ❌ ${error}`));
  }

  if (result.warnings.length > 0) {
    lines.push('\nWarnings:');
    result.warnings.forEach(warning => lines.push(`  ⚠️ ${warning}`));
  }

  return lines.join('\n');
}

// Run the validation if this file is executed directly
if (import.meta.url === `file://${__filename}`) {
  validateBuildConfig();
}