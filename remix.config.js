/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  serverModuleFormat: "esm", // Changed to match package.json type: module
  serverDependenciesToBundle: [
    /^(?!node:)/,  // Bundle everything except node: built-ins
  ],
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true, 
    v3_relativeSplatPath: true,
    v3_singleFetch: true,
    v3_throwAbortReason: true
  },
  // Point to configuration files in their new locations
  tailwind: {
    config: "./config/tailwind.config.cjs",
    postcssConfig: "./config/postcss.config.cjs",
  }
};