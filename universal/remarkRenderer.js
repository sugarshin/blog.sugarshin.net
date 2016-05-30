const remark = require('remark');
const remarkHtml = require('remark-html');
const remarkHighlightjs = require('remark-highlight.js');
const remarkSlug = require('remark-slug');
const remarkYamlConfig = require('remark-yaml-config');

module.exports = remark()
  .use(remarkHtml)
  .use(remarkHighlightjs)
  .use(remarkSlug)
  .use(remarkYamlConfig);
