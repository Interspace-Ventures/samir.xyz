/**
 * Investment Data Import Script
 * 
 * This script reads investment data from an Excel file and updates
 * the corresponding portfolio items in the database.
 * 
 * Run with: `node import-investment-data.js`
 */

const { PrismaClient } = require('@prisma/client');
const XLSX = require('xlsx');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Importing investment data from Excel...');

  try {
    // Path to the Excel file
    const excelFilePath = path.join(__dirname, 'attached_assets', 'Interspace Cash Flow Analysis - Angel Investments.xlsx');
    
    // Read the Excel file with raw data to inspect its structure
    const workbook = XLSX.readFile(excelFilePath);
    
    // Check all sheets in the workbook
    console.log('Available sheets:', workbook.SheetNames);
    
    // Try to find a sheet with company investment data
    let sheetName = workbook.SheetNames[0]; // Default to first sheet
    
    // Look for sheets that might contain company data
    for (const name of workbook.SheetNames) {
      if (name.toLowerCase().includes('company') || 
          name.toLowerCase().includes('investment') || 
          name.toLowerCase().includes('portfolio')) {
        sheetName = name;
        break;
      }
    }
    
    console.log(`Using sheet: ${sheetName}`);
    const worksheet = workbook.Sheets[sheetName];
    
    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    console.log('Worksheet range:', worksheet['!ref']);
    
    // Log some cells to understand the structure
    for (let R = range.s.r; R <= Math.min(range.e.r, 10); ++R) {
      let row = [];
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({r: R, c: C});
        const cell = worksheet[cellAddress];
        row.push(cell ? cell.v : undefined);
      }
      console.log(`Row ${R}:`, row);
    }
    
    // Convert the sheet to JSON with headers option to better handle unnamed columns
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
    
    console.log(`Found ${data.length} rows of data`);
    
    // Define the column mapping based on inspection of the first rows
    const columnMapping = {
      // Based on the observed data from Angel Investments sheet (row 1 contains headers)
      B: "company",
      C: "investment_date",
      E: "initial_investment",
      M: "current_valuation",
      K: "return_multiple",
      // We don't have exit_date directly, will need to calculate or determine based on other data
      // We don't have exit_amount directly, will need to calculate or determine based on other data
      // I: "net_multiple" - Not directly used, but can help determine status
    };
    
    // Skip header rows - row 2 is the first data row (Excel rows start at 1, but array index starts at 0)
    const dataRows = data.slice(2);
    
    // Process each row
    for (const row of dataRows) {
      // Extract company name
      const companyName = row.B;
      
      if (!companyName || typeof companyName !== 'string') {
        continue; // Skip rows without a valid company name
      }
      
      console.log(`Processing data for: "${companyName}"`);
      
      // Find the corresponding portfolio item
      const portfolioItem = await prisma.portfolio.findFirst({
        where: {
          name: {
            contains: companyName,
            mode: 'insensitive' // Case-insensitive search
          }
        }
      });
      
      if (!portfolioItem) {
        console.log(`No matching portfolio item found for: "${companyName}"`);
        continue;
      }
      
      // Log the full row data for debugging
      console.log('Row data keys:', Object.keys(row).join(', '));
      
      // Determine investment status based on various metrics
      let status = 'Active';
      
      // If return multiple is 0 or very close to 0, it's likely written off
      if (row.K !== undefined && row.K <= 0.01) {
        status = 'Written Off';
      }
      
      // If net multiple > 1, it's likely exited profitably
      if (row.J !== undefined && row.J > 1) {
        status = 'Exited Profitably';
      } else if (row.J !== undefined && row.J < 1 && row.J > 0) {
        status = 'Exited With Loss';
      }
      
      // Calculate annualized return if available
      // Using the simplified formula: (Current Value / Initial Investment)^(1/years) - 1
      let annualizedReturn = null;
      const investDate = getDateValue(row.C);
      if (row.K > 0 && investDate) {
        const now = new Date();
        const yearsDiff = (now - investDate) / (1000 * 60 * 60 * 24 * 365);
        if (yearsDiff > 0) {
          annualizedReturn = Math.pow(row.K, 1/yearsDiff) - 1;
        }
      }
      
      // Format dates properly for database
      const formattedInvestmentDate = investDate;
      const formattedExitDate = status.includes('Exited') ? new Date() : null;
      
      // Extract financial data from appropriate columns
      const investmentData = {
        investment_date: formattedInvestmentDate,
        initial_investment: getNumberValue(row.E),
        current_valuation: getNumberValue(row.M),
        return_multiple: getNumberValue(row.K),
        annualized_return: annualizedReturn,
        exit_date: formattedExitDate,
        exit_amount: status.includes('Exited') && row.E ? getNumberValue(row.E) * getNumberValue(row.K) : null,
        investment_status: status
      };
      
      // Log the data being updated
      console.log('Updating with data:', investmentData);
      
      // Update the portfolio item with investment data
      await prisma.portfolio.update({
        where: { id: portfolioItem.id },
        data: investmentData
      });
      
      console.log(`Updated portfolio item: "${companyName}"`);
    }
    
    console.log('Investment data import completed successfully!');
    
  } catch (error) {
    console.error('Error importing investment data:', error);
  }
}

// Helper function to convert Excel date values to JavaScript Date objects
function getDateValue(value) {
  if (!value) return null;
  
  // If already a Date object
  if (value instanceof Date) return value;
  
  // If it's a number (Excel date serial number)
  if (typeof value === 'number') {
    // Excel dates are stored as days since 1900-01-01
    // To convert to JavaScript date, we need to adjust for the date system difference
    const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return new Date(excelEpoch.getTime() + (value * millisecondsPerDay));
  }
  
  // If it's a string, try to parse it
  try {
    return new Date(value);
  } catch (e) {
    return null;
  }
}

// Helper function to convert values to numbers
function getNumberValue(value) {
  if (value === undefined || value === null || value === '') return null;
  
  const num = Number(value);
  return isNaN(num) ? null : num;
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });