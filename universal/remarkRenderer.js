const remark = require('remark');
const html = require('remark-html');
const highlightjs = require('remark-highlight.js');
const slug = require('remark-slug');
const yamlConfig = require('remark-yaml-config');

module.exports = remark()
  .use(html)
  .use(highlightjs)
  .use(slug)
  .use(yamlConfig);
