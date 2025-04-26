/**
 * Remove Duplicates Script
 * 
 * This script removes duplicate entries for Juneshine and Superplastic from the database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking for duplicate companies...');
  
  // Find all records for Juneshine
  const juneshineRecords = await prisma.portfolio.findMany({
    where: {
      name: 'Juneshine'
    },
    orderBy: {
      id: 'asc' // Keep the oldest record (lowest ID)
    }
  });
  
  // Find all records for Superplastic
  const superplasticRecords = await prisma.portfolio.findMany({
    where: {
      name: 'Superplastic'
    },
    orderBy: {
      id: 'asc' // Keep the oldest record (lowest ID)
    }
  });
  
  console.log(`Found ${juneshineRecords.length} Juneshine records`);
  console.log(`Found ${superplasticRecords.length} Superplastic records`);
  
  // If we have duplicates, remove the extras (keep the first one)
  if (juneshineRecords.length > 1) {
    // Keep the first record, delete the rest
    for (let i = 1; i < juneshineRecords.length; i++) {
      console.log(`Deleting duplicate Juneshine record with ID: ${juneshineRecords[i].id}`);
      await prisma.portfolio.delete({
        where: {
          id: juneshineRecords[i].id
        }
      });
    }
  }
  
  if (superplasticRecords.length > 1) {
    // Keep the first record, delete the rest
    for (let i = 1; i < superplasticRecords.length; i++) {
      console.log(`Deleting duplicate Superplastic record with ID: ${superplasticRecords[i].id}`);
      await prisma.portfolio.delete({
        where: {
          id: superplasticRecords[i].id
        }
      });
    }
  }
  
  console.log('Checking if duplicates were successfully removed...');
  
  // Verify duplicates are gone
  const remainingJuneshine = await prisma.portfolio.findMany({
    where: {
      name: 'Juneshine'
    }
  });
  
  const remainingSuperplastic = await prisma.portfolio.findMany({
    where: {
      name: 'Superplastic'
    }
  });
  
  console.log(`Remaining Juneshine records: ${remainingJuneshine.length}`);
  console.log(`Remaining Superplastic records: ${remainingSuperplastic.length}`);
  
  console.log('Done!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });