/* eslint-disable no-console */

const path = require('path')
const globby = require('globby')
const { flatten } = require('lodash')
const imagemin = require('imagemin')
const pngquant = require('imagemin-pngquant')
const gifsicle = require('imagemin-gifsicle')
const jpegtran = require('imagemin-jpegtran')
const svgo = require('imagemin-svgo')
const chalk = require('chalk')

const plugins = [pngquant(), gifsicle(), jpegtran(), svgo()]
const baseSrcDir = 'articles'
const baseOutDir = 'build'
const baseSrcDirRegex = new RegExp(String.raw`^${baseSrcDir}\/`)

console.log(`\nStart [${chalk.green('imagemin')}] !!\n`)

globby(`${baseSrcDir}/assets/**/*.{jpg,jpeg,png,gif,svg}`)
  .then(paths => Promise.all(paths.map(p => imagemin(
    [p],
    `${baseOutDir}/${path.dirname(p).replace(baseSrcDirRegex, '')}`,
    { plugins },
  ))))
  .then(files => {
    flatten(files).forEach(({ path }) => console.log(`  ${chalk.bgGreen(' minified ')} ${chalk.gray(path)}`))
  })
