const path = require('path');
const webpack = require('webpack');
const { author, name } = require('../package.json');

const { NODE_ENV } = process.env;
const production = NODE_ENV === 'production';
const buildDev = 'build-dev';
const buildDir = production ? 'build' : buildDev;
const API_BASE = production ? `https://api.github.com/repos/${author}/${name}` : '';
const SEGMENT_WRITE_KEY = production ? 'K0C4nouS0njLcqt5oX0qFLOhdbq3zFwH' : '';
const PORT = 8003;
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_BASE: JSON.stringify(API_BASE),
      SEGMENT_WRITE_KEY: JSON.stringify(SEGMENT_WRITE_KEY)
    }
  })
];
const entry = ['babel-polyfill', 'whatwg-fetch', './src/index.js'];

if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, screw_ie8: true } }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entry.unshift(
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  );
}

const baseCSSLoaderOptions = { minimize: production };
const cssModulesOptions = Object.assign(
  {},
  baseCSSLoaderOptions,
  {
    modules: true,
    importLoaders: 1,
    localIdentName: production ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]'
  }
);
const cssModules = { loader: 'css-loader', options: cssModulesOptions };

module.exports = {
  entry,
  plugins,
  cache: true,
  output: {
    path: path.resolve(__dirname, '..', buildDir, 'assets'),
    filename: production ? 'app-[hash].js' : 'app.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '../src')]
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
      {
        test: /\.styl$/,
        use: ['style-loader', cssModules, 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: baseCSSLoaderOptions }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          { loader: 'url-loader', options: { limit: 102400 } },
          'file-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              hash: 'sha512',
              digest: 'hex',
              name: '[name]__[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
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
    publicPath: '/assets/',
    host: '0.0.0.0',
    port: PORT
  }
};
