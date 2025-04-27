import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.portfolio.deleteMany({});

  // Create portfolio items
  const portfolioItems = await prisma.portfolio.createMany({
    data: [
      {
        name: 'Superplastic',
        category: 'Tech',
        description: 'Digital collectibles and virtual characters',
        logoUrl: '/logos/superplastic.png',
        website: 'https://superplastic.co',
        investment_status: 'Markup'
      },
      {
        name: 'Juneshine',
        category: 'Retail',
        description: 'Hard kombucha and canned cocktails',
        logoUrl: '/logos/juneshine.png',
        website: 'https://juneshine.com',
        investment_status: 'Markup'
      },
      {
        name: 'Harper',
        category: 'Health',
        description: 'Personalized wellness supplements',
        logoUrl: '/logos/harper.png',
        website: 'https://harperhealth.io',
        investment_status: null
      },
      {
        name: 'Kartera',
        category: 'Finance',
        description: 'Smart crypto wallet and portfolio management',
        logoUrl: '/logos/kartera.png',
        website: 'https://kartera.io',
        investment_status: 'Acquired'
      },
      {
        name: 'Moku',
        category: 'Tech',
        description: 'Cloud infrastructure for Web3 applications',
        logoUrl: '/logos/moku.png',
        website: 'https://moku.dev',
        investment_status: null
      }
    ]
  });

  console.log(`Created ${portfolioItems.count} portfolio items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });