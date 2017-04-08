const fs = require('fs');
const Feed = require('feed');
const removeMarkdown = require('remove-markdown');
const {
  domain, protocol, siteName, copyright, description, authorName, authorEmail, authorURL
} = require('../config/settings');

const OUT_DIR = 'build';
const articlesJSON = fs.readFileSync(`./${OUT_DIR}/index.json`, { encoding: 'utf8' });
const articles = JSON.parse(articlesJSON);

const author = {
  name: authorName,
  email: authorEmail,
  link: authorURL
};
const HR = '---';

const link = `${protocol}//${domain}`;
const feed = new Feed({
  id: link,
  title: siteName,
  description,
  link,
  copyright,
  author,
  updated: new Date()
});

articles.forEach(article => {
  const md = fs.readFileSync(`./articles/${article.date.split(' ')[0]}_${article.url}.md`, { encoding: 'utf8' });
  const rows = md.split('\n');
  const lineIndexes = rows.reduce((result, row, i) => row === HR ? [...result, i] : result, []);

  const title = article.title;
  const link = `${protocol}//${domain}/${article.date.split(' ')[0].replace(/-/g, '/')}/${article.url}/`;
  const description = removeMarkdown(rows.slice(lineIndexes[1] + 2, lineIndexes[1] + 10).join('\n')).replace(/\n/g, '');
  const date = new Date(article.date);

  feed.addItem({ title, link, description, author: [author], date });
});

fs.writeFileSync(`${OUT_DIR}/feed.xml`, feed.atom1(), { encoding: 'utf8' });
console.log('Success feed.xml !');
fs.writeFileSync(`${OUT_DIR}/rss.xml`, feed.rss2(), { encoding: 'utf8' });
console.log('Success rss.xml !');
