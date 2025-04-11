// Script to check if CSS classes are being applied in the rendered HTML

const https = require('https');
const http = require('http');

// Function to make HTTP requests
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (resp) => {
      let data = '';
      
      resp.on('data', (chunk) => {
        data += chunk;
      });
      
      resp.on('end', () => {
        resolve({
          statusCode: resp.statusCode,
          data
        });
      });
      
    }).on("error", (err) => {
      reject(err);
    });
  });
}

// Check portfolio page
async function checkPortfolioPage() {
  try {
    console.log('Checking portfolio page...');
    const response = await fetchUrl('http://localhost:5000/portfolio/');
    
    if (response.statusCode !== 200) {
      console.error(`Failed to fetch portfolio page: ${response.statusCode}`);
      return;
    }
    
    console.log('Portfolio page loaded successfully');
    
    // Check for our CSS classes
    const filterCategoryButtonCount = (response.data.match(/filter-category-button/g) || []).length;
    console.log(`- filter-category-button occurrences: ${filterCategoryButtonCount}`);
    
    const filterCategoriesContainerCount = (response.data.match(/filter-categories-container/g) || []).length;
    console.log(`- filter-categories-container occurrences: ${filterCategoriesContainerCount}`);
    
    const statsTableCount = (response.data.match(/statsTable/g) || []).length;
    console.log(`- statsTable occurrences: ${statsTableCount}`);
    
    console.log('\nPage HTML sample:');
    // Get a snippet with filter categories
    const filterCategorySnippet = response.data.match(/<div class="filter-categories-container">([\s\S]*?)<\/div>/);
    if (filterCategorySnippet) {
      console.log(filterCategorySnippet[0].substring(0, 500) + '...');
    } else {
      console.log('No filter categories container found');
    }
    
  } catch (error) {
    console.error('Error checking portfolio page:', error);
  }
}

// Run the check
checkPortfolioPage();