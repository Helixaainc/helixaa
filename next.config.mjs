/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
        unoptimized: true,
    },
    transpilePackages: ['chart.js'],
    
};

export default nextConfig;
