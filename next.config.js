/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "*",
      `${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
