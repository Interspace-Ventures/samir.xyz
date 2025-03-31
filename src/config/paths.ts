/**
 * Path configuration for all assets in the application
 * - Uses a consistent path structure for easier maintenance
 * - Centralizes path definitions to avoid scattering across codebase
 */

// Base path for all images (served from root of public directory)
export const IMAGE_BASE_PATH = '/';

// Specific paths for different types of assets
export const ASSET_PATHS = {
  // Venture logos in a dedicated folder with consistent naming
  VENTURES: '/logos/ventures/',
  
  // Main attached assets folder (for general purpose images)
  ATTACHED: '/attached_assets/'
};
