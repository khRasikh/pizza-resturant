/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    async rewrites() {
        return [
          {
            source: '/de',
            destination: '/de/customers',
          },
          {
            source: '/',
            destination: '/customers',
          }         
        ]
        }
}

module.exports = nextConfig
