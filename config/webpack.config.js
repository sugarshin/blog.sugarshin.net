const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';
const cssModules = 'modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:8]';
const cssLoader = production ? `css?minimize&${cssModules}` : `css?${cssModules}`;
const buildDev = 'build-dev';
const buildDir = production ? 'build' : buildDev;
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];
const entry = ['babel-polyfill', './src/index.js'];
if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entry.push(
    'webpack-dev-server/client?http://localhost:8003',
    'webpack/hot/dev-server'
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
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.styl$/,
        loader: 'stylint',
        exclude: /node_modules/,
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
        loader: 'babel',
        query: { presets: ['es2015', 'stage-2', 'react'] }
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
  stylus: {
    include: ['node_modules']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/assets/'
  }
};
