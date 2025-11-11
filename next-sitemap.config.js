/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tipngoal.com', // your live domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/404'], // optional, exclude error pages
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  transform: async (config, path) => {
    // Customize each URL if needed
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
