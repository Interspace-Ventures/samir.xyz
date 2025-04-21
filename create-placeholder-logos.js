/**
 * Create Placeholder Logos Script
 * 
 * This script creates placeholder SVG files for company logos.
 * 
 * Run with: `node create-placeholder-logos.js`
 */

const fs = require('fs');
const path = require('path');

const COMPANIES = [
  'aon3d', 'margin', 'restream', 'soot', 'sugar', 'techmate',
  'june-shine', 'sanzo', 'super-plastic', 'swansea-city', 'the-coffee', 'the-food-company',
  'afar', 'aura', 'gem', 'goodmylk', 'h', 'playbook', 'rpm',
  'backpack', 'hash', 'kartera', 'keep', 'naridea', 'rely', 'sundae', 'swan', 'waldo'
];

// Create the companies directory if it doesn't exist
const companiesDir = path.join(__dirname, 'public', 'companies');
if (!fs.existsSync(companiesDir)) {
  fs.mkdirSync(companiesDir, { recursive: true });
}

// Function to create a simple SVG placeholder with the company name
function createPlaceholderSVG(name) {
  const displayName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80">
  <rect width="200" height="80" fill="white"/>
  <text x="100" y="40" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">${displayName}</text>
</svg>
  `.trim();

  const filePath = path.join(companiesDir, `${name}.svg`);
  fs.writeFileSync(filePath, svgContent);
  return filePath;
}

// Create placeholder SVGs for all companies
console.log('Creating placeholder SVG logos...');
COMPANIES.forEach((company) => {
  const filePath = createPlaceholderSVG(company);
  console.log(`Created: ${filePath}`);
});

console.log(`Created ${COMPANIES.length} placeholder logo files.`);