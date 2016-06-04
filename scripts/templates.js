const fs = require('fs');
const pug = require('pug');
const Sitemap = require('sitemap');
const mkdirp = require('mkdirp');
const uniq = require('lodash/uniq');
const remarkRenderer = require('../universal/remarkRenderer');
const argv = require('minimist')(process.argv.slice(2));
const { protocol, domain, siteName, description } = require('../config/settings');

const production = process.env.NODE_ENV === 'production';
const outDir = argv.o || argv.out || 'build'; // TODO
const src = './src/template/index.pug';
const articlesJSON = fs.readFileSync(`./${outDir}/_articles/index.json`, { encoding: 'utf8' });
const articles = JSON.parse(articlesJSON);
const baseOpts = {
  lang: 'ja',
  title: siteName,
  description
};

let sitemap = null;
if (production) {
  sitemap = Sitemap.createSitemap({
    hostname: `${protocol}${domain}`,
    cacheTime: 600000
  });
}

// index.html
if (production) {
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { top: true }));
  fs.writeFileSync(`./${outDir}/index.html`, html, { encoding: 'utf8' });

  sitemap && sitemap.add({ url: `${protocol}${domain}/`, priority: 1 });
}

// Articles
articles.forEach(article => {
  const md = fs.readFileSync(`./articles/${article.date.split(' ')[0]}_${article.url}.md`, { encoding: 'utf8' });
  const content = remarkRenderer.process(md);
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { content }));
  const [year, month, day] = article.date.split(' ')[0].split('-');
  const url = `/${year}/${month}/${day}/${article.url}/`
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`);
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' });

  sitemap && sitemap.add({ url, priority: 0.9 });
});

// Archives
const dates = articles.reduce((result, a) => {
  const d = a.date.split(' ')[0].replace(/\-\d\d$/, '');
  return result.includes(d) ? result : [...result, d];
}, []);
dates.forEach(date => {
  const html = pug.renderFile(src, baseOpts);
  const url = `/archives/${date}/`;
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`);
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' });

  sitemap && sitemap.add({ url, priority: 0.8 });
});

// Tags
const tags = articles.reduce((result, a) => {
  return uniq([...result, ...a.tags.map(t => t.replace(/\s/, '_'))]);
}, []);
tags.forEach(tag => {
  const html = pug.renderFile(src, baseOpts);
  const url = `/tags/${tag}/`;
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`);
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' });

  sitemap && sitemap.add({ url, priority: 0.8 });
});

console.log('Success templates !');

// Sitemap
if (production) {
  fs.writeFileSync(`./${outDir}/sitemap.xml`, sitemap.toString(), { encoding: 'utf8' });
  console.log('Success sitemap.xml !');
}
