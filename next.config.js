/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.filestackcontent.com'],
  },
  env: {
    NEXT_PUBLIC_FILESTACK_API_KEY: process.env.NEXT_PUBLIC_FILESTACK_API_KEY || 'ARyh1Aj27R5OcHOUc5oIXz',
  },
}

module.exports = nextConfig