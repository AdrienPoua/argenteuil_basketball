module.exports = {
  siteUrl: 'https://argenteuilbasketball.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],
  },
};
