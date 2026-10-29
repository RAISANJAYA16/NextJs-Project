import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  turbopack: {
    root: projectRoot,
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: "readymadeui.com",
        pathname: "/images/**",
      },
      {
        protocol: 'https',
        hostname: "cdn.flyonui.com",
        pathname: "/fy-assets/**",
      },
      {
        protocol: 'https',
        hostname: "flowbite.s3.amazonaws.com",
        pathname: "/blocks/e-commerce/**",
      },
    ],
  },
};

export default nextConfig;
