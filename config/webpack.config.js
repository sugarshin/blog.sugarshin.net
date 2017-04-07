const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { styl: stylRule, css: cssRule } = require('./webpack-rules');
const { author, name } = require('../package.json');

const production = process.env.NODE_ENV === 'production';
const buildDev = 'build-dev';
const buildDir = production ? 'build' : buildDev;
const API_BASE = production ? `https://api.github.com/repos/${author}/${name}` : '';
const SEGMENT_WRITE_KEY = production ? 'K0C4nouS0njLcqt5oX0qFLOhdbq3zFwH' : '';
const PORT = 8003 || process.env.PORT;

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_BASE: JSON.stringify(API_BASE),
      SEGMENT_WRITE_KEY: JSON.stringify(SEGMENT_WRITE_KEY)
    }
  })
];
const entry = ['babel-polyfill', 'whatwg-fetch', './src/index.js'];

if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, screw_ie8: true } }),
    new ExtractTextPlugin({ filename: 'app-[hash].css', disable: false, allChunks: true })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: 'src/template/index.pug',
      title: 'log | development',
      lang: 'ja',
    })
  );
  entry.unshift(
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  );
}

module.exports = {
  entry,
  plugins,
  cache: true,
  output: {
    path: path.resolve(__dirname, '..', buildDir, production ? 'assets' : ''),
    filename: production ? 'app-[hash].js' : 'assets/app.js',
    publicPath: production ? '/assets/' : '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '..', 'src')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'eslint-loader', options: { configFile: '.eslintrc' } }
        ],
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.styl$/,
        loader: 'stylint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      stylRule,
      cssRule,
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: { limit: 100000 }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
              hash: 'sha512',
              digest: 'hex',
              name: '[name]__[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              bypassOnDebug: true,
              optipng: {
                optimizationLevel: 7
              }
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port: PORT
  }
};
