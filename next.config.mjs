/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // এখানে স্লাশ (/) যোগ করা ভালো
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // ImgBB এর আসল ইমেজ হোস্ট
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgbb.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;