/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 1,
  exclude: ["/login", "/admin/**"],
  robotsTxtOptions: {
    additionalSitemaps: [`${process.env.NEXTAUTH_URL}/server-sitemap.xml`],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/admin"],
      },
    ],
  },
};

module.exports = config;
