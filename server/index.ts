import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to list directory contents recursively
function listDirectoryContents(dir: string, prefix = ''): void {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      console.log(`${prefix}📁 ${file}/`);
      listDirectoryContents(filePath, `${prefix}  `);
    } else {
      console.log(`${prefix}📄 ${file}`);
    }
  });
}

// Run the build process first
console.log('Starting build process...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');

  // Print the build directory structure
  console.log('\nBuild directory structure:');
  const buildDir = path.join(__dirname, '../build');
  if (fs.existsSync(buildDir)) {
    listDirectoryContents(buildDir);
  } else {
    console.error('Build directory not found!');
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

const app: Express = express();
const port = process.env.PORT || 3000;

// Add detailed logging middleware to debug static file serving
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Log when the request completes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const cssHighlight = req.url.endsWith('.css') ? '🎨 CSS Request:' : '';
    console.log(
      `[${new Date().toISOString()}] ${cssHighlight} ${req.method} ${req.url} - ${status} (${duration}ms)`
    );

    // Additional debug info for CSS files
    if (req.url.endsWith('.css')) {
      const cssPath = path.join(staticPath, req.url);
      console.log(`  CSS File Path: ${cssPath}`);
      console.log(`  CSS File Exists: ${require('fs').existsSync(cssPath)}`);
      if (status === 404) {
        console.log('  🚫 CSS file not found at expected location');
        // List contents of assets directory to help debug
        const assetsDir = path.join(staticPath, 'assets');
        if (require('fs').existsSync(assetsDir)) {
          console.log('  Available files in assets directory:');
          require('fs').readdirSync(assetsDir, { recursive: true }).forEach((file: string) => {
            console.log(`    - ${file}`);
          });
        }
      }
    }
  });

  next();
});

// Serve static files from the build directory
const staticPath = path.join(__dirname, '../build');
console.log(`Static files being served from: ${staticPath}`);
app.use(express.static(staticPath));

// SPA fallback - this should be after static file middleware
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`Static files served from ${staticPath}`);
});