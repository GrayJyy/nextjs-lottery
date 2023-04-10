/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
    reactRoot: true,
  },
}

module.exports = nextConfig
