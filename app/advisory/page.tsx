'use client';

import { useState } from 'react';
import AdvisoryHero from '../components/advisory/advisory-hero';
import AdvisoryComparison from '../components/advisory/advisory-comparison';
import AdvisoryPrinciples from '../components/advisory/advisory-principles';
import TestimonialsMarquee from '../components/advisory/testimonials-marquee';
import AdvisoryPackages from '../components/advisory/advisory-packages';
import AdvisoryContact from '../components/advisory/advisory-contact';

export default function AdvisoryPage() {
  const [interest, setInterest] = useState('');

  const handleSelect = (value: string) => {
    setInterest(value);
    requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <div className="pt-20 pb-16">
      <AdvisoryHero />
      <AdvisoryComparison />
      <AdvisoryPrinciples />
      <TestimonialsMarquee />
      <AdvisoryPackages onSelect={handleSelect} />
      <AdvisoryContact interest={interest} onClearInterest={() => setInterest('')} />
    </div>
  );
}
