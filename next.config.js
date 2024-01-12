/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    compiler: {
      removeConsole:
        process.env.NODE_ENV === "production"  ? { exclude: ["error", "info"] } : false,
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
