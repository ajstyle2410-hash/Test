const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Removed optimizeCss experimental flag
  experimental: {
    turbo: {
      loaders: {
        '.js': ['js'],
        '.jsx': ['jsx'],
        '.ts': ['ts'],
        '.tsx': ['tsx'],
      },
    },
  },
};

export default nextConfig;