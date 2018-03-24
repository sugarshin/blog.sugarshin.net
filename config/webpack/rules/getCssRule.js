const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = prod => {
  const options = { minimize: prod }
  const rule = { test: /\.css$/ }
  if (prod) {
    rule.loader = ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        { loader: 'css-loader', options },
      ],
    })
  } else {
    rule.use = [
      'style-loader',
      { loader: 'css-loader', options },
    ]
  }
  return rule
}
