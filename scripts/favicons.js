const fs = require('fs');
const favicons = require('favicons');
const { siteName, description, authorName, authorURL } = require('../config/settings');

const outDir = 'build';
const source = './src/images/p.jpg';
const configuration = {
  appName: siteName,
  appDescription: description,
  developerName: authorName,
  developerURL: authorURL,
  background: '#fff',
  path: '/',
  url: '/',
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
    yandex: false
  }
};

favicons(source, configuration, (err, res) => {
  if (err) throw new Error(err);
  res.images.forEach(({ name, contents }) => fs.writeFileSync(`./${outDir}/${name}`, contents));
  console.log('Success create favicons contents !');
  fs.writeFileSync(`./favicons.html.tmp`, JSON.stringify(res.html), { encoding: 'utf8' });
  console.log('Success create favicons.html.tmp !');
});
