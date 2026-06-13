import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    devIndicators: false,
    allowedDevOrigins: ['shudder-unturned-slapping.ngrok-free.dev', '*.ngrok-free.dev'],
};

export default nextConfig;
