const { PRODUCTION } = require('./env')

const assetsDir = 'assets'
const buildDir = process.env.NODE_ENV !== PRODUCTION ? 'build-dev' : (process.env.BUILD_DIR || 'build')

module.exports = {
  assetsDir,
  buildDir,
}
