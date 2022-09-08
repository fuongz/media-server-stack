/** @type {import('next').NextConfig} */
const imgDomains = process.env.IMAGE_DOMAINS ? JSON.parse(process.env.IMAGE_DOMAINS) : []

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: imgDomains,
  },
}

module.exports = nextConfig
