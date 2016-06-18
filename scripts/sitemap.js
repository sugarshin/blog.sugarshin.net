const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const Sitemap = require('sitemap');
const uniq = require('lodash/uniq');
const { protocol, domain } = require('../config/settings');

const outDir = argv.o || argv.out || 'build'; // TODO
const articlesJSON = fs.readFileSync(`./${outDir}/index.json`, { encoding: 'utf8' });
const articles = JSON.parse(articlesJSON);

const sitemap = Sitemap.createSitemap({
  hostname: `${protocol}//${domain}`,
  cacheTime: 600000
});

// root
sitemap.add({ url: `${protocol}//${domain}/`, priority: 1 });

// Articles
articles.forEach(article => {
  const [year, month, day] = article.date.split(' ')[0].split('-');
  const url = `/${year}/${month}/${day}/${article.url}/`
  sitemap.add({ url, priority: 0.9 });
});

// Archives
{
  const dates = articles.reduce((result, a) => {
    const d = a.date.split(' ')[0].replace(/\-\d\d$/, '');
    return result.includes(d) ? result : [...result, d];
  }, []);
  dates.forEach(date => {
    const url = `/archives/${date}/`;
    sitemap.add({ url, priority: 0.8 });
  });
}

// Tags
{
  const tags = articles.reduce((result, a) => {
    return uniq([...result, ...a.tags.map(t => t.replace(/\s/, '_'))]);
  }, []);
  tags.forEach(tag => {
    const url = `/tags/${tag}/`;
    sitemap.add({ url, priority: 0.8 });
  });
}

fs.writeFileSync(`./${outDir}/sitemap.xml`, sitemap.toString(), { encoding: 'utf8' });
console.log('Success create sitemap.xml !');
