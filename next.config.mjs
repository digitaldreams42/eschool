/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
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
