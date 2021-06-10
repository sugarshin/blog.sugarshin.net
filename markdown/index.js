const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const slug = require('remark-slug')
const toc = require('remark-toc')
const externalLinks = require('remark-external-links')
const gfm = require('remark-gfm')

const basePlugins = [
  parse,
  externalLinks,
  gfm,
  frontmatter,
  slug,
  [toc, { heading: '目次' }],
]

module.exports.basePlugins = basePlugins
