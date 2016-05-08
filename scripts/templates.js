const pug = require('pug');

const h = pug.renderFile('./src/template/index.pug', {
  title: 'test',
  lang: 'ja'
});
console.log(h);
