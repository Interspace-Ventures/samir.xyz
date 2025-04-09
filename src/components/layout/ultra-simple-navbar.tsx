"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function UltraSimpleNavbar() {
  const pathname = usePathname();
  
  // Force the navbar to be visible with direct DOM manipulation
  useEffect(() => {
    // Create a style element for direct CSS injection
    const style = document.createElement('style');
    style.innerHTML = `
      .purple-navbar-direct {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: #5239cc;
        color: white;
        z-index: 9999;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        font-family: Alexandria, sans-serif;
        display: flex;
        justify-content: center;
      }
      .purple-navbar-container {
        max-width: 1200px;
        width: 100%;
        height: 100%;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .purple-navbar-logo-container {
        display: flex;
        align-items: center;
      }
      .purple-navbar-logo {
        background: linear-gradient(135deg, #4285f4 0%, #8c5ad7 100%);
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        margin-right: 16px;
      }
      .purple-navbar-logo-text {
        color: white;
        font-size: 24px;
        font-weight: bold;
      }
      .purple-navbar-wordmark {
        font-size: 24px;
        font-weight: 500;
        color: white;
      }
      .purple-navbar-links {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .purple-navbar-link {
        color: white;
        margin: 0 16px;
        font-size: 16px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        text-decoration: none;
      }
    `;
    document.head.appendChild(style);
    
    // Create and inject the navbar HTML directly
    setTimeout(() => {
      const navbar = document.createElement('div');
      navbar.className = 'purple-navbar-direct';
      navbar.innerHTML = `
        <div class="purple-navbar-container">
          <div class="purple-navbar-logo-container">
            <a href="/" style="display: flex; align-items: center; text-decoration: none;">
              <div class="purple-navbar-logo">
                <span class="purple-navbar-logo-text">S</span>
              </div>
              <span class="purple-navbar-wordmark">samir.xyz</span>
            </a>
          </div>
          <div class="purple-navbar-links">
            <a href="/profile/" class="purple-navbar-link">ABOUT</a>
            <a href="/portfolio/" class="purple-navbar-link">PORTFOLIO</a>
            <a href="/ventures/" class="purple-navbar-link">VENTURES</a>
          </div>
        </div>
      `;
      
      // Insert at the top of the body
      if (document.body.firstChild) {
        document.body.insertBefore(navbar, document.body.firstChild);
      } else {
        document.body.appendChild(navbar);
      }
      
      // Add padding to main content to prevent overlap
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.style.paddingTop = '100px';
      }
      
      console.log('Direct navbar injection successful');
    }, 100);
    
    return () => {
      // Cleanup if component unmounts
      document.querySelectorAll('.purple-navbar-direct').forEach(el => el.remove());
    };
  }, []);
  
  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 shadow-lg !bg-[#5239cc]"
      style={{ height: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and wordmark on the left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Logo with gradient background */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 flex items-center justify-center rounded-md mr-3 shadow-md">
                <span 
                  className="text-white text-2xl font-bold" 
                  style={{ fontFamily: "Alexandria, sans-serif" }}
                >
                  S
                </span>
              </div>
              
              {/* Wordmark */}
              <span 
                className="text-white text-2xl font-medium" 
                style={{ fontFamily: "Alexandria, sans-serif" }}
              >
                samir.xyz
              </span>
            </Link>
          </div>
          
          {/* Navigation links - right aligned */}
          <div className="flex items-center justify-end">
            <Link
              href="/profile/"
              className={`ml-8 text-base uppercase tracking-wider text-white ${pathname.startsWith("/profile") ? 'border-b-2 border-white font-semibold' : 'font-normal'}`}
              style={{ fontFamily: "Alexandria, sans-serif" }}
            >
              ABOUT
            </Link>
            <Link
              href="/portfolio/"
              className={`ml-8 text-base uppercase tracking-wider text-white ${pathname.startsWith("/portfolio") ? 'border-b-2 border-white font-semibold' : 'font-normal'}`}
              style={{ fontFamily: "Alexandria, sans-serif" }}
            >
              PORTFOLIO
            </Link>
            <Link
              href="/ventures/"
              className={`ml-8 text-base uppercase tracking-wider text-white ${pathname.startsWith("/ventures") ? 'border-b-2 border-white font-semibold' : 'font-normal'}`}
              style={{ fontFamily: "Alexandria, sans-serif" }}
            >
              VENTURES
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}