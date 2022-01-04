module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  i18n: {
    locales: ["en", "ro"],
    defaultLocale: "en",
    localeDetection: true,
    domains: [
      {
        domain: "example.en",
        defaultLocale: "en",
      },
      {
        domain: "example.ro",
        defaultLocale: "ro",
      },
    ],
  },
  images: {
    domains: ["cdn.pixabay.com", "firebasestorage.googleapis.com"],
    minimumCacheTTL: 180,
  },
};
