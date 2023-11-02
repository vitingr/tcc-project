/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/Tcc',
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
    }
}

module.exports = nextConfig