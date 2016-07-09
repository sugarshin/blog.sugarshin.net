const { writeFileSync } = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const mkdirp = require('mkdirp');
const yaml = require('js-yaml');
const moment = require('moment');
const { protocol, domain } = require('../config/settings');

const name = argv.n || argv.name;

if (!name) {
  throw new Error('`npm run na -- -n title` or `npm run na -- --name title`');
}

const origin = `${protocol}//${domain}`;
const HR = '---';
const d = moment();
const imagePath = `assets/images/${d.format('YYYY/MM/DD')}/${name}`;
const ogImageContent = `${origin}/${imagePath}/main.png`;
const ogp = yaml.safeDump({
  ogp: {
    og: {
      image: {
        content: ogImageContent
      }
    }
  }
}, { lineWidth: -1 });
const header = [
  HR,
  'title: Article title here',
  `date: ${d.format('YYYY-MM-DD HH:mm')}`,
  'public: true',
  'tags:',
  ogp.replace(/'/g, '') // Remove quote for src string
     .replace(/\n$/, ''),
  HR,
  '',
  `![Main](${ogImageContent.replace(origin, '')})`,
  '',
  HR,
  ''
].join('\n');

writeFileSync(`articles/${d.format('YYYY-MM-DD')}_${name}.md`, header);
console.log(`Success write new article file !`);

const imageDir = `articles/${imagePath}`;
mkdirp.sync(imageDir);
console.log(`Created ${imageDir} !`);
