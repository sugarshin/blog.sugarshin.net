const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebappPlugin = require('webapp-webpack-plugin')
const webappPluginConfig = require('./webpack/webappPluginConfig')
const createHtmlPlugin = require('./webpack/createHtmlPlugin')
const getStylRule = require('./webpack/rules/getStylRule')
const getCssRule = require('./webpack/rules/getCssRule')
const getImageRule = require('./webpack/rules/image/getImageRule')
const getWebFontRules = require('./webpack/rules/image/getWebFontRules')
const { assetsDir, buildDir } = require('./dir')
const { PRODUCTION, DEVELOPMENT } = require('./env')

require('dotenv').config()

const { NODE_ENV, API_BASE, SEGMENT_WRITE_KEY, GITHUB_ACCESS_TOKENS, PORT, SENTRY_DSN, CIRCLE_BUILD_NUM, LOGROCKET_APP_ID, CIRCLE_BRANCH } = process.env
const prod = NODE_ENV === PRODUCTION

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_BASE: JSON.stringify(API_BASE),
      BUILD_NUMBER: JSON.stringify(CIRCLE_BUILD_NUM || 0),
      SEGMENT_WRITE_KEY: JSON.stringify(SEGMENT_WRITE_KEY),
      GITHUB_ACCESS_TOKENS: JSON.stringify(GITHUB_ACCESS_TOKENS),
      SENTRY_DSN: JSON.stringify(SENTRY_DSN),
      LOGROCKET_APP_ID: JSON.stringify(LOGROCKET_APP_ID),
      BRANCH: JSON.stringify(CIRCLE_BRANCH),
    },
  }),
]

const entry = {
  app: ['whatwg-fetch', './src/index.js'],
}

if (prod) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: `${assetsDir}/[name]-[contenthash].css`,
      chunkFilename: `${assetsDir}/[name]-[contenthash].css`,
    }),
    new WebappPlugin(webappPluginConfig),
    createHtmlPlugin({ segmentWriteKey: SEGMENT_WRITE_KEY, noindex: Boolean(process.env.NOINDEX) })
  )
} else {
  plugins.push(
    createHtmlPlugin({ segmentWriteKey: SEGMENT_WRITE_KEY }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  context: process.cwd(),
  mode: prod ? PRODUCTION : DEVELOPMENT,
  cache: !prod,
  entry,
  plugins,
  output: {
    path: path.resolve(__dirname, '..', buildDir),
    filename: prod ? `${assetsDir}/[name]-[chunkhash].js` : '[name].js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ sourceMap: false, parallel: true }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
  },
  module: {
    rules: [
      ...(prod ? [] : [{
        test: /\.js$/,
        use: [
          { loader: 'eslint-loader', options: { configFile: '.eslintrc.js' } },
        ],
        exclude: /node_modules/,
        enforce: 'pre',
      }]),
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      getStylRule(prod),
      getCssRule(prod),
      getImageRule(prod),
      ...getWebFontRules(prod),
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
    before: app => {
      app.get('/favicon.ico', (_, res) => res.status(200).send())
    },
  },
}
