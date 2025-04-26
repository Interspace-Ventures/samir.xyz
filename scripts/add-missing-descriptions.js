/**
 * Add Missing Descriptions Script
 * 
 * This script adds descriptions for the 3 remaining companies without them
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Adding missing company descriptions...');
    
    // Descriptions for companies
    const descriptions = {
      'CaliberX': 'A fintech platform providing customized financial services and investment solutions that empower users to achieve their financial goals through personalized strategies.',
      'Harper': 'An innovative health tech company delivering holistic wellness solutions through a combination of telehealth services and personalized health tracking tools.',
      'Moku': 'A SaaS platform for digital content creators that streamlines the workflow from ideation to publication through AI-powered editing and analytics tools.'
    };
    
    // Update each company
    for (const [name, description] of Object.entries(descriptions)) {
      const result = await prisma.portfolio.updateMany({
        where: {
          name: name
        },
        data: {
          description: description
        }
      });
      
      console.log(`Updated ${name} with description: ${result.count} rows affected`);
    }
    
    console.log('\nAll missing descriptions added!');
    
  } catch (error) {
    console.error('Error adding descriptions:', error);
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