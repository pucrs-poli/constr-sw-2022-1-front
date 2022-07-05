/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLASSES_API_BASE_URL: process.env.CLASSES_API_BASE_URL,
    DISCIPLINES_API_BASE_URL: process.env.DISCIPLINES_API_BASE_URL
  }
}

module.exports = nextConfig
