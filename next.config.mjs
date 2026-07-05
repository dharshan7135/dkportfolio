/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 80, 95, 100],
  },
  devIndicators: false,
};

export default nextConfig;
