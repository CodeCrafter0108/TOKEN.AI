import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/_next/image', // Headers to image path only
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=86400, immutable', // Cache for 1 day
  //         },
  //       ],
  //     },
  //   ];
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    NEXT_PUBLIC_WALLET_CONNECT_API_KEY: process.env.NEXT_PUBLIC_NEXT_PUBLIC_WALLET_CONNECT_API_KEY,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      },
    },

  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*'
      },
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};

export default nextConfig;
