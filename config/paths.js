const fs = require('fs')
const path = require('path')

const rootPath = fs.realpathSync(process.cwd())
const resolveAppPath = relativePath => path.resolve(rootPath, relativePath)
const nodeModulesPath = resolveAppPath('node_modules')

module.exports = {
  rootPath,
  nodeModulesPath,
  resolveAppPath,
}
