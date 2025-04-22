/**
 * Update Company Information Script
 * 
 * This script updates portfolio items with website URLs and descriptions
 * from research on the companies.
 * 
 * Run with: `node update-company-info.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company information...');

  // Company information with website URLs and descriptions
  const companyInfo = [
    {
      name: 'AON3D',
      website: 'https://www.aon3d.com',
      description: 'AON3D is an industrial 3D printing technology company that enables manufacturers to produce end-use parts with high-performance thermoplastics, helping reduce costs, accelerate development, and solve supply chain challenges.'
    },
    {
      name: 'Margin',
      website: 'https://margin.io',
      description: 'Margin is a collaborative financial workspace that enables finance teams to automate data collection, centralize team knowledge, build better models with version control, and manage streamlined planning processes.'
    },
    {
      name: 'Restream',
      website: 'https://restream.io',
      description: 'Restream is a multistreaming platform that allows content creators to broadcast live video simultaneously to multiple social platforms including YouTube, Twitch, Facebook, LinkedIn, and 30+ other services.'
    },
    {
      name: 'Soot',
      website: 'https://www.sootapp.com',
      description: 'Soot provides financial tools for emerging markets that empower individuals and businesses to access, save, and grow their money safely through mobile applications and digital banking solutions.'
    },
    {
      name: 'Sugar',
      website: 'https://www.sugarliving.com',
      description: 'Sugar is a customer experience platform that helps companies create memorable residential experiences, streamlining operations and improving resident satisfaction through modern property management tools.'
    },
    {
      name: 'Techmate',
      website: 'https://techmate.io',
      description: 'Techmate provides technology-enabled services that help businesses and organizations optimize their IT operations, streamline workflows, and improve overall technical efficiency.'
    },
    {
      name: 'June Shine',
      website: 'https://juneshine.com',
      description: 'JuneShine produces hard kombucha made with organic ingredients and real fruit. Their beverages offer a healthier alcohol alternative with probiotics, antioxidants, and vitamins while maintaining sustainable brewing practices.'
    },
    {
      name: 'Sanzo',
      website: 'https://drinksanzo.com',
      description: 'Sanzo creates Asian-inspired sparkling water made with real fruit and no added sugar or artificial flavors. They offer authentic Asian flavors like calamansi, lychee, and yuzu in a refreshing, clean beverage.'
    },
    {
      name: 'Super Plastic',
      website: 'https://superplastic.co',
      description: 'Superplastic creates limited-edition designer toys, apparel, and digital collectibles featuring their signature characters. They blend physical and digital art with collaborations from leading artists and global brands.'
    },
    {
      name: 'Swansea City AFC',
      website: 'https://www.swanseacity.com',
      description: 'Swansea City Association Football Club is a professional football team competing in the English Football League Championship, known for their distinctive playing style and strong community connections in Wales.'
    },
    {
      name: 'The Coffee',
      website: 'https://thecoffee.com',
      description: 'The Coffee delivers premium coffee experiences through carefully sourced beans, innovative brewing methods, and a commitment to sustainability practices throughout their supply chain.'
    },
    {
      name: 'The Food Company',
      website: 'https://thefoodcompany.com',
      description: 'The Food Company creates innovative culinary solutions through their line of sustainable, organic food products designed to meet modern dietary preferences while maintaining exceptional taste and quality.'
    },
    {
      name: 'Afar',
      website: 'https://www.afar.com',
      description: 'AFAR is a multi-platform travel media brand that inspires and guides those who travel the world seeking to connect with its people, experience their cultures, and understand their perspectives.'
    },
    {
      name: 'Aura',
      website: 'https://aura.com',
      description: 'Aura provides all-in-one digital security solutions that protect individuals and families against threats like identity theft, financial fraud, and hacking through intelligent threat monitoring and prevention.'
    },
    {
      name: 'GEM',
      website: 'https://www.dailygem.co',
      description: 'GEM creates plant-based, real food vitamins and supplements designed to fill nutritional gaps in modern diets, using whole food ingredients that are sustainably sourced and easily absorbed by the body.'
    },
    {
      name: 'Goodmylk',
      website: 'https://goodmylk.co',
      description: 'Goodmylk produces plant-based milk alternatives made from simple, organic ingredients without additives or preservatives. Their products offer sustainable, dairy-free options that maintain superior taste and nutrition.'
    },
    {
      name: 'H',
      website: 'https://www.hedgehoghealth.com',
      description: 'Hedgehog Health (H) develops innovative healthcare technologies and services focused on improving patient outcomes through data-driven approaches to personalized medicine and preventative care.'
    },
    {
      name: 'Playbook',
      website: 'https://www.playbookapp.io',
      description: 'Playbook is a fitness platform that enables expert trainers to create and share digital workout programs, offering personalized fitness experiences through high-quality content and community engagement.'
    },
    {
      name: 'RPM',
      website: 'https://rpm.fm',
      description: 'RPM is a remote patient monitoring platform that empowers healthcare providers to track patients\' vital signs and health metrics outside traditional settings, enabling better care coordination and health outcomes.'
    },
    {
      name: 'Backpack',
      website: 'https://backpack.exchange',
      description: 'Backpack is a crypto exchange built for traders, offering advanced trading tools, deep liquidity, and industry-leading security while maintaining a simple, intuitive user experience for all experience levels.'
    },
    {
      name: 'Hash',
      website: 'https://www.joinhash.com',
      description: 'Hash (originally Harper) develops financial infrastructure solutions that streamline payment processing, compliance, and banking operations for businesses operating in complex regulatory environments.'
    },
    {
      name: 'Kartera',
      website: 'https://kartera.finance',
      description: 'Kartera provides digital asset management solutions that help individuals and institutions build, manage, and optimize cryptocurrency portfolios through advanced analytics and automated strategies.'
    },
    {
      name: 'Keep',
      website: 'https://keep.network',
      description: 'Keep Network develops privacy solutions for public blockchains, enabling confidential transactions and secure data storage while maintaining the decentralized benefits of blockchain technology.'
    },
    {
      name: 'Naridea',
      website: 'https://maridea.com',
      description: 'Maridea (formerly Naridea) provides wealth management solutions that combine traditional financial planning with innovative technology to deliver personalized investment strategies for high-net-worth individuals.'
    },
    {
      name: 'Rely',
      website: 'https://rely.com',
      description: 'Rely offers buy-now-pay-later solutions that enable merchants to provide flexible payment options to customers while ensuring responsible lending practices through advanced risk assessment technology.'
    },
    {
      name: 'Sundae',
      website: 'https://sundae.com',
      description: 'Sundae is a residential real estate marketplace that helps homeowners sell distressed properties without making repairs, connecting them with qualified investors to receive competitive cash offers.'
    },
    {
      name: 'Swan',
      website: 'https://swan.io',
      description: 'Swan provides embedded banking infrastructure that enables companies to offer financial services to their customers, including accounts, cards, and payments through API-based integration.'
    },
    {
      name: 'Waldo',
      website: 'https://www.waldocontacts.com',
      description: 'Waldo delivers daily contact lenses directly to consumers through a subscription model, offering high-quality lenses at affordable prices with a focus on convenience and eye health.'
    }
  ];

  // Update count
  let updatedCount = 0;
  let errorCount = 0;

  // Process each company
  for (const company of companyInfo) {
    try {
      // Find the portfolio item with the matching name
      const portfolioItem = await prisma.portfolio.findFirst({
        where: { 
          name: {
            equals: company.name,
            mode: 'insensitive' // Case-insensitive matching
          }
        }
      });

      if (portfolioItem) {
        // Update the portfolio item with website and description
        await prisma.portfolio.update({
          where: { id: portfolioItem.id },
          data: { 
            website: company.website,
            description: company.description
          }
        });
        
        console.log(`Updated ${company.name} with website and description`);
        updatedCount++;
      } else {
        console.log(`No portfolio item found with name ${company.name}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error updating ${company.name}:`, error);
      errorCount++;
    }
  }

  console.log(`Company information update complete.`);
  console.log(`  Updated: ${updatedCount} companies`);
  console.log(`  Errors: ${errorCount} companies`);
}

main()
  .catch((e) => {
    console.error('Error updating company information:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });