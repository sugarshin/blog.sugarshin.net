import merge from 'lodash/merge'
import unified from 'unified'
import remarkReact from 'remark-react'
import remarkReactLowlight from 'remark-react-lowlight'
import sanitizeGitHubSchema from 'hast-util-sanitize/lib/github.json'
import js from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import coffeescript from 'highlight.js/lib/languages/coffeescript'
import yaml from 'highlight.js/lib/languages/yaml'
import typescript from 'highlight.js/lib/languages/typescript'
import { basePlugins } from '../../../markdown'
import { Link } from './Link'

const sanitize = merge(sanitizeGitHubSchema, { clobberPrefix: '', attributes: { code: ['className'] } })
const reactRenderer = unified()
  .use(basePlugins)
  .use(remarkReact, {
    sanitize,
    remarkReactComponents: {
      code: remarkReactLowlight({
        js, json, bash, coffeescript, yaml, typescript,
      }),
      a: Link,
    },
  })

export function renderMarkdown(value) {
  return reactRenderer.processSync(value).result
}
