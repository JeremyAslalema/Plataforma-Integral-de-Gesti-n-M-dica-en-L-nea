import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // ✅ CORREGIDO: Migrado a Next.js 16
  serverExternalPackages: ['@prisma/client'],
  
  webpack: (config, { isServer, webpack }) => {
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
        })
      );

      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
    }
    return config;
  },

  // ✅ AGREGAR: Configuración para Turbopack
  turbopack: {},

  // ❌ ELIMINADO: experimental.serverComponentsExternalPackages (obsoleto en Next.js 16)
};

export default nextConfig;