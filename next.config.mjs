/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

export const basePath = isProd ? '/gauntlet-portfolio' : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath + '/',
};

export default nextConfig;