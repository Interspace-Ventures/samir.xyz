export type CompanyCategory = 'Health' | 'Consumer' | 'SaaS' | 'Fintech';

export interface Company {
  name: string;
  url: string;
  logo: string;
  category: CompanyCategory;
}

export const companies: Company[] = [
  {
    name: 'Afar Foods',
    url: 'https://www.afarfoods.com/',
    logo: '/assets/Afar.png',
    category: 'Health'
  },
  {
    name: 'AON3D',
    url: 'https://www.aon3d.com',
    logo: '/assets/AON3D.png',
    category: 'SaaS'
  },
  {
    name: 'Aura',
    url: 'https://www.aurahealth.io/',
    logo: '/assets/Aura.png',
    category: 'Health'
  },
  {
    name: 'Backpack',
    url: 'https://www.backpack529.com/',
    logo: '/assets/Backpack.png',
    category: 'Fintech'
  },
  {
    name: 'CaliberX',
    url: 'https://www.harperinsure.com/',
    logo: '/assets/CaliberX.png',
    category: 'Fintech'
  },
  {
    name: 'GEM',
    url: 'https://dailygem.com/',
    logo: '/assets/GEM.png',
    category: 'Health'
  },
  {
    name: 'Goodmylk',
    url: 'https://www.goodmylk.co',
    logo: '/assets/Goodmylk.png',
    category: 'Consumer'
  },
  {
    name: 'Hedgehog',
    url: 'https://www.thehedgehogcompany.com/',
    logo: '/assets/Hedgehog.png',
    category: 'SaaS'
  },
  {
    name: 'Juneshine',
    url: 'https://www.juneshine.com',
    logo: '/assets/Juneshine.png',
    category: 'Consumer'
  },
  {
    name: 'Juno',
    url: 'https://www.withjuno.com',
    logo: '/assets/Juno.png',
    category: 'Fintech'
  },
  {
    name: 'Kartera',
    url: 'https://www.kartera.com',
    logo: '/assets/Kartera.png',
    category: 'Fintech'
  },
  {
    name: 'Lunar',
    url: 'https://drinklunar.com',
    logo: '/assets/Lunar.png',
    category: 'Consumer'
  },
  {
    name: 'Maridea',
    url: 'https://marideawealth.com/',
    logo: '/assets/Maridea.png',
    category: 'Fintech'
  },
  {
    name: 'Metadata',
    url: 'https://www.metadata.io',
    logo: '/assets/Metadata.png',
    category: 'SaaS'
  },
  {
    name: 'Moku',
    url: 'https://mokufoods.com/',
    logo: '/assets/Moku.png',
    category: 'Health'
  },
  {
    name: 'Playbook',
    url: 'https://www.joinplaybook.com/',
    logo: '/assets/Playbook.png',
    category: 'Health'
  },
  {
    name: 'Restream',
    url: 'https://www.restream.io',
    logo: '/assets/Restream.png',
    category: 'SaaS'
  },
  {
    name: 'RPM',
    url: 'https://rpmtraining.com/',
    logo: '/assets/RPM.png',
    category: 'Health'
  },
  {
    name: 'Sanzo',
    url: 'https://www.drinksanzo.com',
    logo: '/assets/Sanzo.png',
    category: 'Consumer'
  },
  {
    name: 'Soot',
    url: 'https://soot.com',
    logo: '/assets/Soot.png',
    category: 'SaaS'
  },
  {
    name: 'Sugar',
    url: 'https://www.sugarliving.com/',
    logo: '/assets/Sugar.png',
    category: 'SaaS'
  },
  {
    name: 'Sundae',
    url: 'https://sundae.com',
    logo: '/assets/Sundae.png',
    category: 'Fintech'
  },
  {
    name: 'Superplastic',
    url: 'https://www.superplastic.co',
    logo: '/assets/Superplastic.png',
    category: 'Consumer'
  },
  {
    name: 'Swan',
    url: 'https://www.swanbitcoin.com/',
    logo: '/assets/Swan.png',
    category: 'Fintech'
  },
  {
    name: 'Swansea City',
    url: 'https://www.swanseacity.com',
    logo: '/assets/Swansea City AFC.png',
    category: 'Health'
  },
  {
    name: 'Techmate',
    url: 'https://techmate.com',
    logo: '/assets/Techmate.png',
    category: 'SaaS'
  },
  {
    name: 'The Coffee',
    url: 'https://thecoffee.com',
    logo: '/assets/The Coffee.png',
    category: 'Consumer'
  },
  {
    name: 'The Food Company',
    url: 'https://thefoodcompany.com',
    logo: '/assets/The Food Company.png',
    category: 'Consumer'
  },
  {
    name: 'Waldo',
    url: 'https://www.waldo.ai/',
    logo: '/assets/Waldo.png',
    category: 'Fintech'
  }
];