"use client";

import React from "react";
import Link from "next/link";

export default function DirectNavbar() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '80px',
      backgroundColor: '#5239cc',
      color: 'white',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      fontFamily: 'Alexandria, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '100%',
        padding: '0 24px',
        flexWrap: 'nowrap'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4285f4 0%, #8c5ad7 100%)',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            marginRight: '16px'
          }}>
            <span style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>S</span>
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: '500'
          }}>samir.xyz</span>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'nowrap',
          flexShrink: 0
        }}>
          <Link href="/profile">
            <span style={{
              color: 'white',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>ABOUT</span>
          </Link>
          <Link href="/portfolio">
            <span style={{
              color: 'white',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>PORTFOLIO</span>
          </Link>
          <Link href="/ventures">
            <span style={{
              color: 'white',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>VENTURES</span>
          </Link>
        </div>
      </div>
    </div>
  );
}