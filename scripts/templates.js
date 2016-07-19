const fs = require('fs');
const pug = require('pug');
const mkdirp = require('mkdirp');
const yaml = require('js-yaml');
const uniq = require('lodash/uniq');
const markdownRenderer = require('../universal/markdownRenderer');
const removeMarkdown = require('remove-markdown');
const argv = require('minimist')(process.argv.slice(2));
const sliceYAMLConfig = require('../universal/sliceYAMLConfig');
const removeYAMLConfig = require('../universal/removeYAMLConfig');
const { siteName, description, authorName } = require('../config/settings');

const outDir = argv.o || argv.out || 'build'; // TODO
const src = './src/template/index.pug';
const articlesJSON = fs.readFileSync(`./${outDir}/index.json`, { encoding: 'utf8' });
const articles = JSON.parse(articlesJSON);
const faviconsHTML = JSON.parse(fs.readFileSync('./favicons.html.tmp', { encoding: 'utf8' }));
const baseOpts = {
  lang: 'ja',
  title: siteName,
  author: authorName,
  description,
  favicons: faviconsHTML
};

// root
{
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { top: true }));
  fs.writeFileSync(`./${outDir}/index.html`, html, { encoding: 'utf8' });
}

// Articles
articles.forEach(article => {
  const md = fs.readFileSync(`./articles/${article.date.split(' ')[0]}_${article.url}.md`, { encoding: 'utf8' });
  const content = markdownRenderer.process(md).contents;
  const yamlConfig = yaml.safeLoad(sliceYAMLConfig(md));
  const html = pug.renderFile(src, Object.assign({}, baseOpts, {
    content,
    title: `${yamlConfig.title} | ${siteName}`,
    description: removeMarkdown(removeYAMLConfig(md)).replace(/\n/g, '').slice(0, 140),
    favicons: faviconsHTML.map(h =>
      /twitter\:image|og\:image/.test(h) ?
      h.replace(/content=".+"/, `content="${yamlConfig.ogp.og.image.src}"`) : h
    )
  }));
  const [year, month, day] = article.date.split(' ')[0].split('-');
  const url = `/${year}/${month}/${day}/${article.url}/`
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`);
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' });
});

// Archives
const dates = articles.reduce((result, a) => {
  const d = a.date.split(' ')[0].replace(/\-\d\d$/, '');
  return result.includes(d) ? result : [...result, d];
}, []);
dates.forEach(date => {
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { description: `Archives | ${date} | ${baseOpts.description}` }));
  const url = `/archives/${date}/`;
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`);
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' });
});

// Tags
const tags = articles.reduce((result, a) => {
  return uniq([...result, ...a.tags.map(t => t.replace(/\s/, '_'))]);
}, []);
tags.forEach(tag => {
  const html = pug.renderFile(src, Object.assign({}, baseOpts, { description: `Tags | ${tag} | ${baseOpts.description}` }));
  const url = `/tags/${tag}/`;
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`);
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' });
});

console.log('Success templates !');
