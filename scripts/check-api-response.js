/**
 * Check API Response Script
 * 
 * This script fetches the portfolio API endpoint and examines the structure
 * of the first few items to confirm the field names.
 */

async function main() {
  try {
    // Fetch the portfolio data
    console.log('Fetching portfolio data from API...');
    const response = await fetch('http://localhost:8080/api/portfolio');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check the first 3 items
    const sampleItems = data.slice(0, 3);
    
    console.log(`Sample of ${sampleItems.length} portfolio items:`);
    sampleItems.forEach(item => {
      console.log(`- ${item.name} (${item.category})`);
      // Check which property has the logo URL
      console.log(`  Logo property: ${item.logoUrl ? 'logoUrl exists' : 'logoUrl missing'}`);
      console.log(`  logoUrl value: ${item.logoUrl}`);
      console.log(`  Has 'logo-url' property: ${item['logo-url'] !== undefined}`);
      if (item['logo-url']) {
        console.log(`  'logo-url' value: ${item['logo-url']}`);
      }
    });
    
    // Log all available keys in the first item
    if (data.length > 0) {
      console.log('\nAll properties of the first item:');
      Object.keys(data[0]).forEach(key => {
        console.log(`- ${key}: ${data[0][key]}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();