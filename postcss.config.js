module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    require('postcss-flexbugs-fixes'),
    require('postcss-partial-import')(),
  ],
}
