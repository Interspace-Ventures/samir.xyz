export interface Company {
  name: string;
  logo: string;
  description: string;
  category: 'Fintech' | 'Health' | 'Retail' | 'SaaS';
  markup?: boolean;
  acquired?: boolean;
}
