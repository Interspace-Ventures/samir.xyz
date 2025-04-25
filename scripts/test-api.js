/**
 * Test API Routes
 * 
 * This script tests the API routes by making fetch requests
 * to test if they're working properly.
 */

async function testAPI() {
  try {
    console.log('Testing API routes...');
    
    // Test portfolio API
    console.log('\nTesting /api/portfolio...');
    try {
      const portfolioResponse = await fetch('http://localhost:8080/api/portfolio');
      if (portfolioResponse.ok) {
        const data = await portfolioResponse.json();
        console.log(`Success! Received ${data.length} portfolio items.`);
      } else {
        console.error(`Error: ${portfolioResponse.status} ${portfolioResponse.statusText}`);
        const text = await portfolioResponse.text();
        console.error(`Response body: ${text}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
    
    // Test categories API
    console.log('\nTesting /api/categories...');
    try {
      const categoriesResponse = await fetch('http://localhost:8080/api/categories');
      if (categoriesResponse.ok) {
        const data = await categoriesResponse.json();
        console.log(`Success! Received ${data.length} categories.`);
      } else {
        console.error(`Error: ${categoriesResponse.status} ${categoriesResponse.statusText}`);
        const text = await categoriesResponse.text();
        console.error(`Response body: ${text}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
    
    console.log('\nAPI tests completed.');
  } catch (error) {
    console.error('Error in test script:', error);
  }
}

testAPI();