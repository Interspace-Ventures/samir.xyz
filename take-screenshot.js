const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  try {
    console.log('Creating new page...');
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1200, height: 800 });
    
    console.log('Navigating to portfolio page...');
    await page.goto('http://localhost:5000/portfolio/', { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Wait a bit for any animations or delayed loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Taking screenshot...');
    const screenshotPath = path.join(process.cwd(), 'portfolio-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    console.log();
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshot();
