const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  try {
    console.log('Creating new page...');
    const page = await browser.newPage();
    
    console.log('Setting viewport...');
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to website...');
    await page.goto('http://localhost:5000/profile/', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('Page loaded, waiting for content to render...');
    await page.waitForSelector('nav', { timeout: 5000 });
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: './screenshots/website-screenshot.png', fullPage: true });
    
    console.log('Screenshot saved successfully!');
  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    await browser.close();
    console.log('Browser closed');
  }
})();