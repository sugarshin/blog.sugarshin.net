const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const slug = require('remark-slug')
const toc = require('remark-toc')
const externalLinks = require('remark-external-links')

const basePlugins = [
  parse,
  externalLinks,
  frontmatter,
  slug,
  toc,
]

module.exports.basePlugins = basePlugins
