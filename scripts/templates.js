const fs = require('fs');
const pug = require('pug');
const mkdirp = require('mkdirp');
const uniq = require('lodash/uniq');
const remarkRenderer = require('../universal/remarkRenderer');
const argv = require('minimist')(process.argv.slice(2));
const production = process.env.NODE_ENV === 'production';
const outDir = argv.o || argv.out || 'build'; // TODO
const src = './src/template/index.pug';
const articlesJSON = fs.readFileSync(`./${outDir}/_articles/index.json`, { encoding: 'utf8' });
const articles = JSON.parse(articlesJSON);
const baseOpts = {
  lang: 'ja',
  title: 'log.sugarshin.net',
  description: 'sugarshin\'s blog'
};

// Articles
articles.forEach(article => {
  const md = fs.readFileSync(`./articles/${article.date.split(' ')[0]}_${article.url}.md`, { encoding: 'utf8' });
  const content = remarkRenderer.process(md);
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { content }));
  const [year, month, day] = article.date.split(' ')[0].split('-');
  const path = `./${outDir}/${year}/${month}/${day}/${article.url}`;
  mkdirp.sync(path);
  fs.writeFileSync(`${path}/index.html`, html, { encoding: 'utf8' });
});

// Archives
const dates = articles.reduce((result, a) => {
  const d = a.date.split(' ')[0].replace(/\-\d\d$/, '');
  return result.includes(d) ? result : [...result, d];
}, []);
dates.forEach(date => {
  const html = pug.renderFile(src, baseOpts);
  const path = `./${outDir}/archives/${date}`;
  mkdirp.sync(path);
  fs.writeFileSync(`${path}/index.html`, html, { encoding: 'utf8' });
});

// Tags
const tags = articles.reduce((result, a) => {
  return uniq([...result, ...a.tags.map(t => t.replace(/\s/, '_'))]);
}, []);
tags.forEach(tag => {
  const html = pug.renderFile(src, baseOpts);
  const path = `./${outDir}/tags/${tag}`;
  mkdirp.sync(path);
  fs.writeFileSync(`${path}/index.html`, html, { encoding: 'utf8' });
});

// index.html
if (production) {
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { top: true }));
  const path = `./${outDir}`;
  fs.writeFileSync(`${path}/index.html`, html, { encoding: 'utf8' });
}
