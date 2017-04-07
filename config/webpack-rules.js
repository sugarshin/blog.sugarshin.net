const ExtractTextPlugin = require('extract-text-webpack-plugin')

const prod = process.env.NODE_ENV === 'production'

const baseCSSLoaderOptions = { minimize: prod }

const stylLoaderOptions = Object.assign(
  {},
  baseCSSLoaderOptions,
  {
    modules: true,
    importLoaders: 1,
    localIdentName: prod ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]',
  }
)

const stylRule = { test: /\.styl$/ }
if (!prod) {
  stylRule.use = [
    'style-loader',
    { loader: 'css-loader', options: stylLoaderOptions },
    'postcss-loader',
    'stylus-loader',
  ]
} else {
  stylRule.loader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: [
      `css-loader?${JSON.stringify(stylLoaderOptions)}`,
      'postcss-loader',
      'stylus-loader',
    ]
  })
}

const cssLoaderOptions = Object.assign(
  {},
  baseCSSLoaderOptions
)

const cssRule = { test: /\.css$/ }
if (!prod) {
  cssRule.use = [
    'style-loader',
    { loader: 'css-loader', options: cssLoaderOptions }
  ]
} else {
  cssRule.loader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: [
      `css-loader?${JSON.stringify(cssLoaderOptions)}`,
    ]
  })
}

module.exports = {
  styl: stylRule,
  css: cssRule,
}
