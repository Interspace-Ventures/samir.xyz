/**
 * Simple path configuration
 * 
 * This file provides basic paths for assets in our application.
 */

// Images directory
export const IMG_PATH = '/img';

// Image category paths
export const COMPANY_LOGOS = `${IMG_PATH}/companies`;
export const PROFILE_IMAGES = `${IMG_PATH}/profiles`;
export const VENTURE_IMAGES = `${IMG_PATH}/ventures`;
export const COMMON_IMAGES = `${IMG_PATH}/common`;

/**
 * Gets appropriate image path for a company logo
 */
export function getCompanyLogoPath(filename: string): string {
  return `${COMPANY_LOGOS}/${filename}`;
}

/**
 * Gets appropriate image path for a profile image
 */
export function getProfileImagePath(filename: string): string {
  return `${PROFILE_IMAGES}/${filename}`;
}

/**
 * Gets appropriate image path for a venture image
 */
export function getVentureImagePath(filename: string): string {
  return `${VENTURE_IMAGES}/${filename}`;
}

/**
 * Gets appropriate path for a common image
 */
export function getCommonImagePath(filename: string): string {
  return `${COMMON_IMAGES}/${filename}`;
}