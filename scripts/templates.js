/* eslint-disable no-console */

const fs = require('fs')
const pug = require('pug')
const mkdirp = require('mkdirp')
const yaml = require('js-yaml')
const uniq = require('lodash/uniq')
const markdownRenderer = require('../universal/markdownRenderer')
const removeMarkdown = require('remove-markdown')
const argv = require('minimist')(process.argv.slice(2))
const sliceYAMLConfig = require('../universal/sliceYAMLConfig')
const removeYAMLConfig = require('../universal/removeYAMLConfig')
const {
  lang, siteName, description, authorName, googleSiteVerificationKey, protocol, domain,
} = require('../config/settings')

const outDir = argv.o || argv.out || 'build' // TODO
const src = './src/template/index.pug'
const articlesJSON = fs.readFileSync(`./${outDir}/index.json`, { encoding: 'utf8' })
const articles = JSON.parse(articlesJSON)
const faviconsHTML = JSON.parse(fs.readFileSync('./favicons.html.tmp', { encoding: 'utf8' }))
const baseURL = `${protocol}//${domain}`
const baseOpts = {
  lang,
  title: siteName,
  author: authorName,
  description,
  favicons: faviconsHTML,
  url: baseURL,
  type: 'article',
  siteName,
  ogImageURL: `${baseURL}/assets/images/common/open-graph.jpg`,
}
const getArticleSrcPath = article => {
  const date = article.date.split(' ')[0]
  return `${date}_${article.url}`
}
const getArticlePublicPath = article => {
  const [year, month, day] = article.date.split(' ')[0].split('-')
  return `/${year}/${month}/${day}/${article.url}/`
}


// root
{
  const content = markdownRenderer.toString(
    articles.map(a => {
      const url = `${baseURL}${getArticlePublicPath(a)}`
      return `- [${a.title}](${url})`
    }).join('\n')
  )
  const options = Object.assign(
    {},
    baseOpts,
    {
      googleSiteVerificationKey,
      type: 'website',
      content,
    }
  )
  const html = pug.renderFile(src, options)
  fs.writeFileSync(`./${outDir}/index.html`, html, { encoding: 'utf8' })
}

// Articles
articles.forEach(article => {
  const path = getArticleSrcPath(article)
  const md = fs.readFileSync(`./articles/${path}.md`, { encoding: 'utf8' })
  const content = markdownRenderer.toString(md)
  const yamlConfig = yaml.safeLoad(sliceYAMLConfig(md))
  const url = getArticlePublicPath(article)
  const html = pug.renderFile(src, Object.assign({}, baseOpts, {
    content,
    title: `${yamlConfig.title} | ${siteName}`,
    description: removeMarkdown(removeYAMLConfig(md)).replace(/\n/g, '').slice(0, 140),
    url: `${baseURL}${url}`, // TODO: url must be included in yaml config
    ogImageURL: yamlConfig.ogp.og.image.src,
  }))
  mkdirp.sync(`./${outDir}${url.replace(/\/$/, '')}`)
  fs.writeFileSync(`./${outDir}${url}index.html`, html, { encoding: 'utf8' })
})

// Archives
const dates = articles.reduce((result, a) => {
  const d = a.date.split(' ')[0].replace(/-\d\d$/, '')
  return result.includes(d) ? result : [...result, d]
}, [])
dates.forEach(date => {
  const publicPath = `/archives/${date}/`
  const url = `${baseURL}${publicPath}`
  const options = Object.assign({}, baseOpts, {
    description: `Archives | ${date} | ${baseOpts.description}`,
    title: `Archives | ${date} | ${baseOpts.description}`,
    url,
  })
  const html = pug.renderFile(src, options)
  mkdirp.sync(`./${outDir}${publicPath.replace(/\/$/, '')}`)
  fs.writeFileSync(`./${outDir}${publicPath}index.html`, html, { encoding: 'utf8' })
})

// Tags
const tags = articles.reduce((result, a) => {
  return uniq([...result, ...a.tags.map(t => t.replace(/\s/, '_'))])
}, [])
tags.forEach(tag => {
  const publicPath = `/tags/${tag}/`
  const url = `${baseURL}${publicPath}`
  const options = Object.assign({}, baseOpts, {
    description: `Tags | ${tag} | ${baseOpts.description}`,
    title: `Tags | ${tag} | ${baseOpts.description}`,
    url,
  })
  const html = pug.renderFile(src, options)
  mkdirp.sync(`./${outDir}${publicPath.replace(/\/$/, '')}`)
  fs.writeFileSync(`./${outDir}${publicPath}index.html`, html, { encoding: 'utf8' })
})

console.log('Successfully templates !')
