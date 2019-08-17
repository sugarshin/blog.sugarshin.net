const { browserslist } = require('./package.json')

const basePlugins = [
  'add-react-displayname',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-decorators', {
    legacy: true,
  }],
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-json-strings',
]

module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: "commonjs", // https://github.com/webpack/webpack/issues/4039#issuecomment-514454200
      "useBuiltIns": "usage",
      "corejs": 3,
      "targets": browserslist,
    }],
    '@babel/preset-react',
  ],
  plugins: basePlugins,
  env: {
    development: {
      plugins: ['react-hot-loader/babel', ...basePlugins],
    },
    test: {
      presets: ['@babel/preset-env'],
    },
  },
}
