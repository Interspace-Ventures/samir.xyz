export type CompanyCategory = 'Health' | 'Retail' | 'SaaS' | 'Fintech';

export interface Company {
  name: string;
  url: string;
  category: CompanyCategory;
  logo: string;
}

export const companies: Company[] = [
  // Health
  { name: 'Afar Foods', url: 'https://www.afarfoods.com/', category: 'Health', logo: '/attached_assets/portfolio/afar.svg' },
  { name: 'Aura', url: 'https://www.aurahealth.io/', category: 'Health', logo: '/attached_assets/portfolio/aura.svg' },
  { name: 'GEM', url: 'https://dailygem.com/', category: 'Health', logo: '/attached_assets/portfolio/gem.svg' },
  { name: 'Playbook', url: 'https://www.joinplaybook.com/', category: 'Health', logo: '/attached_assets/portfolio/playbook.svg' },
  { name: 'RPM', url: 'https://rpmtraining.com/', category: 'Health', logo: '/attached_assets/portfolio/rpm.svg' },
  { name: 'Swansea City', url: 'https://www.swanseacity.com', category: 'Health', logo: '/attached_assets/portfolio/swansea.svg' },

  // Retail
  { name: 'Goodmylk', url: 'https://www.goodmylk.co', category: 'Retail', logo: '/attached_assets/portfolio/goodmylk.svg' },
  { name: 'Juneshine', url: 'https://www.juneshine.com', category: 'Retail', logo: '/attached_assets/portfolio/juneshine.svg' },
  { name: 'Lunar', url: 'https://drinklunar.com', category: 'Retail', logo: '/attached_assets/portfolio/lunar.svg' },
  { name: 'Moku', url: 'https://mokufoods.com/', category: 'Retail', logo: '/attached_assets/portfolio/moku.svg' },
  { name: 'Sanzo', url: 'https://www.drinksanzo.com', category: 'Retail', logo: '/attached_assets/portfolio/sanzo.svg' },
  { name: 'Superplastic', url: 'https://www.superplastic.co', category: 'Retail', logo: '/attached_assets/portfolio/superplastic.svg' },

  // SaaS
  { name: 'Aon3D', url: 'https://www.aon3d.com', category: 'SaaS', logo: '/attached_assets/portfolio/aon3d.svg' },
  { name: 'Hedgehog', url: 'https://www.thehedgehogcompany.com/', category: 'SaaS', logo: '/attached_assets/portfolio/hedgehog.svg' },
  { name: 'Metadata', url: 'https://www.metadata.io', category: 'SaaS', logo: '/attached_assets/portfolio/metadata.svg' },
  { name: 'Restream', url: 'https://www.restream.io', category: 'SaaS', logo: '/attached_assets/portfolio/restream.svg' },
  { name: 'Soot', url: 'https://www.soot.com', category: 'SaaS', logo: '/attached_assets/portfolio/soot.svg' },
  { name: 'Sugar', url: 'https://www.sugarliving.com/', category: 'SaaS', logo: '/attached_assets/portfolio/sugar.svg' },

  // Fintech
  { name: 'Backpack', url: 'https://www.backpack529.com/', category: 'Fintech', logo: '/attached_assets/portfolio/backpack.svg' },
  { name: 'Harper', url: 'https://www.harperinsure.com/', category: 'Fintech', logo: '/attached_assets/portfolio/harper.svg' },
  { name: 'Juno', url: 'https://www.withjuno.com', category: 'Fintech', logo: '/attached_assets/portfolio/juno.svg' },
  { name: 'Kartera', url: 'https://www.kartera.com', category: 'Fintech', logo: '/attached_assets/portfolio/kartera.svg' },
  { name: 'Maridea', url: 'https://marideawealth.com/', category: 'Fintech', logo: '/attached_assets/portfolio/maridea.svg' },
  { name: 'Sundae', url: 'https://www.sundae.com', category: 'Fintech', logo: '/attached_assets/portfolio/sundae.svg' },
  { name: 'Swan', url: 'https://www.swanbitcoin.com/', category: 'Fintech', logo: '/attached_assets/portfolio/swan.svg' },
  { name: 'Waldo', url: 'https://www.waldo.ai/', category: 'Fintech', logo: '/attached_assets/portfolio/waldo.svg' },
].sort((a, b) => a.name.localeCompare(b.name));

export const categories: CompanyCategory[] = ['Health', 'Retail', 'SaaS', 'Fintech'];