"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PurpleNavbar() {
  const pathname = usePathname();
  
  return (
    <nav 
      style={{
        height: '80px',
        backgroundColor: '#5239cc',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo and wordmark on the left */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            {/* Logo with gradient background */}
            <div 
              style={{
                background: 'linear-gradient(135deg, #4285f4 0%, #8c5ad7 100%)',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '6px',
                marginRight: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <span 
                style={{ 
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  fontFamily: "Alexandria, sans-serif"
                }}
              >
                S
              </span>
            </div>
            
            {/* Wordmark */}
            <span 
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '500',
                fontFamily: "Alexandria, sans-serif"
              }}
            >
              samir.xyz
            </span>
          </Link>
        </div>
        
        {/* Navigation links - right aligned */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Link
            href="/profile/"
            style={{
              marginLeft: '32px',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'white',
              fontWeight: pathname.startsWith("/profile") ? 'bold' : 'normal',
              textDecoration: pathname.startsWith("/profile") ? 'underline' : 'none',
              fontFamily: "Alexandria, sans-serif"
            }}
          >
            ABOUT
          </Link>
          <Link
            href="/portfolio/"
            style={{
              marginLeft: '32px',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'white',
              fontWeight: pathname.startsWith("/portfolio") ? 'bold' : 'normal',
              textDecoration: pathname.startsWith("/portfolio") ? 'underline' : 'none',
              fontFamily: "Alexandria, sans-serif"
            }}
          >
            PORTFOLIO
          </Link>
          <Link
            href="/ventures/"
            style={{
              marginLeft: '32px',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'white',
              fontWeight: pathname.startsWith("/ventures") ? 'bold' : 'normal',
              textDecoration: pathname.startsWith("/ventures") ? 'underline' : 'none',
              fontFamily: "Alexandria, sans-serif"
            }}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </nav>
  );
}