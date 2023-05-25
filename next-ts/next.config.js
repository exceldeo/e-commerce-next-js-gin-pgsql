/** @type {import('next').NextConfig} */
const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${hostname}`, 'w7.pngwing.com'],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
