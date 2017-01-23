module.exports = {
  plugins: [
    require('autoprefixer')({ browsers: ['last 3 versions'] }),
    require('css-mqpacker'),
    require('postcss-flexbugs-fixes'),
    require('postcss-partial-import')()
  ]
};
