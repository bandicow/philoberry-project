/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      `${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    ],
  },

  reactStrictMode: true,

  // App router is available by default now, `experimental.appDir` option can be safely removed.
  // experimental: { appDir: true },

  // babel 대신 swc 사용 , experimental 안에서 사용 : 실험적이라 문제있을수 있다.
  experimental: { swcMinify: true },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
