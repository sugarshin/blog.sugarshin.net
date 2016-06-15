// Mock GitHub API, GET: /contents
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const mkdirp = require('mkdirp');
const btoa = require('btoa');

const ARTICLES_DIR = './articles';
const OUT_DIR = argv.o || argv.out || './build-dev/contents/articles';

const filenames = fs.readdirSync(ARTICLES_DIR);
mkdirp.sync(OUT_DIR);

filenames.filter(name => /\.md$/.test(name)).forEach(name => {
  const rawContent = fs.readFileSync(`${ARTICLES_DIR}/${name}`, { encoding: 'utf8' });
  const content = btoa(unescape(encodeURIComponent(rawContent)));
  fs.writeFileSync(`${OUT_DIR}/${name}`, JSON.stringify({ name, content }), { encoding: 'utf8' });
  console.log(`Success write file ${OUT_DIR}/${name} !`);
});
