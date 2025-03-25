// Utility to import and provide version information from version.json
import versionData from '../../version.json';

export const getVersionInfo = () => {
  return {
    version: versionData.version,
    lastUpdated: versionData.lastUpdated,
    name: versionData.name,
  };
};

export default getVersionInfo;