const { writeFileSync } = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const mkdirp = require('mkdirp');
const yaml = require('js-yaml');
const moment = require('moment');

const name = argv.n || argv.name;

if (!name) {
  throw new Error('`npm run na -- -n title` or `npm run na -- --name title`');
}

const d = moment();
const imagePath = `assets/images/${d.format('YYYY/MM/DD')}/${name}`;
const HR = '---';
const ogp = yaml.safeDump({
  ogp: {
    og: {
      image: {
        src: `https://log.sugarshin.net/${imagePath}/main.xxx`
      }
    }
  }
});
const head = [
  HR,
  'title: Article title here',
  `date: ${d.format('YYYY-MM-DD HH:mm')}`,
  'public: true',
  'tags:',
  ogp,
  HR
].join('\n');

writeFileSync(`articles/${d.format('YYYY-MM-DD')}_${name}.md`, head);
console.log(`Success write new article file !`);

const imageDir = `articles/${imagePath}`;
mkdirp.sync(imageDir);
console.log(`Created ${imageDir} !`);
