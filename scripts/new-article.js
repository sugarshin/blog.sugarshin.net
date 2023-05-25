/* eslint-disable no-console */

const { writeFileSync } = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const mkdirp = require('mkdirp')
const moment = require('moment')
const articleTemplate = require('./helpers/articleTemplate')
const { protocol, domain } = require('../config/settings')

const name = argv.n || argv.name
const publishDate = argv.p || argv['publish-date']

if (typeof name !== 'string' || !name) {
  console.error('`name` is required. `npm run na -- -n article-title` or `npm run na -- --name=article-title`')
  process.exit(1)
}

if (publishDate && !/^20[0-9]{2}-(?:0|1)[0-9]-[0-9]{2}$/.test(publishDate)) {
  console.error('`--publish-date` is invalide format. `npm run na -- -p 2019-01-30`')
  process.exit(1)
}

console.log(`[INFO] Generating new article..\n`)

const origin = `${protocol}//${domain}`
const d = moment(publishDate)
const imagePath = `assets/images/${d.format('YYYY/MM/DD')}/${name}`
const ogImageContent = `${origin}/${imagePath}/main.png`
const content = articleTemplate({
  title: 'Article title here',
  date: d.format('YYYY-MM-DD HH:mm'),
  ogImageURL: ogImageContent,
  tags: ['tag name'],
  body: [
    `![](${ogImageContent.replace(origin, '')})`,
    '',
    '## 目次',
    '',
    '## ${First content heading}',
    '',
    '',
  ],
})

const imageDir = `articles/${imagePath}`
const files = [
  `articles/${d.format('YYYY-MM-DD')}_${name}.md`,
  `${imageDir}/.gitkeep`,
]

// Write files
writeFileSync(files[0], content)
mkdirp.sync(imageDir)
writeFileSync(files[1], '')

// Log files
files.forEach(file => console.log(file))

console.log('')
console.log('[INFO] Completed successfully\n')
