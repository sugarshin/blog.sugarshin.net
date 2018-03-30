const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = prod => {
  const options = { minimize: prod }
  const rule = { test: /\.css$/ }
  if (prod) {
    rule.use = [
      MiniCssExtractPlugin.loader,
      { loader: 'css-loader', options },
    ]
  } else {
    rule.use = [
      'style-loader',
      { loader: 'css-loader', options },
    ]
  }
  return rule
}
