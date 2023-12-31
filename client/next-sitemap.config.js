/** @type {import('next-sitemap').IConfig} */

const config = {
  siteUrl: process.env.NEXTAUTH_URL || "https://www.philoberry.com/",
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
        disallow: ["/login", "/admin", "/admin/**"],
      },
    ],
  },
};

module.exports = config;
