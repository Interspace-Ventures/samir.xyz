/**
 * Global type declarations for the application
 */

// Extend the Window interface to include webview compatibility flag
interface Window {
  /**
   * Flag to indicate webview compatibility mode is active
   */
  __NEXT_WEBVIEW_COMPATIBILITY__?: boolean;
  
  /**
   * Flag to indicate hydration is complete (for webview environments)
   */
  __NEXT_HYDRATION_COMPLETE__?: boolean;
  
  /**
   * Flag to indicate content is ready for display
   */
  __CONTENT_READY__?: boolean;
  
  /**
   * Next.js data object (from _next/data/)
   */
  __NEXT_DATA__?: any;
}