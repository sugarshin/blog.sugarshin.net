const getBaseOptions = require('./getBaseOptions')

module.exports = prod => ({
  loader: 'url-loader',
  options: getBaseOptions(prod),
})
