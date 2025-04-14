// Utility to provide version information
// Using a direct fetch approach instead of import to avoid Turbopack HMR issues

// Default values in case fetch fails
const defaultVersion = {
  version: "4.5.0",
  lastUpdated: "2025-03-29",
  name: "Portfolio Website"
};

export const getVersionInfo = async () => {
  try {
    // Fetch version.json at runtime instead of importing it
    const response = await fetch('/version.json');
    if (!response.ok) {
      throw new Error('Failed to fetch version info');
    }
    const versionData = await response.json();
    
    return {
      version: versionData.version,
      lastUpdated: versionData.lastUpdated,
      name: versionData.name,
    };
  } catch (error) {
    console.warn('Error loading version data, using default values:', error);
    return defaultVersion;
  }
};

// For backward compatibility, provide a synchronous version with defaults
export const getVersionInfoSync = () => {
  return defaultVersion;
};

export default getVersionInfoSync;