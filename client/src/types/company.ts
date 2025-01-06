export type CompanyCategory = 'Health' | 'Retail' | 'SaaS' | 'Fintech';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
}

export const companies: Company[] = [
  // Health
  { name: 'Afar Foods', url: 'https://www.afarfoods.com/', category: 'Health' as const },
  { name: 'GEM', url: 'https://dailygem.com/', category: 'Health' as const },
  { name: 'Aura', url: 'https://www.aurahealth.io/', category: 'Health' as const },
  { name: 'RPM', url: 'https://rpmtraining.com/', category: 'Health' as const },
  { name: 'Swansea City', url: 'https://www.swanseacity.com', category: 'Health' as const },
  { name: 'Playbook', url: 'https://www.joinplaybook.com/', category: 'Health' as const },

  // Retail
  { name: 'Juneshine', url: 'https://www.juneshine.com', category: 'Retail' as const },
  { name: 'Sanzo', url: 'https://www.drinksanzo.com', category: 'Retail' as const },
  { name: 'Goodmylk', url: 'https://www.goodmylk.co', category: 'Retail' as const },
  { name: 'Moku', url: 'https://mokufoods.com/', category: 'Retail' as const },
  { name: 'Superplastic', url: 'https://www.superplastic.co', category: 'Retail' as const },
  { name: 'Lunar', url: 'https://drinklunar.com', category: 'Retail' as const },

  // SaaS
  { name: 'Aon3D', url: 'https://www.aon3d.com', category: 'SaaS' as const },
  { name: 'Metadata', url: 'https://www.metadata.io', category: 'SaaS' as const },
  { name: 'Restream', url: 'https://www.restream.io', category: 'SaaS' as const },
  { name: 'Sugar', url: 'https://www.sugarliving.com/', category: 'SaaS' as const },
  { name: 'Hedgehog', url: 'https://www.thehedgehogcompany.com/', category: 'SaaS' as const },
  { name: 'Soot', url: 'https://www.soot.com', category: 'SaaS' as const },

  // Fintech
  { name: 'Backpack', url: 'https://www.backpack529.com/', category: 'Fintech' as const },
  { name: 'Harper', url: 'https://www.harperinsure.com/', category: 'Fintech' as const },
  { name: 'Juno', url: 'https://www.withjuno.com', category: 'Fintech' as const },
  { name: 'Maridea', url: 'https://marideawealth.com/', category: 'Fintech' as const },
  { name: 'Swan', url: 'https://www.swanbitcoin.com/', category: 'Fintech' as const },
  { name: 'Waldo', url: 'https://www.waldo.ai/', category: 'Fintech' as const },
  { name: 'Sundae', url: 'https://www.sundae.com', category: 'Fintech' as const },
  { name: 'Kartera', url: 'https://www.kartera.com', category: 'Fintech' as const }
].sort((a, b) => a.name.localeCompare(b.name));

export const categories: CompanyCategory[] = ['Health', 'Retail', 'SaaS', 'Fintech'];