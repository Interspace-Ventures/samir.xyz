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
  // ... keeping other companies unchanged
];
