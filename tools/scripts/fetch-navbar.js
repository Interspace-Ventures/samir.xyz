const fs = require('fs');
const { fetch } = require('undici');

async function fetchNavbar() {
  try {
    console.log('Fetching page from http://localhost:5000/profile/');
    const response = await fetch('http://localhost:5000/profile/');
    const html = await response.text();

    // Save the full HTML to a temporary directory
    const tempDir = './tools/tmp';
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    fs.writeFileSync(`${tempDir}/page.html`, html);
    console.log(`Full page HTML saved to ${tempDir}/page.html`);

    // Extract the navbar HTML using regex
    const navbarRegex = /<nav[^>]*>[\s\S]*?<\/nav>/i;
    const navbarMatch = html.match(navbarRegex);

    if (navbarMatch) {
      const navbarHtml = navbarMatch[0];
      fs.writeFileSync(`${tempDir}/navbar.html`, navbarHtml);
      console.log(`Navbar HTML extracted and saved to ${tempDir}/navbar.html`);
      console.log('Navbar HTML preview:');
      console.log(navbarHtml.substring(0, 500) + (navbarHtml.length > 500 ? '...' : ''));
    } else {
      console.log('No navbar HTML found in the page (may be client-rendered)');
      
      // Check if we have placeholder for client rendering
      if (html.includes('id="navbar-container"') || html.includes('className="ultra-simple-navbar"')) {
        console.log('Found navbar container element (client-side rendering placeholder)');
      }
    }

    // Check for direct reference to our SVG logo
    if (html.includes('samir-full-logo.svg')) {
      console.log('✅ Page includes direct reference to samir-full-logo.svg');
      
      // Extract the img tag with our logo
      const logoRegex = /<img[^>]*samir-full-logo\.svg[^>]*>/i;
      const logoMatch = html.match(logoRegex);
      
      if (logoMatch) {
        console.log('Logo img tag found:');
        console.log(logoMatch[0]);
      } else {
        console.log('Logo img tag not found directly in the HTML (may be in JavaScript)');
      }
    } else {
      console.log('No direct reference to samir-full-logo.svg found in the page HTML');
      
      // Check for JavaScript bundle references
      console.log('Checking for SVG reference in JavaScript bundles...');
      
      // Find all JS files referenced
      const jsFiles = html.match(/\/_next\/static\/chunks\/[^"']+\.js/g) || [];
      
      if (jsFiles.length > 0) {
        console.log(`Found ${jsFiles.length} JavaScript files to check`);
        try {
          // Check first bundle for SVG reference
          const jsUrl = `http://localhost:5000${jsFiles[0]}`;
          const jsResponse = await fetch(jsUrl);
          const jsContent = await jsResponse.text();
          
          if (jsContent.includes('samir-full-logo.svg')) {
            console.log(`✅ Found reference to samir-full-logo.svg in JavaScript bundle`);
          } else {
            console.log('No reference to logo found in first JavaScript bundle');
          }
        } catch (jsError) {
          console.error('Error checking JavaScript bundle:', jsError);
        }
      }
    }
    
    // Check if logo file exists directly
    try {
      const logoResponse = await fetch('http://localhost:5000/assets/images/samir-full-logo.svg');
      if (logoResponse.ok) {
        console.log(`✅ SVG logo is directly accessible via HTTP (${logoResponse.status})`);
      } else {
        console.log(`❌ SVG logo request failed with status ${logoResponse.status}`);
      }
    } catch (logoError) {
      console.error('Error checking logo accessibility:', logoError);
    }
    
  } catch (error) {
    console.error('Error fetching or processing the page:', error);
  }
}

fetchNavbar();