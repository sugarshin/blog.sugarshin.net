const merge = require('lodash/merge')
const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const slug = require('remark-slug')
const toc = require('remark-toc')
const yamlConfig = require('remark-yaml-config')
const remarkToRehype = require('remark-rehype')
const reactRenderer = require('remark-react')
const reactLowlight = require('remark-react-lowlight').default
const externalLinks = require('remark-external-links')
const stringify = require('rehype-stringify')
const sanitizeGitHubSchema = require('hast-util-sanitize/lib/github.json')
const js = require('highlight.js/lib/languages/javascript')
const bash = require('highlight.js/lib/languages/bash')
const json = require('highlight.js/lib/languages/json')
const coffeescript = require('highlight.js/lib/languages/coffeescript')
const yaml = require('highlight.js/lib/languages/yaml')
const typescript = require('highlight.js/lib/languages/typescript')
const Link = require('./Link')

const basePlugins = [
  parse,
  externalLinks,
  frontmatter,
  yamlConfig,
  slug,
  toc,
]

const sanitize = merge(sanitizeGitHubSchema, { clobberPrefix: '', attributes: { code: ['className'] } })
const reactComponentRenderer = unified()
  .use(basePlugins)
  .use(reactRenderer, {
    sanitize,
    remarkReactComponents: {
      code: reactLowlight({
        js, json, bash, coffeescript, yaml, typescript,
      }),
      a: Link,
    },
  })

const renderer = unified()
  .use(basePlugins)
  .use(remarkToRehype)
  .use(stringify)

module.exports = {
  toReact: value => reactComponentRenderer.processSync(value).contents,
  toString: value => renderer.processSync(value).toString(),
}
