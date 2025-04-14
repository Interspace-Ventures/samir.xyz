/**
 * Quick script to check portfolio styles on the page
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function checkPortfolioStyles() {
  console.log('Checking portfolio page styles...');
  
  try {
    const response = await fetch('http://0.0.0.0:5000/portfolio/');
    const html = await response.text();
    
    // Load HTML into cheerio
    const $ = cheerio.load(html);
    
    // Check for white background container
    const whiteContainer = $('div.bg-white.p-6.rounded-xl');
    console.log(`White background container found: ${whiteContainer.length > 0 ? 'YES' : 'NO'}`);
    
    if (whiteContainer.length > 0) {
      console.log('White container classes:', whiteContainer.attr('class'));
      
      // Check portfolio grid inside white container
      const portfolioGrid = whiteContainer.find('div.grid');
      console.log(`Portfolio grid inside white container: ${portfolioGrid.length > 0 ? 'YES' : 'NO'}`);
      
      if (portfolioGrid.length > 0) {
        console.log('Grid classes:', portfolioGrid.attr('class'));
        
        // Count portfolio cards
        const portfolioCards = portfolioGrid.find('div[class*="transition-opacity"]');
        console.log(`Number of portfolio cards: ${portfolioCards.length}`);
        
        // Check card component
        const firstCard = portfolioCards.first().find('div[class*="h-[150px]"]');
        if (firstCard.length > 0) {
          console.log('First card classes:', firstCard.attr('class'));
        }
      }
    }
    
    console.log('Style check completed!');
  } catch (error) {
    console.error('Error checking portfolio styles:', error);
  }
}

checkPortfolioStyles();