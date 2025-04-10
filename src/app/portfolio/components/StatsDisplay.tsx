"use client";

import React from 'react';

const StatsDisplay = () => {
  const statsStyle = {
    container: {
      marginBottom: '2.5rem',
      maxWidth: '300px',
      textAlign: 'left' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0px'
    },
    statItem: {
      marginBottom: '4px'
    },
    label: {
      fontSize: '1.25rem',
      fontWeight: 500,
      marginBottom: '4px',
      color: 'black'
    },
    value: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginTop: 0,
      marginBottom: '16px',
      lineHeight: 1.2,
      color: 'black'
    }
  };

  return (
    <div style={statsStyle.container}>
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}># Investments</h3>
        <p style={statsStyle.value}>32</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}># Markups</h3>
        <p style={statsStyle.value}>13</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}># Acquisitions</h3>
        <p style={statsStyle.value}>2</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}># Busts</h3>
        <p style={statsStyle.value}>4</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}>TVPI</h3>
        <p style={statsStyle.value}>1.44x</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}>Gross Multiple</h3>
        <p style={statsStyle.value}>1.22x</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}>Net Multiple</h3>
        <p style={statsStyle.value}>1.12x</p>
      </div>
      
      <div style={statsStyle.statItem}>
        <h3 style={statsStyle.label}>IRR</h3>
        <p style={statsStyle.value}>10%</p>
      </div>
    </div>
  );
};

export default StatsDisplay;