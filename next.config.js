/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
    headers: () => [
        {
          source: '/usuario/feed',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store',
            },
          ],
        },
        {
            source: '/api/posts',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store',
              },
            ],
          },
      ],
}

module.exports = nextConfig