/**
 * Global type definitions for window properties
 * 
 * This file contains type definitions for properties added to the global window object
 */

interface Window {
  // Global properties can be defined here as needed
  
  /**
   * Flag to indicate a WebView compatibility script is active
   * This is set by the webview-compat.js script
   */
  __webviewCompatActive?: boolean;
}