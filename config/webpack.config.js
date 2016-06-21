const path = require('path');
const webpack = require('webpack');
const { author, name } = require('../package.json');

const { NODE_ENV } = process.env;
const production = NODE_ENV === 'production';
const localIdentName = production ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]';
const cssModules = `modules&importLoaders=1&localIdentName=${localIdentName}`;
const cssLoader = production ? `css?minimize&${cssModules}` : `css?${cssModules}`;
const buildDev = 'build-dev';
const buildDir = production ? 'build' : buildDev;
const API_BASE = production ? `https://api.github.com/repos/${author}/${name}` : '';
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
      API_BASE: JSON.stringify(API_BASE)
    }
  })
];
const entry = ['babel-polyfill', './src/index.js'];
if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entry.unshift(
    'webpack-dev-server/client?http://localhost:8003',
    'webpack/hot/only-dev-server'
  );
}

module.exports = {
  entry,
  plugins,
  cache: true,
  output: {
    path: path.resolve(__dirname, '..', buildDir, 'assets'),
    filename: production ? 'app-[hash].js' : 'app.js',
    publicPath: '/assets/'
  },
  display: { errorDetails: true },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['web_modules', 'node_modules', 'src']
  },
  module: {
    preLoaders: [
      {
        test: /\.styl$/,
        loader: 'stylint',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.styl$/,
        loaders: ['style', cssLoader, 'postcss', 'stylus']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=102400&mimetype=application/font-woff'
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['url?limit=102400', 'file']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders: [
          'url?limit=102400&hash=sha512&digest=hex&name=[name]__[hash].[ext]',
          'image-webpack?progressive&bypassOnDebug&optimizationLevel=7'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: () => [
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
    require('css-mqpacker'),
    require('postcss-flexbugs-fixes'),
    require('postcss-partial-import')()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/assets/'
  }
};
