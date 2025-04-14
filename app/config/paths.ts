/**
 * Standard asset paths
 * 
 * Centralizes all asset paths for easier management and updates
 */

// Base asset path
export const ASSETS_PATH = '/assets';

// Asset category paths
export const COMPANIES_PATH = `${ASSETS_PATH}/companies`;
export const IMAGES_PATH = `${ASSETS_PATH}/images`;
export const PROFILES_PATH = `${ASSETS_PATH}/profiles`;
export const VENTURES_PATH = `${ASSETS_PATH}/ventures`;

/**
 * Gets the path for a company image/logo
 */
export function getCompanyPath(filename: string): string {
  return `${COMPANIES_PATH}/${filename}`;
}

/**
 * Gets the path for a general image
 */
export function getImagePath(filename: string): string {
  return `${IMAGES_PATH}/${filename}`;
}

/**
 * Gets the path for a profile image
 */
export function getProfilePath(filename: string): string {
  return `${PROFILES_PATH}/${filename}`;
}

/**
 * Gets the path for a venture image
 */
export function getVenturePath(filename: string): string {
  return `${VENTURES_PATH}/${filename}`;
}