const { PRODUCTION } = require('./env')

const assetsDir = 'assets'
const buildDir = process.env.NODE_ENV === PRODUCTION ? 'build' : 'build-dev'

module.exports = {
  assetsDir,
  buildDir,
}
