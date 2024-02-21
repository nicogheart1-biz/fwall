/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const commonConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
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
        source: "/playground",
        destination: "/",
        permanent: true,
      },
    ],
  };
};
