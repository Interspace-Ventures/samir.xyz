/**
 * Path configuration for all assets in the application
 * - Uses a consistent path structure for easier maintenance
 * - Centralizes path definitions to avoid scattering across codebase
 * - As of v4.2, all assets are consolidated to public/attached_assets only
 */

// Base path for all images (served from root of public directory)
export const IMAGE_BASE_PATH = '/';

// Specific paths for different types of assets
export const ASSET_PATHS = {
  // Venture logos in a dedicated folder with consistent naming
  // These are automatically copied from attached_assets by organize-assets.sh
  VENTURES: '/logos/ventures/',
  
  // Main attached assets folder (for general purpose images)
  // This is now the primary source for all assets in the application
  ATTACHED: '/attached_assets/'
};
