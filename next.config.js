/**
 * next.config.js
 * INCANTO Tea Store
 *
 * Created by Nguyen Hai Ninh on 2025-12-05.
 * Copyright © 2025 Nguyen Hai Ninh. All rights reserved.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Disable source maps in production to protect code
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Minimize and obfuscate output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Hide Next.js version header
  poweredByHeader: false,
};

module.exports = nextConfig;
