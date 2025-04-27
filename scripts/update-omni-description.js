/**
 * Update Omni Description Script
 * 
 * This script updates the description for the Omni venture
 */

const fs = require('fs');
const path = require('path');

// Path to ventures response JSON file
const VENTURES_FILE = path.join(process.cwd(), 'scripts', 'ventures-response.json');

async function main() {
  try {
    // Read the current ventures data
    const venturesData = fs.readFileSync(VENTURES_FILE, 'utf8');
    const ventures = JSON.parse(venturesData);
    
    // Find the Omni venture
    const omniIndex = ventures.findIndex(v => v.name === 'omni');
    
    if (omniIndex === -1) {
      console.error('Omni venture not found');
      return;
    }
    
    // Update the description
    const oldDescription = ventures[omniIndex].description;
    ventures[omniIndex].description = 'read anything, anywhere, all at once';
    
    // Write the updated data back to the file
    fs.writeFileSync(VENTURES_FILE, JSON.stringify(ventures, null, 2), 'utf8');
    
    console.log('✅ Updated Omni description');
    console.log(`  From: "${oldDescription}"`);
    console.log(`  To:   "${ventures[omniIndex].description}"`);
  } catch (error) {
    console.error('Error updating Omni description:', error);
  }
}

main();