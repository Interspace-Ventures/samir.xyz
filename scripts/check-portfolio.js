/**
 * Check Portfolio Script
 * 
 * This script lists all companies in the portfolio table
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Find all portfolio companies
    const portfolio = await prisma.portfolio.findMany();

    console.log('Portfolio companies in database:');
    portfolio.forEach(company => {
      console.log(`- ${company.name} (${company.description || 'No description'})`);
    });
    
    console.log(`\nTotal: ${portfolio.length} companies`);
    
    // Specifically look for "Metadata"
    const metadata = await prisma.portfolio.findFirst({
      where: {
        name: 'Metadata'
      }
    });
    
    if (metadata) {
      console.log('\nFound Metadata in portfolio table:');
      console.log(metadata);
    } else {
      console.log('\nMetadata not found in portfolio table');
    }
    
  } catch (error) {
    console.error('Error listing portfolio:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();