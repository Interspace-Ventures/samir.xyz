"use client";

import React from 'react';
import styles from './stats-display.module.css';

// Stats data structure
interface Stat {
  label: string;
  value: string;
}

const StatsDisplay = () => {
  // Organized stats in 2 rows of 4 for cleaner rendering
  const topRowStats: Stat[] = [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Acquisitions", value: "2" },
    { label: "# Busts", value: "4" }
  ];
  
  const bottomRowStats: Stat[] = [
    { label: "TVPI", value: "1.44x" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "Net Multiple", value: "1.12x" },
    { label: "IRR", value: "10%" }
  ];
  
  return (
    <div className={styles.statsTable}>
      <div className={styles.statsContainer}>
        {/* Top Row - 4 KPIs */}
        <div className={styles.statsRow}>
          {topRowStats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Bottom Row - 4 KPIs */}
        <div className={styles.statsRow}>
          {bottomRowStats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <h3 className={styles.statLabel}>{stat.label}</h3>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;