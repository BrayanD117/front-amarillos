import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
        {
            source: '/admin/vehiculos',
            destination: '/vehiculos',
        },
        {
            source: '/admin/usuarios',
            destination: '/usuarios',
        },
    ];
  }
};

export default nextConfig;