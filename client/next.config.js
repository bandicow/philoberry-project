/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      `${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    ],
  },
  reactStrictMode: true,
  experimental: { appDir: true, swcMinify: true },
  // babel 대신 swc 사용 , experimental 안에서 사용 : 실험적이라 문제있을수 있다.

  env: {
    NEXT_PUBLIC_BUILDING_IMAGE: process.env.NEXT_PUBLIC_BUILDING_IMAGE,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
