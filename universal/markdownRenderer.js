const unified = require('unified');
const parse = require('remark-parse');
const slug = require('remark-slug');
const toc = require('remark-toc');
const yamlConfig = require('remark-yaml-config');
const remarkToRehype = require('remark-rehype');
const highlight = require('rehype-highlight');
const stringify = require('rehype-stringify');

module.exports = unified()
  .use(parse)
  .use(slug)
  .use(toc)
  .use(yamlConfig)
  .use(remarkToRehype)
  .use(highlight)
  .use(stringify);
