/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/gauntlet-portfolio',
  assetPrefix: '/gauntlet-portfolio',
};

export default nextConfig;