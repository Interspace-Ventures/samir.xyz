#!/usr/bin/env node
/**
 * Deployment Helper Script
 * This script helps with deploying the application by:
 * 1. Making sure all necessary deployment files are available
 * 2. Providing options for deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for prettier output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.blue}========================================${colors.reset}`);
console.log(`${colors.bright}${colors.blue}       PORTFOLIO DEPLOYMENT HELPER      ${colors.reset}`);
console.log(`${colors.bright}${colors.blue}========================================${colors.reset}`);

// Check if we have all the necessary files
const requiredFiles = [
  { name: 'deploy.js', path: './deploy.js' },
  { name: 'server.js', path: './server.js' },
  { name: 'deployment monitor', path: './deployment-monitor.js' }
];

let allFilesExist = true;
console.log(`\n${colors.cyan}Checking for required files:${colors.reset}`);

requiredFiles.forEach(file => {
  if (fs.existsSync(file.path)) {
    console.log(`${colors.green}✓ ${file.name} found${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ ${file.name} not found${colors.reset}`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log(`\n${colors.yellow}Some required files are missing. Let's fix this.${colors.reset}`);
  
  // Create symlinks if needed
  if (!fs.existsSync('./deploy.js') && fs.existsSync('./scripts/deployment/deploy.js')) {
    console.log(`${colors.yellow}Creating symlink for deploy.js...${colors.reset}`);
    try {
      execSync('ln -sf scripts/deployment/deploy.js deploy.js');
      console.log(`${colors.green}✓ Created symlink for deploy.js${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}Error creating symlink: ${error.message}${colors.reset}`);
    }
  }
  
  if (!fs.existsSync('./deployment-monitor.js') && fs.existsSync('./scripts/deployment/monitor.js')) {
    console.log(`${colors.yellow}Creating symlink for deployment-monitor.js...${colors.reset}`);
    try {
      execSync('ln -sf scripts/deployment/monitor.js deployment-monitor.js');
      console.log(`${colors.green}✓ Created symlink for deployment-monitor.js${colors.reset}`);
    } catch (error) {
      console.log(`${colors.red}Error creating symlink: ${error.message}${colors.reset}`);
    }
  }
}

// Check if the public directory exists and has index.html
console.log(`\n${colors.cyan}Checking public directory:${colors.reset}`);
if (fs.existsSync('./public')) {
  console.log(`${colors.green}✓ Public directory found${colors.reset}`);
  
  if (fs.existsSync('./public/index.html')) {
    console.log(`${colors.green}✓ index.html found in public directory${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ index.html not found in public directory${colors.reset}`);
  }
  
  // Count files in public directory
  const publicFiles = fs.readdirSync('./public');
  console.log(`${colors.green}✓ Found ${publicFiles.length} files in public directory${colors.reset}`);
} else {
  console.log(`${colors.red}✗ Public directory not found${colors.reset}`);
}

// Check if build directory exists
console.log(`\n${colors.cyan}Checking build directory:${colors.reset}`);
if (fs.existsSync('./build')) {
  console.log(`${colors.green}✓ Build directory found${colors.reset}`);
  
  if (fs.existsSync('./build/index.html')) {
    console.log(`${colors.green}✓ index.html found in build directory${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ index.html not found in build directory${colors.reset}`);
  }
  
  // Count files in build directory
  const buildFiles = fs.readdirSync('./build');
  console.log(`${colors.green}✓ Found ${buildFiles.length} files in build directory${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠ Build directory not found - this is normal if you haven't built the project yet${colors.reset}`);
}

// Deployment guidance
console.log(`\n${colors.bright}${colors.blue}======== DEPLOYMENT OPTIONS ========${colors.reset}`);
console.log(`\n${colors.magenta}Option 1:${colors.reset} Use Replit's built-in deployment`);
console.log(`   Run: ${colors.cyan}node deploy.js${colors.reset}`);

console.log(`\n${colors.magenta}Option 2:${colors.reset} Use the deployment monitor (recommended)`);
console.log(`   Run: ${colors.cyan}node deployment-monitor.js${colors.reset}`);

console.log(`\n${colors.magenta}Option 3:${colors.reset} Use the simple server`);
console.log(`   Run: ${colors.cyan}node server.js${colors.reset}`);

console.log(`\n${colors.bright}${colors.green}Happy deploying!${colors.reset}`);