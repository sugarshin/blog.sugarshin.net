const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const WebappPlugin = require('webapp-webpack-plugin')
const Stylish = require('webpack-stylish')
const getBaseHtmlPluginConfig = require('./webpack/getBaseHtmlPluginConfig')
const webappPluginConfig = require('./webpack/webappPluginConfig')
const createHtmlPlugins = require('./webpack/createHtmlPlugins')
const getStylRule = require('./webpack/rules/getStylRule')
const getCssRule = require('./webpack/rules/getCssRule')
const getImageRule = require('./webpack/rules/image/getImageRule')
const getWebFontRules = require('./webpack/rules/image/getWebFontRules')
const { assetsDir, buildDir } = require('./dir')

require('dotenv').config()

const { NODE_ENV, API_BASE, SEGMENT_WRITE_KEY, GITHUB_ACCESS_TOKENS, PORT, SENTRY_DSN, CIRCLE_BUILD_NUM, LOGROCKET_APP_ID } = process.env
const production = NODE_ENV === 'production'
const apiBase = API_BASE || ''
const segmentWriteKey = SEGMENT_WRITE_KEY || null
const githubAccessTokens = GITHUB_ACCESS_TOKENS || null
const circleBuildNum = CIRCLE_BUILD_NUM || 0
const sentryDSN = SENTRY_DSN || null
const logrocketAppId = LOGROCKET_APP_ID || ''

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_BASE: JSON.stringify(apiBase),
      BUILD_NUMBER: JSON.stringify(circleBuildNum),
      SEGMENT_WRITE_KEY: JSON.stringify(segmentWriteKey),
      GITHUB_ACCESS_TOKENS: JSON.stringify(githubAccessTokens),
      SENTRY_DSN: JSON.stringify(sentryDSN),
      LOGROCKET_APP_ID: JSON.stringify(logrocketAppId),
    },
  }),
  new Stylish(),
]

const entry = {
  app: ['@babel/polyfill', 'whatwg-fetch', './src/index.js'],
}

if (production) {
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => !!module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, screw_ie8: true } }),
    new ExtractTextPlugin({ filename: `${assetsDir}/[name]-[contenthash].css`, disable: false, allChunks: true }),
    new WebappPlugin(webappPluginConfig),
    ...createHtmlPlugins()
  )
} else {
  plugins.push(
    new HtmlPlugin(
      getBaseHtmlPluginConfig()
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  entry,
  plugins,
  cache: true,
  output: {
    path: path.resolve(__dirname, '..', buildDir),
    filename: production ? `${assetsDir}/[name]-[chunkhash].js` : '[name].js',
    publicPath: '/',
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
      getStylRule(production),
      getCssRule(production),
      getImageRule(production),
      ...getWebFontRules(production),
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDir}`,
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port: PORT || 8003,
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
