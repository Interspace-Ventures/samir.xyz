//! Test script to verify grid layout rendering directly

// Import required modules
const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
        return;
      }
      
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

async function testGridLayout() {
  try {
    // Test local server
    console.log('Testing local server...');
    const localHtml = await fetchHtml('http://localhost:5000/ventures/');
    
    const $ = cheerio.load(localHtml);
    
    // Look for grid class 
    const gridContainer = $('.grid');
    
    console.log('Grid container found:', gridContainer.length > 0);
    
    if (gridContainer.length > 0) {
      console.log('Grid classes:', gridContainer.attr('class'));
      
      // Check if responsive classes are present
      const hasResponsiveClasses = 
        gridContainer.attr('class').includes('grid-cols-1') && 
        gridContainer.attr('class').includes('sm:grid-cols-2') && 
        gridContainer.attr('class').includes('lg:grid-cols-3');
      
      console.log('Has responsive grid classes:', hasResponsiveClasses);
      
      // Count direct children
      const directChildren = gridContainer.children().length;
      console.log('Number of direct grid children:', directChildren);
      
      // Check for VenturesCard components
      const venturesCardElements = $('[class*="bg-gray-800"]').length;
      console.log('Potential VenturesCard elements found:', venturesCardElements);
      
      // Check for images
      const images = $('img').length;
      console.log('Number of images found:', images);
    }
    
    console.log('\nTest completed!');
    
  } catch (error) {
    console.error('Error during testing:', error.message);
  }
}

// Run the test
testGridLayout();