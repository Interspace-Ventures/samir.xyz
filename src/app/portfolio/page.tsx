"use client"

import { useState, memo } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { CompanyCard } from './components/CompanyCard';
import styles from './styles.module.css';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';

  // Stats calculations
  const totalCompanies = companies.length;
  const acquiredCompanies = companies.filter(c => c.acquired).length;
  const markupCompanies = companies.filter(c => c.markup).length;
  const enterpriseCompanies = companies.filter(c => c.category === 'SaaS').length;

  return (
    <div className={styles.portfolioContainer}>
      <h1 className={styles.portfolioTitle}>Portfolio</h1>
      <p className={styles.portfolioSubtitle}>
        Companies I've worked with, from startups to enterprise.
      </p>
      
      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statsGridContainer}>
          <div>
            <p className={styles.statLabel}>Total Companies</p>
            <p className={styles.statValue}>{totalCompanies}</p>
          </div>
          <div>
            <p className={styles.statLabel}>Acquired</p>
            <p className={styles.statValue}>{acquiredCompanies}</p>
          </div>
          <div>
            <p className={styles.statLabel}>Markup Experience</p>
            <p className={styles.statValue}>{markupCompanies}</p>
          </div>
          <div>
            <p className={styles.statLabel}>Enterprise Clients</p>
            <p className={styles.statValue}>{enterpriseCompanies}</p>
          </div>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedCategory === 'All' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory('All')}
        >
          All
        </Button>
        
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Company Grid */}
      <div className={styles.portfolioGrid}>
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.name} company={company} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}
