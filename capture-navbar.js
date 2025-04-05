const puppeteer = require('puppeteer');
const fs = require('fs');

async function captureNavbar() {
  // Launch puppeteer with appropriate flags for Replit environment
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();

    // Custom logging
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

    // Set viewport
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the page and wait for content to load
    console.log('Navigating to http://localhost:5000/profile/');
    
    // Navigate with retry logic
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;
    
    while (!success && attempts < maxAttempts) {
      try {
        attempts++;
        await page.goto('http://localhost:5000/profile/', {
          waitUntil: 'networkidle0',
          timeout: 30000
        });
        success = true;
      } catch (err) {
        console.log(`Navigation attempt ${attempts} failed: ${err.message}`);
        if (attempts >= maxAttempts) throw err;
        await new Promise(r => setTimeout(r, 2000)); // Wait before retrying
      }
    }

    // Wait for the navbar to be rendered
    await page.waitForSelector('nav', { timeout: 10000 });
    console.log('Found navbar element');

    // Extract the navbar HTML
    const navbarHTML = await page.evaluate(() => {
      const navbar = document.querySelector('nav');
      return navbar ? navbar.outerHTML : null;
    });

    if (navbarHTML) {
      console.log('Navbar HTML captured:');
      console.log(navbarHTML.substring(0, 300) + '...');
      fs.writeFileSync('navbar.html', navbarHTML);
      console.log('Navbar HTML saved to navbar.html');
    } else {
      console.log('Failed to capture navbar HTML');
    }

    // Check for logo
    const logoExists = await page.evaluate(() => {
      return !!document.querySelector('img[src="/assets/images/samir-full-logo.svg"]');
    });
    
    console.log(`Logo image element exists: ${logoExists}`);

    // Capture screenshot of navbar
    const navbarElement = await page.$('nav');
    if (navbarElement) {
      await navbarElement.screenshot({ path: 'navbar.png' });
      console.log('Navbar screenshot saved to navbar.png');
    }

    // Capture full page screenshot for reference
    await page.screenshot({ path: 'full-page.png' });
    console.log('Full page screenshot saved to full-page.png');

  } catch (error) {
    console.error('Error during navbar capture:', error);
  } finally {
    await browser.close();
  }
}

captureNavbar();