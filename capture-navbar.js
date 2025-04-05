// Simple script to capture the navbar with Puppeteer
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureNavbar() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    console.log('Creating page...');
    const page = await browser.newPage();
    
    // Set viewport to a reasonable size
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating to website...');
    await page.goto('http://localhost:5000/profile/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for navbar to be visible
    console.log('Waiting for navbar to load...');
    await page.waitForSelector('nav', { timeout: 5000 });
    
    // Extract the navbar element
    const navbar = await page.$('nav');
    if (!navbar) {
      throw new Error('Navbar element not found');
    }
    
    // Capture screenshot of the navbar
    console.log('Capturing screenshot...');
    const screenshot = await navbar.screenshot();
    
    // Save the screenshot
    const screenshotPath = path.join(__dirname, 'navbar-screenshot.png');
    fs.writeFileSync(screenshotPath, screenshot);
    
    console.log(`Screenshot saved to ${screenshotPath}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

captureNavbar();