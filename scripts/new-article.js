const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');
const writeFilePromisify = require('./helpers/writeFilePromisify');

const name = argv.n || argv.name;

if (!name) {
  throw new Error('`npm run na -- -n title` or `npm run na -- --name title`');
}

const d = moment();
const HR = '---';
const head = [
  HR,
  `title:`,
  `date: ${d.format('YYYY-MM-DD HH:mm')}`,
  'public: true',
  'tags:',
  HR
].join('\n');

writeFilePromisify(`articles/${d.format('YYYY-MM-DD')}_${name}.md`, head);
