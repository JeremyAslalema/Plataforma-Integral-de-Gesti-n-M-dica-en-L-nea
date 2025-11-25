/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // COMENTA ESTA LÍNEA TEMPORALMENTE
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

module.exports = nextConfig