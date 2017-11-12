const moment = require('moment')
const yaml = require('js-yaml')
const { author: { name, url } } = require('../../package.json')

/**
 * @param {}
 * @returns {string}
 */
const articleTemplate = ({
  title = 'Untitled',
  date = moment().format('YYYY-MM-DD HH:mm'),
  isPublic = true,
  author = { name, url },
  tags = [],
  ogImageURL = '',
  body,
}) => {
  const ogp = yaml.safeDump({
    ogp: {
      og: {
        image: {
          src: ogImageURL,
        },
      },
    },
  }, { lineWidth: -1 })

  return [
    '---',
    `title: ${title}`,
    `date: ${date}`,
    `public: ${isPublic}`,
    `author:`,
    `  name: ${author.name}`,
    `  url: ${author.url}`,
    `tags:${tags.length > 0 ? ` ${tags.join(', ')}` : ''}`,
    ogp.replace(/'/g, '') // Remove quote for src string
      .replace(/\n$/, ''),
    '---',
    '',
    ...(body ? (Array.isArray(body) ? body : [body]) : []),
  ].join('\n')
}

module.exports = articleTemplate
