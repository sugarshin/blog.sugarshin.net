module.exports = prod => ({
  name: prod ? '[hash].[ext]' : '[path][name].[ext]',
  limit: 10000,
})
