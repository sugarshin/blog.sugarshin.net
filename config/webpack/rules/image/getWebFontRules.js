const getBaseUrlLoader = require('./helpers/getBaseUrlLoader')
const getBaseOptions = require('./helpers/getBaseOptions')
const libFontPaths = require('./helpers/libFontPaths')
const { assetsDir } = require('../../../dir')

const { assign } = Object

module.exports = prod => {
  const options = assign(
    getBaseOptions(prod),
    { outputPath: `${assetsDir}/fonts/` }
  )

  const webFontRule = assign(
    { test: /\.(otf|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/ },
    getBaseUrlLoader(prod),
    { options }
  )

  const otherWebFontRule = {
    test: /\.(eot|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    include: libFontPaths,
    loader: 'file-loader',
    options,
  }

  return [webFontRule, otherWebFontRule]
}
