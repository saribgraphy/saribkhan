import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keystatic's GitHub mode redirects local sign-in to 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  images: {
    // Nothing on the site is shown wider than ~620px, so 1600px covers sharp 2x screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
