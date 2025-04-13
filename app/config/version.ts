/**
 * Application version information
 * 
 * This file provides version information for the application, allowing components
 * to display current version details when needed.
 */

import { readFileSync } from "fs";
import * as path from "path";

// Define the version info type
interface VersionInfo {
  version: string;
  buildDate: string;
  commitHash?: string;
  environment: string;
}

// Function to get version information asynchronously
export const getVersionInfo = async (): Promise<VersionInfo> => {
  try {
    // Try to read version info from the config file
    const configPath = path.resolve('./version-config.json');
    const fileData = readFileSync(configPath, 'utf8');
    const versionData = JSON.parse(fileData);
    
    return {
      version: versionData.version || '1.0.0',
      buildDate: versionData.buildDate || new Date().toISOString(),
      commitHash: versionData.commitHash,
      environment: process.env.NODE_ENV || 'development'
    };
  } catch (error) {
    // Return defaults if file can't be read
    return {
      version: '1.0.0',
      buildDate: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }
};

// Synchronous version for contexts where async isn't suitable
export const getVersionInfoSync = (): VersionInfo => {
  try {
    // Try to read version info from the config file
    const configPath = path.resolve('./version-config.json');
    const fileData = readFileSync(configPath, 'utf8');
    const versionData = JSON.parse(fileData);
    
    return {
      version: versionData.version || '1.0.0',
      buildDate: versionData.buildDate || new Date().toISOString(),
      commitHash: versionData.commitHash,
      environment: process.env.NODE_ENV || 'development'
    };
  } catch (error) {
    // Return defaults if file can't be read
    return {
      version: '1.0.0',
      buildDate: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }
};