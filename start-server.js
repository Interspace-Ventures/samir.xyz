// This script starts the Next.js server with a forced port
const { execSync } = require('child_process');

// Generate the Prisma client first
console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}

// Start the Next.js server with specific port
const PORT = process.env.PORT || 3000;
console.log(`Starting Next.js development server on port ${PORT}...`);

try {
  execSync(`PORT=${PORT} npx next dev -p ${PORT}`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting Next.js server:', error);
  process.exit(1);
}