const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const {
  styl: stylRule,
  css: cssRule,
  image: imageRule,
  webFonts: webFontRules,
} = require('./webpack-rules')
require('dotenv').config()

const { NODE_ENV, API_BASE, SEGMENT_WRITE_KEY, GITHUB_ACCESS_TOKENS, PORT, SENTRY_DSN, CIRCLE_BUILD_NUM } = process.env
const production = NODE_ENV === 'production'
const buildDev = 'build-dev'
const buildDir = production ? 'build' : buildDev
const apiBase = API_BASE || ''
const segmentWriteKey = SEGMENT_WRITE_KEY || null
const githubAccessTokens = GITHUB_ACCESS_TOKENS || null
const circleBuildNum = CIRCLE_BUILD_NUM || 0
const sentryDSN = SENTRY_DSN || null
const port = PORT || 8003

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_BASE: JSON.stringify(apiBase),
      BUILD_NUMBER: JSON.stringify(circleBuildNum),
      SEGMENT_WRITE_KEY: JSON.stringify(segmentWriteKey),
      GITHUB_ACCESS_TOKENS: JSON.stringify(githubAccessTokens),
      SENTRY_DSN: JSON.stringify(sentryDSN),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: module => !!module.context && module.context.indexOf('node_modules') !== -1,
  }),
]
const entry = {
  app: ['babel-polyfill', 'whatwg-fetch', './src/index.js'],
}

if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, screw_ie8: true } }),
    new ExtractTextPlugin({ filename: '[name]-[contenthash].css', disable: false, allChunks: true })
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: 'src/template/index.pug',
      title: 'development',
      lang: 'en',
    })
  )

  entry.app.unshift(
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server'
  )

  const main = entry.app.pop()
  entry.app.push(
    'react-hot-loader/patch',
    main
  )
}

module.exports = {
  entry,
  plugins,
  cache: true,
  output: {
    path: path.resolve(__dirname, '..', buildDir, production ? 'assets' : ''),
    filename: production ? '[name]-[chunkhash].js' : 'assets/[name].js',
    publicPath: production ? '/assets/' : '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'eslint-loader', options: { configFile: '.eslintrc' } },
        ],
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.styl$/,
        loader: 'stylint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      stylRule,
      cssRule,
      imageRule,
      ...webFontRules,
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port,
    proxy: {
      // TODO: for GitHub search api. what should access token
      '/search/code': {
        target: 'https://api.github.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
}
