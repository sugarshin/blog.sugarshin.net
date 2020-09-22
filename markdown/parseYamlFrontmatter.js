const unified = require('unified')
const parse = require('remark-parse')
const stringify = require('remark-stringify')
const frontmatter = require('remark-frontmatter')
const extract = require('remark-extract-frontmatter')
const yaml = require('js-yaml')

const renderer = unified()
  .use(parse)
  .use(stringify)
  .use(frontmatter)
  .use(extract, { yaml: yaml.safeLoad })

module.exports = function parseYamlFrontmatter(markdown) {
  return renderer.processSync(markdown).data
}
