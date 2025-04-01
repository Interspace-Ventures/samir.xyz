"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "../theme-provider";
import UltraSimpleNavbar from "./ultra-simple-navbar";
import Footer from "./footer";
import ErrorBoundary from "../error-boundary";

/**
 * Custom fallback UI for the ErrorBoundary component
 */
function ErrorFallback() {
  return (
    <div className="error-fallback p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">We're experiencing some issues</h2>
      <p className="mb-6">
        Our team has been notified and is working to fix this issue.
        Please try refreshing the page.
      </p>
      <button
        onClick={() => {
          // Force a hard refresh to clear any cached errors
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
      >
        Refresh page
      </button>
    </div>
  );
}

/**
 * Client component wrapper for the app layout
 * Contains all interactive elements that need to be client components
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for WebView environment - synchronous detection at component initialization
  const isWebviewSync = typeof window !== 'undefined' && 
    window.__NEXT_WEBVIEW_COMPATIBILITY__ === true;
    
  // Add effect to ensure webview compatibility
  useEffect(() => {
    // Enhanced ultra-aggressive visibility enforcement function - v2.0
    function applyForcedVisibility() {
      if (document.body) {
        // Set global flag that we've started the enforcement process
        if (typeof window !== 'undefined') {
          (window as any).__WEBVIEW_ENFORCEMENT_STARTED = true;
        }
        
        // Set multiple classes and attributes for CSS targeting
        document.documentElement.setAttribute('data-webview-ready', 'true');
        document.documentElement.setAttribute('data-webview-compatible', 'true');
        document.documentElement.classList.add('webview-compatible');
        
        // Use setAttribute for maximum CSS priority with comprehensive rules
        document.body.setAttribute('style', 
          'visibility: visible !important; ' +
          'opacity: 1 !important; ' + 
          'display: block !important; ' +
          'animation: none !important; ' +
          'transition: none !important; ' +
          'transform: none !important; ' +
          'pointer-events: auto !important; ' +
          'min-height: 100vh !important;'
        );
        
        // Add marker classes for CSS targeting
        document.body.classList.add('webview-compatible');
        document.body.classList.add('webview-forced-visible');
        
        try {
          // Attempt to create and inject style element for maximum CSS override capability
          const forceVisStyle = document.createElement('style');
          forceVisStyle.id = 'webview-compat-style';
          forceVisStyle.innerHTML = `
            /* Ultra-aggressive WebView compatibility styles injected by ClientLayout */
            html.webview-compatible,
            html[data-webview-ready="true"],
            html[data-webview-compatible="true"],
            body,
            body > *,
            #__next,
            #__next > *,
            main,
            .flex-grow,
            .webview-forced-visible {
              visibility: visible !important;
              opacity: 1 !important;
              display: block !important;
              animation: none !important;
              transition: none !important;
              transform: none !important;
              pointer-events: auto !important;
            }
            
            /* Hide any loading indicators immediately */
            [class*="loading"],
            [class*="spinner"],
            [class*="skeleton"],
            [role="progressbar"] {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
            }
          `;
          
          // Inject the style element if it doesn't exist yet
          if (!document.getElementById('webview-compat-style')) {
            document.head.appendChild(forceVisStyle);
            console.log('ClientLayout: Injected forced CSS rules');
          }
        } catch (e) {
          console.error('ClientLayout: Error injecting forced CSS', e);
        }
        
        // Apply to all critical Next.js containers with ultra-high specificity
        const nextElements = document.querySelectorAll('#__next, #__next > *, #__next div');
        nextElements.forEach(el => {
          try {
            (el as HTMLElement).setAttribute('style', 
              ((el as HTMLElement).getAttribute('style') || '') +
              '; visibility: visible !important' +
              '; opacity: 1 !important' + 
              '; display: block !important' +
              '; animation: none !important' +
              '; transition: none !important' +
              '; transform: none !important'
            );
            (el as HTMLElement).classList.add('webview-forced-visible');
          } catch (e) {
            // Ignore errors from elements that might not support these operations
          }
        });
        
        // Apply to absolutely all major content containers with extensive selectors
        const contentSelectors = [
          'main', 
          '.flex-grow', 
          '[class*="container"]', 
          '[class*="content"]',
          '[class*="layout"]',
          '[class*="page"]',
          '[class*="wrapper"]',
          '.antialiased',
          'div',
          'section',
          'article',
          'header',
          'footer',
          'nav',
          'div[id^="headlessui-"]',
          '[role="main"]',
          '[role="region"]'
        ];
        
        // Apply to each selector group
        contentSelectors.forEach(selector => {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
              try {
                // Skip elements that are explicitly meant to be hidden
                if (
                  (el as HTMLElement).classList.contains('hidden') || 
                  (el as HTMLElement).style.display === 'none' ||
                  (el as HTMLElement).hasAttribute('hidden') ||
                  (el as HTMLElement).id?.includes('hidden')
                ) {
                  return;
                }
                
                const originalDisplayStyle = window.getComputedStyle(el).display;
                const displayValue = 
                  originalDisplayStyle === 'none' ? 'block' : originalDisplayStyle;
                
                (el as HTMLElement).setAttribute('style',
                  ((el as HTMLElement).getAttribute('style') || '') +
                  '; visibility: visible !important' +
                  '; opacity: 1 !important' + 
                  '; display: ' + displayValue + ' !important' +
                  '; animation: none !important' +
                  '; transition: none !important' +
                  '; transform: none !important'
                );
                
                // Add marker class for CSS targeting
                (el as HTMLElement).classList.add('webview-forced-visible');
              } catch (e) {
                // Ignore errors for specific elements
              }
            });
          } catch (e) {
            console.error(`Error processing selector ${selector}:`, e);
          }
        });
        
        // Hide any loading indicators or spinners
        try {
          const loadingElements = document.querySelectorAll(
            '[class*="loading"], ' +
            '[class*="spinner"], ' +
            '[class*="skeleton"], ' +
            '[class*="theme-provider-loading"], ' +
            '[role="progressbar"]'
          );
          
          loadingElements.forEach(el => {
            try {
              (el as HTMLElement).style.display = 'none';
              (el as HTMLElement).style.opacity = '0';
              (el as HTMLElement).style.visibility = 'hidden';
            } catch (e) {
              // Ignore errors for specific elements
            }
          });
        } catch (e) {
          console.error('Error hiding loading elements:', e);
        }
        
        console.log('ClientLayout: Ultra-aggressive WebView visibility enforcement applied');
        
        // Set global flag that we've completed the enforcement process
        if (typeof window !== 'undefined') {
          window.__WEBVIEW_CONTENT_VISIBLE = true;
        }
      } else {
        // If body isn't available yet, try again immediately
        setTimeout(applyForcedVisibility, 5); // Even more aggressive retry interval
      }
    }
    
    // Create MutationObserver to maintain visibility
    function setupVisibilityObserver() {
      if (typeof MutationObserver !== 'undefined' && document.body) {
        const observer = new MutationObserver(function(mutations) {
          // Force visibility after any DOM changes that might affect visibility
          applyForcedVisibility();
        });
        
        // Observe the entire document for changes
        observer.observe(document.body, { 
          attributes: true, 
          childList: true, 
          subtree: true 
        });
        
        console.log('ClientLayout: WebView MutationObserver started');
        return observer;
      }
      return null;
    }
    
    // Runs immediately after component mount - always try to improve visibility
    // but be more aggressive in WebView
    
    // Apply immediately
    applyForcedVisibility();
    
    // Setup timers and observers with different strategies for WebView vs browser
    if (isWebviewSync) {
      // For WebView - be extremely aggressive with visibility enforcement
      
      // Apply after a sequence of delays for coverage during all rendering phases
      const timers = [
        setTimeout(applyForcedVisibility, 0),   // Immediate queue
        setTimeout(applyForcedVisibility, 50),  // Very short delay
        setTimeout(applyForcedVisibility, 100), // Short delay
        setTimeout(applyForcedVisibility, 300), // Medium delay
        setTimeout(applyForcedVisibility, 800)  // Longer delay for safety
      ];
      
      // Setup observer for WebView
      const observer = setupVisibilityObserver();
      
      // Additional periodical enforcement for first 5 seconds
      const interval = setInterval(applyForcedVisibility, 500);
      setTimeout(() => clearInterval(interval), 5000);
      
      // Clear all timers on unmount
      return () => {
        timers.forEach(clearTimeout);
        clearInterval(interval);
        observer?.disconnect();
      };
    } else {
      // For regular browsers, just do a minimal enforcement
      const timer = setTimeout(applyForcedVisibility, 50);
      return () => clearTimeout(timer);
    }
  }, [isWebviewSync]);
  
  const handleError = (error: Error) => {
    // Log errors to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Layout Error:', error);
    }
    
    // Could add external error logging service here
  };
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="flex flex-col min-h-screen">
          <UltraSimpleNavbar />
          <main className="flex-grow px-4 sm:px-6 py-10 mt-2"> {/* Increased top padding to prevent navbar overlap */}
            <div className="max-w-screen-xl mx-auto w-full">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}