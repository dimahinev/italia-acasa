import type { NextConfig } from 'next';
import { startWatcher } from './scripts/watcher';

if (process.env.NODE_ENV === 'development') {
    if (!(globalThis as any).__productWatcherStarted) {
        (globalThis as any).__productWatcherStarted = true;
        startWatcher();
    }
}

const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.tina.io',
                pathname: '/**',
            },
        ],
    },
    serverExternalPackages: ['sharp'],
    devIndicators: false,
    allowedDevOrigins: ['shudder-unturned-slapping.ngrok-free.dev', '*.ngrok-free.dev'],
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html',
            },
        ];
    },
};

export default nextConfig;
