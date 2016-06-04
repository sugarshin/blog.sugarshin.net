const fs = require('fs');
const Feed = require('feed');
const {
  domain, protocol, siteName, copyright, description, authorName, authorEmail, authorURL
} = require('../config/settings');

const OUT_DIR = 'build';
const articlesJSON = fs.readFileSync(`./${OUT_DIR}/_articles/index.json`, { encoding: 'utf8' });
const articles = JSON.parse(articlesJSON);

const author = {
  name: authorName,
  email: authorEmail,
  link: authorURL
};
const HR = '---';

const link = `${protocol}${domain}`;
const feed = new Feed({
  id: link,
  title: siteName,
  description,
  link,
  copyright,
  author
});

articles.forEach(article => {
  const md = fs.readFileSync(`./articles/${article.date.split(' ')[0]}_${article.url}.md`, { encoding: 'utf8' });
  const rows = md.split('\n');
  const [firstLineIndex, secondLinesIndex] =
    rows.reduce((result, row, i) => row === HR ? [...result, i] : result, []);

  const title = article.title;
  const link = `${protocol}${domain}/${article.date.split(' ')[0].replace(/-/g, '/')}/${article.url}/`;
  const description = rows.slice(secondLinesIndex + 1, secondLinesIndex + 5).join('');
  const date = new Date(article.date);

  feed.addItem({ title, link, description, author: [author], date });
});

fs.writeFileSync(`${OUT_DIR}/feed.xml`, feed.render('atom-1.0'), { encoding: 'utf8' });
console.log('Success feed.xml !');
fs.writeFileSync(`${OUT_DIR}/rss.xml`, feed.render('rss-2.0'), { encoding: 'utf8' });
console.log('Success rss.xml !');
