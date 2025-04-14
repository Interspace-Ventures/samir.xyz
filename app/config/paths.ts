/**
 * Path configurations for the application
 * 
 * This file centralizes all path references to ensure consistency
 * and make it easier to update paths across the application.
 */

// Base paths
export const BASE_URL = '/';
export const ASSETS_PATH = '/img';

// Image paths by category
export const IMAGES = {
  // Common images (icons, backgrounds, etc.)
  common: `${ASSETS_PATH}/common`,
  
  // Company logos and images
  companies: `${ASSETS_PATH}/companies`,
  
  // Profile images
  profiles: `${ASSETS_PATH}/profiles`,
  
  // Venture logos and images
  ventures: `${ASSETS_PATH}/ventures`,
};

// Legacy path mapping for backward compatibility
export const LEGACY_PATHS = {
  'assets/companies': IMAGES.companies,
  'assets/images': IMAGES.common,
  'assets/profiles': IMAGES.profiles,
  'assets/ventures': IMAGES.ventures,
  'assets/icons': IMAGES.common,
  'logos/companies': IMAGES.companies,
};

/**
 * Helper function to transform old asset paths to new structure
 * @param path Original asset path
 * @returns Updated path using the new structure
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  
  // If path already starts with our new asset path, return as is
  if (path.startsWith(ASSETS_PATH)) {
    return path;
  }
  
  // Handle legacy paths
  for (const [oldPath, newPath] of Object.entries(LEGACY_PATHS)) {
    if (path.startsWith(`/${oldPath}`) || path.startsWith(oldPath)) {
      return path.replace(new RegExp(`^/?${oldPath}`), newPath);
    }
  }
  
  // If no match found, return the original path
  return path;
}