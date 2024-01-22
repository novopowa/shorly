/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: ['/app/types/database.ts']
   },
}

module.exports = nextConfig
