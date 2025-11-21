import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "vumbnail.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.dailymotion.com",
        pathname: "/thumbnail/**",
      },
    ],
  },
};

export default nextConfig;
