"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Extremely minimal navbar to eliminate styling issues
export default function SimpleNavbar() {
  const pathname = usePathname();
  
  return (
    <div style={{
      width: '100%',
      padding: '20px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#111827',
          textDecoration: 'none'
        }}>
          Hey - I&apos;m Samir
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '40px'
        }}>
          <Link href="/profile/" style={{
            color: pathname.startsWith('/profile') ? '#9333ea' : '#4b5563',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            About
          </Link>
          
          <Link href="/portfolio/" style={{
            color: pathname.startsWith('/portfolio') ? '#9333ea' : '#4b5563',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Portfolio
          </Link>
          
          <Link href="/ventures/" style={{
            color: pathname.startsWith('/ventures') ? '#9333ea' : '#4b5563',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            Ventures
          </Link>
        </div>
      </div>
    </div>
  );
}