/* eslint-disable no-console */

const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const favicons = require('favicons')
const { protocol, domain, siteName, description, authorName, authorURL, authorGitHubUserName } = require('../config/settings')

const url = argv.u || argv.url || `${protocol}//${domain}/open-graph.png`
const source = argv.s || argv.source || './src/images/p.jpg'

const outDir = 'build'
const configuration = {
  appName: siteName,
  appDescription: description,
  developerName: `${authorGitHubUserName} | ${authorName}`,
  developerURL: authorURL,
  background: '#fff',
  path: '/',
  url,
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

favicons(source, configuration, (err, res) => {
  if (err) throw new Error(err)
  res.images.forEach(({ name, contents }) => fs.writeFileSync(`./${outDir}/${name}`, contents))
  console.log('Success create favicons contents !')
  fs.writeFileSync(`./favicons.html.tmp`, JSON.stringify(res.html), { encoding: 'utf8' })
  console.log('Success create favicons.html.tmp !')
})
