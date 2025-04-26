/**
 * Fix Superplastic Category Script
 * 
 * This script checks and updates the category for Superplastic to "Retail" 
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Check current category
    const company = await prisma.portfolio.findFirst({
      where: {
        name: 'Superplastic'
      }
    });
    
    console.log('Current Superplastic data:', company);
    
    if (company) {
      // Update to "Retail" category
      const updated = await prisma.portfolio.update({
        where: {
          id: company.id
        },
        data: {
          category: 'Retail'
        }
      });
      
      console.log('Updated Superplastic to Retail category:', updated);
    } else {
      console.log('Superplastic not found in database');
    }
    
  } catch (error) {
    console.error('Error fixing Superplastic category:', error);
  }
}

main()
  .catch(e => {
    console.error('Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });