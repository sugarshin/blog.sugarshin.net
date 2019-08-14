const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = prod => {
  const options = {
    modules: {
      localIdentName: prod ? '[hash:base64:32]' : '[path][name]__[local]___[hash:base64:8]',
    },
    importLoaders: 2,
  }
  const rule = {
    test: /\.styl$/,
    use: [
      prod ? MiniCssExtractPlugin.loader : 'style-loader',
      { loader: 'css-loader', options },
      'postcss-loader',
      'stylus-loader',
    ],
  }

  return rule
}
