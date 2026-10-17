import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mui/system/useMediaQuery': require.resolve('./src/stubs/mui-system-useMediaQuery.js'),
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
    ],
  },
}

export default nextConfig
