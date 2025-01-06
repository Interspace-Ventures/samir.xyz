export type CompanyCategory = 'Health' | 'Retail' | 'SaaS' | 'Fintech';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  logo: string;
}

export const companies: Company[] = [
  // Health
  { name: 'Afar Foods', url: 'https://www.afarfoods.com/', category: 'Health' as const, logo: '/logos/afar.svg' },
  { name: 'Aura', url: 'https://www.aurahealth.io/', category: 'Health' as const, logo: '/logos/aura.svg' },
  { name: 'GEM', url: 'https://dailygem.com/', category: 'Health' as const, logo: '/logos/gem.svg' },
  { name: 'Playbook', url: 'https://www.joinplaybook.com/', category: 'Health' as const, logo: '/logos/playbook.svg' },
  { name: 'RPM', url: 'https://rpmtraining.com/', category: 'Health' as const, logo: '/logos/rpm.svg' },
  { name: 'Swansea City', url: 'https://www.swanseacity.com', category: 'Health' as const, logo: '/logos/swansea.svg' },

  // Retail
  { name: 'Goodmylk', url: 'https://www.goodmylk.co', category: 'Retail' as const, logo: '/logos/goodmylk.svg' },
  { name: 'Juneshine', url: 'https://www.juneshine.com', category: 'Retail' as const, logo: '/logos/juneshine.svg' },
  { name: 'Lunar', url: 'https://drinklunar.com', category: 'Retail' as const, logo: '/logos/lunar.svg' },
  { name: 'Moku', url: 'https://mokufoods.com/', category: 'Retail' as const, logo: '/logos/moku.svg' },
  { name: 'Sanzo', url: 'https://www.drinksanzo.com', category: 'Retail' as const, logo: '/logos/sanzo.svg' },
  { name: 'Superplastic', url: 'https://www.superplastic.co', category: 'Retail' as const, logo: '/logos/superplastic.svg' },

  // SaaS
  { name: 'Aon3D', url: 'https://www.aon3d.com', category: 'SaaS' as const, logo: '/logos/aon3d.svg' },
  { name: 'Hedgehog', url: 'https://www.thehedgehogcompany.com/', category: 'SaaS' as const, logo: '/logos/hedgehog.svg' },
  { name: 'Metadata', url: 'https://www.metadata.io', category: 'SaaS' as const, logo: '/logos/metadata.svg' },
  { name: 'Restream', url: 'https://www.restream.io', category: 'SaaS' as const, logo: '/logos/restream.svg' },
  { name: 'Soot', url: 'https://www.soot.com', category: 'SaaS' as const, logo: '/logos/soot.svg' },
  { name: 'Sugar', url: 'https://www.sugarliving.com/', category: 'SaaS' as const, logo: '/logos/sugar.svg' },

  // Fintech
  { name: 'Backpack', url: 'https://www.backpack529.com/', category: 'Fintech' as const, logo: '/logos/backpack.svg' },
  { name: 'Harper', url: 'https://www.harperinsure.com/', category: 'Fintech' as const, logo: '/logos/harper.svg' },
  { name: 'Juno', url: 'https://www.withjuno.com', category: 'Fintech' as const, logo: '/logos/juno.svg' },
  { name: 'Kartera', url: 'https://www.kartera.com', category: 'Fintech' as const, logo: '/logos/kartera.svg' },
  { name: 'Maridea', url: 'https://marideawealth.com/', category: 'Fintech' as const, logo: '/logos/maridea.svg' },
  { name: 'Sundae', url: 'https://www.sundae.com', category: 'Fintech' as const, logo: '/logos/sundae.svg' },
  { name: 'Swan', url: 'https://www.swanbitcoin.com/', category: 'Fintech' as const, logo: '/logos/swan.svg' },
  { name: 'Waldo', url: 'https://www.waldo.ai/', category: 'Fintech' as const, logo: '/logos/waldo.svg' }
].sort((a, b) => a.name.localeCompare(b.name));

export const categories: CompanyCategory[] = ['Health', 'Retail', 'SaaS', 'Fintech'];