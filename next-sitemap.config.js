/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tipngoal.com',  // Your domain
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/404'], // optional
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/predictions'),
    await config.transform(config, '/blog'),
  ],
};
