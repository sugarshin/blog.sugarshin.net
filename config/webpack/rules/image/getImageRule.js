const getBaseUrlLoader = require('./helpers/getBaseUrlLoader')
const libFontPaths = require('./helpers/libFontPaths')

const { assign } = Object

module.exports = prod => {
  return assign(
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      exclude: libFontPaths,
    },
    getBaseUrlLoader(prod)
  )
}
