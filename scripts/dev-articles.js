// Mock GitHub API, GET: /repos/${author}/${repo_name}/contents/articles
const fs = require('fs')
const argv = require('minimist')(process.argv.slice(2))
const mkdirp = require('mkdirp')
const btoa = require('btoa')
const { author, name } = require('../package.json')

const ARTICLES_DIR = './articles'
// TODO:                              ↓ to dry with apis/Articles
const OUT_DIR = argv.o || argv.out || `./build-dev/repos/${author}/${name}/contents/articles`

const filenames = fs.readdirSync(ARTICLES_DIR)
mkdirp.sync(OUT_DIR)

filenames.filter(name => /\.md$/.test(name)).forEach(name => {
  const rawContent = fs.readFileSync(`${ARTICLES_DIR}/${name}`, { encoding: 'utf8' })
  const content = btoa(unescape(encodeURIComponent(rawContent)))
  fs.writeFileSync(`${OUT_DIR}/${name}`, JSON.stringify({ name, content }), { encoding: 'utf8' })
  console.log(`Success write file ${OUT_DIR}/${name} !`)
})
