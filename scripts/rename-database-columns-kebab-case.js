/**
 * Rename Database Columns to Kebab Case Script
 * 
 * This script:
 * 1. Creates a new column with kebab-case naming
 * 2. Copies data from the old column to the new one
 * 3. Drops the old column
 * 4. Renames the new column to the original name with kebab-case
 */

const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database column renaming process...');
    
    // Note: Prisma doesn't support direct column renaming, so we need to use raw SQL
    // We'll use the prisma.$executeRaw function for this
    
    // Step 1: Make sure we have the latest schema
    console.log('Regenerating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Step 2: Create a new 'logo-url' column
    console.log('Adding new kebab-case column...');
    await prisma.$executeRaw`ALTER TABLE "Portfolio" ADD COLUMN "logo-url" TEXT`;
    
    // Step 3: Copy data from 'logoUrl' to 'logo-url'
    console.log('Copying data to new column...');
    await prisma.$executeRaw`UPDATE "Portfolio" SET "logo-url" = "logoUrl"`;
    
    // Step 4: Make the new column non-null to match the original constraint
    console.log('Setting NOT NULL constraint...');
    await prisma.$executeRaw`ALTER TABLE "Portfolio" ALTER COLUMN "logo-url" SET NOT NULL`;
    
    // Step 5: Drop the old column
    console.log('Dropping old camelCase column...');
    await prisma.$executeRaw`ALTER TABLE "Portfolio" DROP COLUMN "logoUrl"`;
    
    // Step 6: Regenerate the Prisma client to reflect schema changes
    console.log('Regenerating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('Database column renaming process complete!');
    
    // Update the schema.prisma file
    console.log('Note: You will need to manually update the schema.prisma file to reflect these changes.');
    console.log('Replace:');
    console.log('  logoUrl            String');
    console.log('With:');
    console.log('  "logo-url"         String  @map("logo-url")');
    
  } catch (error) {
    console.error('Error in database column renaming process:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });