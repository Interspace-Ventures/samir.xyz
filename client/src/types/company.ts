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
    logo: 'attached_assets/Afar.png',
    category: 'Health'
  },
  {
    name: 'AON3D',
    url: 'https://www.aon3d.com',
    logo: 'attached_assets/AON3D.png',
    category: 'SaaS'
  },
  {
    name: 'Aura',
    url: 'https://www.aurahealth.io/',
    logo: 'attached_assets/Aura.png',
    category: 'Health'
  },
  {
    name: 'Backpack',
    url: 'https://www.backpack529.com/',
    logo: 'attached_assets/Backpack.png',
    category: 'Fintech'
  },
  {
    name: 'CaliberX',
    url: 'https://www.harperinsure.com/',
    logo: 'attached_assets/CaliberX.png',
    category: 'Fintech'
  },
  {
    name: 'GEM',
    url: 'https://dailygem.com/',
    logo: 'attached_assets/GEM.png',
    category: 'Health'
  },
  {
    name: 'Goodmylk',
    url: 'https://www.goodmylk.co',
    logo: 'attached_assets/Goodmylk.png',
    category: 'Consumer'
  },
  {
    name: 'Hedgehog',
    url: 'https://www.thehedgehogcompany.com/',
    logo: 'attached_assets/Hedgehog.png',
    category: 'SaaS'
  },
  {
    name: 'Juneshine',
    url: 'https://www.juneshine.com',
    logo: 'attached_assets/Juneshine.png',
    category: 'Consumer'
  },
  {
    name: 'Juno',
    url: 'https://www.withjuno.com',
    logo: 'attached_assets/Juno.png',
    category: 'Fintech'
  },
  {
    name: 'Maridea',
    url: 'https://marideawealth.com/',
    logo: 'attached_assets/Maridea.png',
    category: 'Fintech'
  },
  {
    name: 'Metadata',
    url: 'https://www.metadata.io',
    logo: 'attached_assets/Metadata.png',
    category: 'SaaS'
  },
  {
    name: 'Moku',
    url: 'https://mokufoods.com/',
    logo: 'attached_assets/Moku.png',
    category: 'Health'
  },
  {
    name: 'Playbook',
    url: 'https://www.joinplaybook.com/',
    logo: 'attached_assets/Playbook.png',
    category: 'Health'
  },
  {
    name: 'Restream',
    url: 'https://www.restream.io',
    logo: 'attached_assets/Restream.png',
    category: 'SaaS'
  },
  {
    name: 'RPM',
    url: 'https://rpmtraining.com/',
    logo: 'attached_assets/RPM.png',
    category: 'Health'
  },
  {
    name: 'Sanzo',
    url: 'https://www.drinksanzo.com',
    logo: 'attached_assets/Sanzo.png',
    category: 'Consumer'
  },
  {
    name: 'Soot',
    url: 'https://soot.com',
    logo: 'attached_assets/Soot.png',
    category: 'Consumer'
  },
  {
    name: 'Sugar',
    url: 'https://www.sugarliving.com/',
    logo: 'attached_assets/Sugar.png',
    category: 'SaaS'
  },
  {
    name: 'Sundae',
    url: 'https://sundae.com',
    logo: 'attached_assets/Sundae.png',
    category: 'Consumer'
  },
  {
    name: 'Superplastic',
    url: 'https://www.superplastic.co',
    logo: 'attached_assets/Superplastic.png',
    category: 'Consumer'
  },
  {
    name: 'Swan',
    url: 'https://www.swanbitcoin.com/',
    logo: 'attached_assets/Swan.png',
    category: 'Fintech'
  },
  {
    name: 'Swansea City',
    url: 'https://www.swanseacity.com',
    logo: 'attached_assets/Swansea City AFC.png',
    category: 'Health'
  },
  {
    name: 'Techmate',
    url: 'https://techmate.com',
    logo: 'attached_assets/Techmate.png',
    category: 'SaaS'
  },
  {
    name: 'The Coffee',
    url: 'https://thecoffee.com',
    logo: 'attached_assets/The Coffee.png',
    category: 'Consumer'
  },
  {
    name: 'The Food Company',
    url: 'https://thefoodcompany.com',
    logo: 'attached_assets/The Food Company.png',
    category: 'Consumer'
  },
  {
    name: 'Waldo',
    url: 'https://www.waldo.ai/',
    logo: 'attached_assets/Waldo.png',
    category: 'Fintech'
  }
];