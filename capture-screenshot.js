const http = require('http');

// Function to check if server is ready
function checkServerReady() {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      http.get('http://localhost:5000/profile/', (res) => {
        clearInterval(checkInterval);
        console.log(`Server is ready! Status code: ${res.statusCode}`);
        resolve(true);
      }).on('error', (err) => {
        console.log('Waiting for server to be ready...');
      });
    }, 1000);
  });
}

async function captureScreenshot() {
  try {
    // Ensure the server is ready before proceeding
    console.log('Checking if server is ready...');
    await checkServerReady();
    
    console.log('Server is ready, capturing navbar state...');
    
    // Use http request instead of puppeteer
    const request = http.request('http://localhost:5000/profile/', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('HTTP Request completed');
        
        // Check if the navbar contains our SVG logo
        const hasLogoSvg = data.includes('samir-full-logo.svg');
        console.log(`Contains samir-full-logo.svg reference: ${hasLogoSvg}`);
        
        // Look for style elements that would affect the navbar
        const navbarStyles = data.match(/<nav[^>]*>[\s\S]*?<\/nav>/);
        if (navbarStyles) {
          console.log('Found navbar markup:');
          console.log(navbarStyles[0].substring(0, 500) + '...');
        } else {
          console.log('No navbar markup found in the HTML');
        }
        
        // Check for client rendering issues
        const hasHydrationCode = data.includes('useHydration') || data.includes('__NEXT_DATA__');
        console.log(`Contains hydration code: ${hasHydrationCode}`);
        
        // Save the HTML for analysis
        require('fs').writeFileSync('page.html', data);
        console.log('Full page HTML saved to page.html');
      });
    });
    
    request.on('error', (err) => {
      console.error('Error during HTTP request:', err);
    });
    
    request.end();
  } catch (error) {
    console.error('Error during capture process:', error);
  }
}

captureScreenshot();