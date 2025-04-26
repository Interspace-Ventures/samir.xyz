/**
 * Test Prisma Models Script
 * 
 * This script tests how to access Prisma models correctly
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma models...');
  
  try {
    console.log('PrismaClient keys:', Object.keys(prisma));
    
    // Test _baseDmmf approach
    try {
      console.log('\nModels from _baseDmmf:');
      const modelNames = prisma._baseDmmf?.mappings?.modelOperations?.map(op => op.model);
      console.log(modelNames);
    } catch (e) {
      console.error('Error accessing _baseDmmf:', e);
    }
    
    // Direct access test
    try {
      console.log('\nDirectly testing model access:');
      
      try {
        const ventureTest = await prisma.venture.findFirst();
        console.log('prisma.venture works:', ventureTest ? true : false);
      } catch (e) {
        console.log('prisma.venture failed:', e.message);
      }
      
      try {
        const VentureTest = await prisma.Venture.findFirst();
        console.log('prisma.Venture works:', VentureTest ? true : false);
      } catch (e) {
        console.log('prisma.Venture failed:', e.message);
      }
      
    } catch (e) {
      console.error('Error in direct access test:', e);
    }
    
  } catch (error) {
    console.error('Error in model test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();