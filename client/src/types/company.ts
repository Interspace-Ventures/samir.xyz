import { z } from 'zod';

export type CompanyCategory = 'Health' | 'Retail' | 'SaaS' | 'Fintech';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
}

export const companies: Company[] = [
  // Health
  { name: 'Afar', url: 'https://www.afarfoods.com/', category: 'Health' },
  { name: 'GEM', url: 'https://dailygem.com/', category: 'Health' },
  { name: 'Aura', url: 'https://www.aurahealth.io/', category: 'Health' },
  { name: 'RPM', url: 'https://rpmtraining.com/', category: 'Health' },
  { name: 'Swansea City AFC', url: 'https://www.swanseacity.com', category: 'Health' },
  { name: 'Playbook', url: 'https://www.joinplaybook.com/', category: 'Health' },

  // Retail
  { name: 'Juneshine', url: 'https://www.juneshine.com', category: 'Retail' },
  { name: 'Sanzo', url: 'https://www.drinksanzo.com', category: 'Retail' },
  { name: 'Goodmylk', url: 'https://www.goodmylk.co', category: 'Retail' },
  { name: 'Moku', url: 'https://mokufoods.com/', category: 'Retail' },
  { name: 'Superplastic', url: 'https://www.superplastic.co', category: 'Retail' },
  { name: 'Lunar', url: 'https://drinklunar.com', category: 'Retail' },
  { name: 'The Coffee', url: 'https://thecoffee.com/', category: 'Retail' },
  { name: 'The Food Company', url: 'https://thefoodcompany.com/', category: 'Retail' },

  // SaaS
  { name: 'AON3D', url: 'https://www.aon3d.com', category: 'SaaS' },
  { name: 'Metadata', url: 'https://www.metadata.io', category: 'SaaS' },
  { name: 'Restream', url: 'https://www.restream.io', category: 'SaaS' },
  { name: 'Sugar', url: 'https://www.sugarliving.com/', category: 'SaaS' },
  { name: 'Hedgehog', url: 'https://www.thehedgehogcompany.com/', category: 'SaaS' },
  { name: 'Soot', url: 'https://www.soot.com', category: 'SaaS' },
  { name: 'Techmate', url: 'https://www.techmate.com', category: 'SaaS' },

  // Fintech
  { name: 'Backpack', url: 'https://www.backpack529.com/', category: 'Fintech' },
  { name: 'Harper', url: 'https://www.harperinsure.com/', category: 'Fintech' },
  { name: 'Juno', url: 'https://www.withjuno.com', category: 'Fintech' },
  { name: 'Maridea', url: 'https://marideawealth.com/', category: 'Fintech' },
  { name: 'Swan', url: 'https://www.swanbitcoin.com/', category: 'Fintech' },
  { name: 'Waldo', url: 'https://www.waldo.ai/', category: 'Fintech' },
  { name: 'Sundae', url: 'https://www.sundae.com', category: 'Fintech' },
  { name: 'Kartera', url: 'https://www.kartera.com', category: 'Fintech' },
  { name: 'Launchpad', url: 'https://www.launchpad.com', category: 'Fintech' }
].sort((a, b) => a.name.localeCompare(b.name));

export const categories: CompanyCategory[] = ['Health', 'Retail', 'SaaS', 'Fintech'];