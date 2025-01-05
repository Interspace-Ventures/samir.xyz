export type CompanyCategory = 'Sports & Wellness' | 'CPG' | 'SaaS' | 'Fintech';

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
    logo: '/attached_assets/Afar.png',
    category: 'CPG'
  },
  {
    name: 'AON3D',
    url: 'https://www.aon3d.com',
    logo: '/attached_assets/AON3D.png',
    category: 'SaaS'
  },
  {
    name: 'Aura',
    url: 'https://www.aurahealth.io/',
    logo: '/attached_assets/Aura.png',
    category: 'Sports & Wellness'
  },
  {
    name: 'Backpack',
    url: 'https://www.backpack529.com/',
    logo: '/attached_assets/Backpack.png',
    category: 'Fintech'
  },
  {
    name: 'CaliberX',
    url: 'https://www.harperinsure.com/',
    logo: '/attached_assets/CaliberX.png',
    category: 'Fintech'
  },
  {
    name: 'GEM',
    url: 'https://dailygem.com/',
    logo: '/attached_assets/GEM.png',
    category: 'CPG'
  },
  {
    name: 'Goodmylk',
    url: 'https://www.goodmylk.co',
    logo: '/attached_assets/Goodmylk.png',
    category: 'CPG'
  },
  {
    name: 'Hedgehog',
    url: 'https://www.thehedgehogcompany.com/',
    logo: '/attached_assets/Hedgehog.png',
    category: 'CPG'
  },
  {
    name: 'Juneshine',
    url: 'https://www.juneshine.com',
    logo: '/attached_assets/Juneshine.png',
    category: 'CPG'
  },
  {
    name: 'Juno',
    url: 'https://www.withjuno.com',
    logo: '/attached_assets/Juno.png',
    category: 'Fintech'
  },
  {
    name: 'Maridea',
    url: 'https://marideawealth.com/',
    logo: '/attached_assets/Maridea.png',
    category: 'Fintech'
  },
  {
    name: 'Metadata',
    url: 'https://www.metadata.io',
    logo: '/attached_assets/Metadata.png',
    category: 'SaaS'
  },
  {
    name: 'Moku',
    url: 'https://mokufoods.com/',
    logo: '/attached_assets/Moku.png',
    category: 'CPG'
  },
  {
    name: 'Playbook',
    url: 'https://www.joinplaybook.com/',
    logo: '/attached_assets/Playbook.png',
    category: 'Sports & Wellness'
  },
  {
    name: 'Restream',
    url: 'https://www.restream.io',
    logo: '/attached_assets/Restream.png',
    category: 'SaaS'
  },
  {
    name: 'RPM',
    url: 'https://rpmtraining.com/',
    logo: '/attached_assets/RPM.png',
    category: 'Sports & Wellness'
  },
  {
    name: 'Sanzo',
    url: 'https://www.drinksanzo.com',
    logo: '/attached_assets/Sanzo.png',
    category: 'CPG'
  }
];
