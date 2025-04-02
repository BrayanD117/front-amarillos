import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
        {
            source: '/admin/vehiculos',
            destination: '/vehiculos',
        },
        // {
        //     source: '/scrutiny/reports',
        //     destination: '/private/reports',
        // },
    ];
  }
};

export default nextConfig;
