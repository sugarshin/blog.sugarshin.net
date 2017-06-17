/* eslint-disable no-console */

const { writeFileSync } = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const mkdirp = require('mkdirp')
const moment = require('moment')
const articleTemplate = require('./helpers/articleTemplate')
const { protocol, domain } = require('../config/settings')

const name = argv.n || argv.name

if (!name) {
  throw new Error('`npm run na -- -n article-title` or `npm run na -- --name=article-title`')
}

const origin = `${protocol}//${domain}`
const d = moment()
const imagePath = `assets/images/${d.format('YYYY/MM/DD')}/${name}`
const ogImageContent = `${origin}/${imagePath}/main.png`
const content = articleTemplate({
  title: 'Article title here',
  date: d.format('YYYY-MM-DD HH:mm'),
  ogImageURL: ogImageContent,
  body: [
    `![Main](${ogImageContent.replace(origin, '')})`,
    '',
    '## Table of Contents',
    '',
    '## ${First content heading}',
    '',
    '',
  ],
})

writeFileSync(`articles/${d.format('YYYY-MM-DD')}_${name}.md`, content)
console.log(`Success write new article file !`)

const imageDir = `articles/${imagePath}`
mkdirp.sync(imageDir)
console.log(`Created ${imageDir} !`)
