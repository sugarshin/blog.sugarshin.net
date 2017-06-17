const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const prod = process.env.NODE_ENV === 'production'
const { assign } = Object

const baseCSSLoaderOptions = { minimize: prod }

const stylLoaderOptions = assign(
  {},
  baseCSSLoaderOptions,
  {
    modules: true,
    importLoaders: 2,
    localIdentName: prod ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]',
  },
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
    use: [
      { loader: 'css-loader', options: stylLoaderOptions },
      'postcss-loader',
      'stylus-loader',
    ],
  })
}

const cssLoaderOptions = assign(
  {},
  baseCSSLoaderOptions,
)

const cssRule = { test: /\.css$/ }
if (!prod) {
  cssRule.use = [
    'style-loader',
    { loader: 'css-loader', options: cssLoaderOptions },
  ]
} else {
  cssRule.loader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      { loader: 'css-loader', options: cssLoaderOptions },
    ],
  })
}

const fileOptions = {
  name: prod ? '[hash].[ext]' : '[path][name].[ext]',
}
const urlOptions = assign(
  {},
  fileOptions,
  { limit: 10000 },
)
const fontFileOptions = assign(
  {},
  urlOptions,
  { outputPath: 'fonts/' },
)
const urlLoader = {
  loader: 'url-loader',
  options: urlOptions,
}
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules')
const libFontPaths = [
  path.resolve(nodeModulesPath, 'octicons/octicons'),
  path.resolve(nodeModulesPath, 'bootswatch/fonts'),
  path.resolve(nodeModulesPath, 'font-awesome/fonts'),
]
const imageRule = {
  test: /\.(jpe?g|png|gif|svg)$/,
  exclude: libFontPaths,
}
if (prod) {
  imageRule.use = [
    urlLoader,
    {
      loader: 'image-webpack-loader',
      options: {
        progressive: true,
        bypassOnDebug: true,
        optipng: {
          optimizationLevel: 7,
        },
      },
    },
  ]
} else {
  assign(imageRule, urlLoader)
}

const webFontRule = assign(
  { test: /\.(otf|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/ },
  assign({}, urlLoader, { options: fontFileOptions }),
)

const otherWebFontRule = {
  test: /\.(eot|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  include: libFontPaths,
  loader: 'file-loader',
  options: fontFileOptions,
}

const webFontRules = [webFontRule, otherWebFontRule]

module.exports = {
  styl: stylRule,
  css: cssRule,
  image: imageRule,
  webFonts: webFontRules,
}
