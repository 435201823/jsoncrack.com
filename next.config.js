// const withPWA = require("next-pwa");

// const pwaConfig = {
//   pwa: {
//     disable: true, // disable temp until issue #61 solved
//     dest: "public",
//     fallbacks: {
//       document: "/editor",
//     },
//   },
// };

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  exportTrailingSlash: true,
  exportPathMap: async () => ({
    "/": { page: "/" },
    "/editor": { page: "/Editor" },
  }),
  //...pwaConfig,
};

module.exports = nextConfig;
