/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const commonConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  // Configurazione per Tailwind CSS 4 e lightningcss su Vercel
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config, { isServer }) => {
    // Fix per lightningcss su Vercel
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-ca-cdn.eporner.com",
      },
      {
        protocol: "https",
        hostname: "ei.phncdn.com",
      },
      {
        protocol: "https",
        hostname: "ei-ph.rdtcdn.com",
      },
      {
        protocol: "https",
        hostname: "ei.rdtcdn.com",
      },
    ],
  },
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      ...commonConfig,
    };
  }

  return {
    ...defaultConfig,
    ...commonConfig,
    redirects: () => [
      {
        source: "/local",
        destination: "/",
        permanent: true,
      },
      {
        source: "/playground",
        destination: "/",
        permanent: true,
      },
    ],
  };
};
