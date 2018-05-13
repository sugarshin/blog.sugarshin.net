const {
  siteName,
  description,
  authorName,
  authorGitHubUserName,
  authorURL,
  protocol,
  domain,
} = require('../settings')

const configuration = {
  appName: siteName,
  appDescription: description,
  developerName: `${authorGitHubUserName} | ${authorName}`,
  developerURL: authorURL,
  background: '#fff',
  path: '/',
  url: `${protocol}//${domain}/open-graph.png`,
  display: 'standalone',
  orientation: 'portrait',
  version: '1.0', // TODO
  logging: true,
  online: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: true,
    twitter: true,
    windows: true,
    yandex: false,
  },
}

module.exports = {
  logo: './src/images/p.jpg',
  prefix: '',
  favicons: configuration,
}
