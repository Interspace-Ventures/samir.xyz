/**
 * Setup Ventures Script
 * 
 * This script:
 * 1. Copies the venture logo files from attached_assets to public/ventures
 * 2. Generates a seed script for the Venture model in the database
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define the venture data
const ventures = [
  {
    name: '2 Days Early',
    description: 'Current and former Chime operator community built by operators for operators',
    logoUrl: '/ventures/2de.png',
    website: 'https://2daysearly.com',
    industry: 'Community',
    founded: 2023,
    featured: true,
  },
  {
    name: 'interspace',
    description: 'Over-engineered takes on fintech, stratfin, tech, AI and politics',
    logoUrl: '/ventures/interspace.png',
    website: 'https://posts.interspace.ventures',
    industry: 'Media',
    founded: 2023,
    featured: true,
  },
  {
    name: 'tbh',
    description: 'the best vibes of Boerum Hill',
    logoUrl: '/ventures/tbh.png',
    website: 'https://tbh.living',
    industry: 'Lifestyle',
    founded: 2024,
    featured: true,
  },
  {
    name: 'solo',
    description: 'the first beautifully functional climbing app',
    logoUrl: '/ventures/solo.png',
    website: 'https://solo.iv.xyz',
    industry: 'Fitness',
    founded: 2022,
    featured: true,
  },
  {
    name: 'samir.xyz',
    description: 'Hey I\'m Samir and I drive business impact',
    logoUrl: '/ventures/samir.png',
    website: 'https://samir.xyz',
    industry: 'Personal',
    founded: 2022,
    featured: true,
  },
  {
    name: 'predictive',
    description: 'AI-powered film predictions',
    logoUrl: '/ventures/predictive.png',
    website: 'https://predictive.iv.xyz',
    industry: 'Entertainment',
    founded: 2023,
    featured: true,
  },
  {
    name: 'moonshot',
    description: 'launch your next big idea',
    logoUrl: '/ventures/moonshot.png',
    website: 'https://moonshot.iv.xyz',
    industry: 'Innovation',
    founded: 2024,
    featured: true,
  },
  {
    name: 'omni',
    description: 'read anything, anywhere, all offline',
    logoUrl: '/ventures/omni.png',
    website: 'https://omni.iv.xyz',
    industry: 'Reading',
    founded: 2023,
    featured: true,
  }
];

// Copy images from attached_assets to public/ventures
function copyImages() {
  const sourceFiles = {
    '2de.png': 'attached_assets/2DE Interspace.png',
    'interspace.png': 'attached_assets/Interspace Square - 2025.png',
    'tbh.png': 'attached_assets/tbh purple.png',
    'solo.png': 'attached_assets/Solo Wordmark - Gradient 2025.png',
    'samir.png': 'attached_assets/Perspectives Favicon.png',
    'predictive.png': 'attached_assets/Predictive.film icon 2025.png',
    'moonshot.png': 'attached_assets/moonshot.png',
    'omni.png': 'attached_assets/omni wordmark 2025.png'
  };

  for (const [destName, sourcePath] of Object.entries(sourceFiles)) {
    try {
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(
          sourcePath,
          path.join('public/ventures', destName)
        );
        console.log(`Copied ${sourcePath} to public/ventures/${destName}`);
      } else {
        console.log(`Source file ${sourcePath} not found`);
      }
    } catch (error) {
      console.error(`Error copying ${sourcePath}:`, error);
    }
  }
}

// Insert ventures into the database
async function seedVentures() {
  try {
    console.log('Clearing existing ventures...');
    await prisma.venture.deleteMany({});
    
    console.log('Adding ventures to the database...');
    for (const venture of ventures) {
      await prisma.venture.create({
        data: venture
      });
      console.log(`Added venture: ${venture.name}`);
    }
    
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Error seeding ventures:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('Setting up ventures...');
  copyImages();
  await seedVentures();
  console.log('Setup completed!');
}

main().catch(error => {
  console.error('Error running setup:', error);
});