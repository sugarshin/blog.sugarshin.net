const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = prod => {
  const rule = {
    test: /\.css$/,
    use: [
      prod ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ],
  }
  return rule
}
