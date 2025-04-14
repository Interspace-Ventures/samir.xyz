/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // Define the public asset directory
  publicPath: "/build/",
  // Define where your build files should be placed
  assetsBuildDirectory: "public/build",
  // Define the directory for your server build
  serverBuildPath: "build/index.js",
  // Configure how Tailwind integrates with Remix
  tailwind: true,
  postcss: true,
  // Opt into v3 features for React Router v7 compatibility
  future: {
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    v3_relativeSplatPath: true,
    v3_singleFetch: true,
    v3_throwAbortReason: true,
  },
};