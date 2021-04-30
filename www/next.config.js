module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: `@svgr/webpack`,
          options: {
            memo: true,
          },
        },
      ],
    });

    return config;
  },
  poweredByHeader: false,
  reactStrictMode: true,
};
