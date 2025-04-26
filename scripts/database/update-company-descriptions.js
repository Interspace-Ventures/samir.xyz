/**
 * Update Company Descriptions Script
 * 
 * This script updates descriptions for portfolio companies
 * 
 * Run with: `node scripts/database/update-company-descriptions.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting to update company descriptions...');

  // Company descriptions
  const companyDescriptions = [
    {
      name: 'AON3D',
      description: 'Industrial 3D printing solutions for high-performance thermoplastics.',
    },
    {
      name: 'Margin',
      description: 'Automated portfolio management platform for crypto investing.',
    },
    {
      name: 'Restream',
      description: 'Multi-platform live streaming solutions for content creators.',
    },
    {
      name: 'Soot',
      description: 'Carbon footprint tracking and climate action platform.',
    },
    {
      name: 'Sugar',
      description: 'AI-powered CRM for managing customer relationships.',
    },
    {
      name: 'Waldo',
      description: 'Mobile app testing automation platform for development teams.',
    },
    {
      name: 'Hedgehog',
      description: 'Simplified crypto investment platform for everyday investors.',
    },
    {
      name: 'Techmate',
      description: 'On-demand tech support for homes and small businesses.',
    },
    {
      name: 'Sundae',
      description: 'Marketplace for selling distressed real estate properties.',
    },
    {
      name: 'Sanzo',
      description: 'Asian-inspired sparkling water with real fruit and no added sugar.',
    },
    {
      name: 'Rely',
      description: 'Buy now, pay later solution for Southeast Asian markets.',
    },
    {
      name: 'Playbook',
      description: 'Design asset management and collaboration platform.',
    },
    {
      name: 'Moku',
      description: 'Plant-based alternative meat company with sustainable practices.',
    },
    {
      name: 'Lunar',
      description: 'Digital banking platform for Nordic markets.',
    },
    {
      name: 'Keep',
      description: 'Smart organization system for home storage and inventory.',
    },
    {
      name: 'Kartera',
      description: 'Cryptocurrency portfolio tracking and tax reporting platform.',
    },
    {
      name: 'Juneshine',
      description: 'Hard kombucha brewery with organic, sustainable ingredients.',
    },
    {
      name: 'Harper',
      description: 'Digital health platform for personalized chronic condition management.',
    },
    {
      name: 'GEM',
      description: 'Plant-based daily vitamin bites made from real foods.',
    },
    {
      name: 'Goodmylk',
      description: 'Plant-based dairy alternatives made from clean ingredients.',
    },
    {
      name: 'CaliberX',
      description: 'AI-powered fitness coaching and personalized workout platform.',
    },
    {
      name: 'Backpack',
      description: 'Modern school management system for K-12 institutions.',
    },
    {
      name: 'Aura',
      description: 'All-in-one digital security for individuals and families.',
    },
    {
      name: 'Afar',
      description: 'Remote team building platform for distributed workforces.',
    },
    {
      name: 'Swansea City AFC',
      description: 'Professional football club based in Swansea, Wales.',
    },
    {
      name: 'Swan',
      description: 'Banking-as-a-Service platform for embedded finance solutions.',
    },
    {
      name: 'Superplastic',
      description: 'Digital character studio creating virtual celebrities and NFTs.',
    },
    {
      name: 'The Coffee',
      description: 'Premium sustainable coffee brand with direct trade practices.',
    }
  ];

  // Update each company with its description
  for (const company of companyDescriptions) {
    try {
      const result = await prisma.portfolio.updateMany({
        where: {
          name: company.name,
        },
        data: {
          description: company.description,
        },
      });

      console.log(`Updated ${result.count} records for ${company.name}`);
    } catch (error) {
      console.error(`Error updating ${company.name}:`, error);
    }
  }

  console.log('Company descriptions update completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });