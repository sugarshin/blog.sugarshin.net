const fs = require('fs')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const yaml = require('js-yaml')
const { uniq } = require('lodash')
const removeMarkdown = require('remove-markdown')
const getBaseHtmlPluginConfig = require('./getBaseHtmlPluginConfig')
const { buildDir } = require('../dir')
const { googleSiteVerificationKey } = require('../settings')
const markdownRenderer = require('../../universal/markdownRenderer')
const removeYAMLConfig = require('../../universal/removeYAMLConfig')
const sliceYAMLConfig = require('../../universal/sliceYAMLConfig')

const { assign } = Object

const articlesJSON = fs.readFileSync(
  path.resolve(process.cwd(), buildDir, 'index.json'),
  { encoding: 'utf8' }
)
const articles = JSON.parse(articlesJSON)

const getArticleSrcPath = article => {
  const date = article.date.split(' ')[0]
  return `${date}_${article.url}`
}
const getArticlePublicPath = article => {
  const [year, month, day] = article.date.split(' ')[0].split('-')
  return `/${year}/${month}/${day}/${article.url}/`
}

module.exports = ({ segmentWriteKey }) => {
  const baseHtmlPluginConfig = getBaseHtmlPluginConfig({ segmentWriteKey })
  const baseConfig = assign(
    baseHtmlPluginConfig,
    {
      type: 'article',
      ogImageURL: `${baseHtmlPluginConfig.url}/assets/images/common/open-graph.jpg`,
    }
  )

  const plugins = []

  // Root
  {
    const content = markdownRenderer.toString(
      articles.map(a => {
        const url = `${baseConfig.url}${getArticlePublicPath(a)}`
        return `- [${a.title}](${url})`
      }).join('\n')
    )
    const config = assign({}, baseConfig, {
      type: 'website',
      content,
      googleSiteVerificationKey,
    })
    plugins.push(
      new HtmlPlugin(config)
    )
  }

  // Articles
  articles.forEach(article => {
    const path = getArticleSrcPath(article)
    const md = fs.readFileSync(`./articles/${path}.md`, { encoding: 'utf8' })
    const content = markdownRenderer.toString(md)
    const yamlConfig = yaml.safeLoad(sliceYAMLConfig(md))
    const url = getArticlePublicPath(article)
    const config = assign({}, baseConfig, {
      content,
      title: `${yamlConfig.title} | ${baseConfig.siteName}`,
      description: removeMarkdown(removeYAMLConfig(md)).replace(/\n/g, '').slice(0, 140),
      url: `${baseConfig.url}${url}`, // TODO: url must be included in yaml config
      ogImageURL: yamlConfig.ogp.og.image.src,
    })
    plugins.push(
      new HtmlPlugin(
        assign(config, { filename: `${url.replace(/^\//, '')}index.html` })
      )
    )
  })

  // Archives
  const dates = articles.reduce((result, a) => {
    const d = a.date.split(' ')[0].replace(/-\d\d$/, '')
    return result.includes(d) ? result : [...result, d]
  }, [])
  dates.forEach(date => {
    const publicPath = `/archives/${date}/`
    const url = `${baseConfig.url}${publicPath}`
    const config = assign({}, baseConfig, {
      description: `Archives | ${date} | ${baseConfig.description}`,
      title: `Archives | ${date} | ${baseConfig.description}`,
      url,
    })
    plugins.push(
      new HtmlPlugin(
        assign(config, { filename: `${publicPath.replace(/^\//, '')}index.html` })
      )
    )
  })

  // Tags
  const tags = articles.reduce((result, a) => {
    return uniq([...result, ...a.tags.map(t => t.replace(/\s/, '_'))])
  }, [])
  tags.forEach(tag => {
    const publicPath = `/tags/${tag}/`
    const url = `${baseConfig.url}${publicPath}`
    const config = assign({}, baseConfig, {
      description: `Tags | ${tag} | ${baseConfig.description}`,
      title: `Tags | ${tag} | ${baseConfig.description}`,
      url,
    })
    plugins.push(
      new HtmlPlugin(
        assign(config, { filename: `${publicPath.replace(/^\//, '')}index.html` })
      )
    )
  })

  // Search
  {
    const title = `Search | ${baseConfig.siteName}`
    const publicPath = '/search/'
    const url = `${baseConfig.url}${publicPath}`
    const config = assign({}, baseConfig, {
      title,
      url,
      description: title,
    })
    plugins.push(
      new HtmlPlugin(
        assign(config, { filename: `${publicPath.replace(/^\//, '')}index.html` })
      )
    )
  }

  return plugins
}
