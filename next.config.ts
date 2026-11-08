import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    async redirects() {
        return [
            // /CV has no content of its own, so send people and crawlers to the English CV.
            // Redirect sources match case-insensitively, so this also covers /cv.
            { source: '/CV', destination: '/CV/en', permanent: false },
        ]
    },
}

export default nextConfig
