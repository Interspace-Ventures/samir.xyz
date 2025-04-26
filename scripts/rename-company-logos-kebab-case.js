/**
 * Rename Company Logos to Kebab Case Script
 * 
 * This script renames all files in the /public/companies directory to use kebab-case naming.
 */

const fs = require('fs');
const path = require('path');

// Function to convert a filename to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase(); // Convert to lowercase
}

async function main() {
  try {
    console.log('Starting company logo renaming process...');
    
    // Define the path to the public/companies directory
    const companiesDir = path.join(process.cwd(), 'public', 'companies');
    
    // Check if the directory exists
    if (!fs.existsSync(companiesDir)) {
      console.error('Error: /public/companies directory does not exist');
      return;
    }
    
    // Get all files in the directory
    const files = fs.readdirSync(companiesDir);
    console.log(`Found ${files.length} files in /public/companies`);
    
    // Process each file
    for (const file of files) {
      // Skip directories
      const filePath = path.join(companiesDir, file);
      if (fs.statSync(filePath).isDirectory()) {
        console.log(`Skipping directory: ${file}`);
        continue;
      }
      
      // Get file extension and name
      const fileExtension = path.extname(file);
      const fileNameWithoutExt = path.basename(file, fileExtension);
      
      // Convert to kebab-case
      const kebabCaseName = toKebabCase(fileNameWithoutExt);
      const newFileName = `${kebabCaseName}${fileExtension}`;
      const newFilePath = path.join(companiesDir, newFileName);
      
      // Rename the file
      if (file !== newFileName) {
        console.log(`Renaming ${file} to ${newFileName}`);
        fs.renameSync(filePath, newFilePath);
      } else {
        console.log(`File already uses kebab-case: ${file}`);
      }
    }
    
    console.log('Company logo renaming process complete!');
  } catch (error) {
    console.error('Error in company logo renaming process:', error);
  }
}

main();