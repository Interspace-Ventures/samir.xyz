'use client';

import { useState } from 'react';
import AdvisoryHero from './components/advisory/advisory-hero';
import AdvisoryComparison from './components/advisory/advisory-comparison';
import AdvisoryPrinciples from './components/advisory/advisory-principles';
import TestimonialsMarquee from './components/advisory/testimonials-marquee';
import AdvisoryPackages from './components/advisory/advisory-packages';
import AdvisoryContact from './components/advisory/advisory-contact';
import { FEATURE_TESTIMONIALS } from './lib/feature-flags';

export default function Home() {
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
    <div className="pt-8 pb-16">
      <AdvisoryHero />
      <AdvisoryComparison />
      <AdvisoryPrinciples />
      {FEATURE_TESTIMONIALS && <TestimonialsMarquee />}
      <AdvisoryPackages onSelect={handleSelect} />
      <AdvisoryContact
        interest={interest}
        onSelectInterest={setInterest}
        onClearInterest={() => setInterest('')}
      />
    </div>
  );
}
