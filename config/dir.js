const assetsDir = 'assets'
const buildDir = process.env.NODE_ENV === 'production' ? 'build' : 'build-dev'

module.exports = {
  assetsDir,
  buildDir,
}
