const fs = require('fs');
const pug = require('pug');

const h = pug.renderFile('./src/template/index.pug', {
  lang: 'ja',
  title: 'log.sugarshin.net',
  description: 'Blog of sugarshin'
});

['./build/index.html', './build/404.html'].forEach(file => {
  fs.writeFileSync(file, h, { encoding: 'utf8' });
});
