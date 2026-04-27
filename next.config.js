/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' removed — API routes require a server runtime
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
