const fs = require('fs');
const path = require('path');

function createFaviconSvg() {
  const outputDir = path.join(__dirname, 'public', 'assets', 'images');
  const outputFile = path.join(outputDir, 'favicon.svg');

  // Make sure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Create a simple SVG with a gradient similar to the logo
    const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="256" fill="url(#paint0_linear)"/>
  <path d="M256 128L384 384H128L256 128Z" fill="white"/>
  <defs>
    <linearGradient id="paint0_linear" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2A3BFF"/>
      <stop offset="1" stop-color="#C7D2FE"/>
    </linearGradient>
  </defs>
</svg>`;
    
    fs.writeFileSync(outputFile, svgContent);
    
    console.log(`Successfully created ${outputFile}`);
  } catch (error) {
    console.error('Error creating favicon SVG:', error);
  }
}

createFaviconSvg();