/* eslint-disable no-console */

// TODO Change code design to sync aproch
// I want using GitHub API
const fs = require('fs')
const path = require('path')
// const recursive  = require('recursive-readdir')
const argv = require('minimist')(process.argv.slice(2))
const writeFilePromisify = require('./helpers/writeFilePromisify')
const toOneLine = require('../markdown/toOneLine')
const parseYamlFrontmatter = require('../markdown/parseYamlFrontmatter')
const readdirPromisify = dirPath => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

// const recursivePromisify = (dirPath, ignores) => {
//   return new Promise((resolve, reject) => {
//     recursive(dirPath, ignores, (err, files) => {
//       if (err) reject(err)
//       resolve(files)
//     })
//   })
// }

const readFilePromisify = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const parseMarkdownYamlDataWithFilePathAndPreview = ([markdown, filePath]) => {
  const yamlData = parseYamlFrontmatter(markdown)
  const preview = toOneLine(markdown, 64)
  return [yamlData, filePath, preview]
}

const readFileWithFilePath = filePath => {
  return readFilePromisify(filePath)
    .then(data => [data, filePath])
    .catch(err => console.log(`Error readFileWithFilePath: ${err}`))
}

const srcDir = argv.s || argv.src || './articles'
const outDir = argv.o || argv.out || './'
Promise.resolve(srcDir)
  //                                                         // TODO ignore assets dir
  // .then(dirPath => recursivePromisify(dirPath, ['*.json', (file, stats) => stats.isDirectory()]))
  .then(dirPath => readdirPromisify(dirPath))
  .then(files => files.map(file => path.resolve(srcDir, file)))
  .then(files => files.filter(file => /\.md$/.test(file)))
  .then(files => Promise.all(files.map(file => readFileWithFilePath(file))))
  .then(markdownWithFilePathList => Promise.all(markdownWithFilePathList.map(parseMarkdownYamlDataWithFilePathAndPreview)))
  .then(dataWithFilePathListAndPreivew => {
    return dataWithFilePathListAndPreivew
      .map(([data, filePath, preview]) => Object.assign({}, data, {
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
        url: filePath.split('_')[1].replace('.md', ''),
        preview,
      }))
      .filter(data => data.public === true) // true, 'draft', false
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Descending sort
  })
  .then(data => writeFilePromisify(path.resolve(outDir, 'index.json'), JSON.stringify(data)))
  .catch(err => console.log('Error `scripts/articles`: \n', err))
