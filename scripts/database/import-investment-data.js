/**
 * Investment Data Import Script
 * 
 * This script reads investment data from a CSV file and updates
 * the corresponding portfolio items in the database.
 * 
 * IMPORTANT: The xlsx library was removed due to critical CVEs.
 * Please convert your Excel file to CSV format before running this script.
 * You can do this in Excel/Google Sheets: File -> Save As -> CSV
 * 
 * Run with: `node import-investment-data.js`
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim());
  const rows = [];
  
  for (const line of lines) {
    const row = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    rows.push(row);
  }
  
  return rows;
}

async function main() {
  console.log('Importing investment data from CSV...');

  try {
    const csvFilePath = path.join(__dirname, 'attached_assets', 'investment-data.csv');
    
    if (!fs.existsSync(csvFilePath)) {
      console.error(`CSV file not found: ${csvFilePath}`);
      console.log('\nTo use this script:');
      console.log('1. Open your Excel file in Excel or Google Sheets');
      console.log('2. Save/Export as CSV format');
      console.log('3. Place the CSV file at: scripts/database/attached_assets/investment-data.csv');
      console.log('4. Run this script again');
      return;
    }
    
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = parseCSV(csvContent);
    
    console.log(`Found ${rows.length} rows of data`);
    
    if (rows.length < 2) {
      console.log('Not enough data rows found');
      return;
    }
    
    const headers = rows[0];
    console.log('Headers:', headers);
    
    const companyIdx = headers.findIndex(h => 
      h.toLowerCase().includes('company') || h.toLowerCase().includes('name')
    );
    const investmentDateIdx = headers.findIndex(h => 
      h.toLowerCase().includes('date') && h.toLowerCase().includes('invest')
    );
    const initialInvestmentIdx = headers.findIndex(h => 
      h.toLowerCase().includes('initial') || h.toLowerCase().includes('investment')
    );
    const currentValuationIdx = headers.findIndex(h => 
      h.toLowerCase().includes('current') || h.toLowerCase().includes('valuation')
    );
    const returnMultipleIdx = headers.findIndex(h => 
      h.toLowerCase().includes('return') || h.toLowerCase().includes('multiple')
    );
    
    console.log('Column indices:', {
      company: companyIdx,
      investmentDate: investmentDateIdx,
      initialInvestment: initialInvestmentIdx,
      currentValuation: currentValuationIdx,
      returnMultiple: returnMultipleIdx
    });
    
    const dataRows = rows.slice(1);
    
    for (const row of dataRows) {
      const companyName = companyIdx >= 0 ? row[companyIdx] : null;
      
      if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
        continue;
      }
      
      console.log(`Processing data for: "${companyName}"`);
      
      const portfolioItem = await prisma.portfolio.findFirst({
        where: {
          name: {
            contains: companyName,
            mode: 'insensitive'
          }
        }
      });
      
      if (!portfolioItem) {
        console.log(`No matching portfolio item found for: "${companyName}"`);
        continue;
      }
      
      const returnMultiple = returnMultipleIdx >= 0 ? getNumberValue(row[returnMultipleIdx]) : null;
      
      let status = 'Active';
      if (returnMultiple !== null && returnMultiple <= 0.01) {
        status = 'Written Off';
      } else if (returnMultiple !== null && returnMultiple > 1) {
        status = 'Exited Profitably';
      } else if (returnMultiple !== null && returnMultiple < 1 && returnMultiple > 0) {
        status = 'Exited With Loss';
      }
      
      const investDate = investmentDateIdx >= 0 ? getDateValue(row[investmentDateIdx]) : null;
      let annualizedReturn = null;
      if (returnMultiple && returnMultiple > 0 && investDate) {
        const now = new Date();
        const yearsDiff = (now - investDate) / (1000 * 60 * 60 * 24 * 365);
        if (yearsDiff > 0) {
          annualizedReturn = Math.pow(returnMultiple, 1/yearsDiff) - 1;
        }
      }
      
      const initialInvestment = initialInvestmentIdx >= 0 ? getNumberValue(row[initialInvestmentIdx]) : null;
      
      const investmentData = {
        investment_date: investDate,
        initial_investment: initialInvestment,
        current_valuation: currentValuationIdx >= 0 ? getNumberValue(row[currentValuationIdx]) : null,
        return_multiple: returnMultiple,
        annualized_return: annualizedReturn,
        exit_date: status.includes('Exited') ? new Date() : null,
        exit_amount: status.includes('Exited') && initialInvestment && returnMultiple 
          ? initialInvestment * returnMultiple : null,
        investment_status: status
      };
      
      console.log('Updating with data:', investmentData);
      
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

function getDateValue(value) {
  if (!value) return null;
  
  if (value instanceof Date) return value;
  
  if (typeof value === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return new Date(excelEpoch.getTime() + (value * millisecondsPerDay));
  }
  
  try {
    const date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  } catch (e) {
    return null;
  }
}

function getNumberValue(value) {
  if (value === undefined || value === null || value === '') return null;
  
  const cleaned = String(value).replace(/[,$%]/g, '');
  const num = Number(cleaned);
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
