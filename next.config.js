/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ]
  },
  reactStrictMode: false,

  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;