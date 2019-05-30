const pkg = require('./package.json')

const reactSettings = () => ({ version: pkg.dependencies.react.replace(/[^0-9.]/g, '') })

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['babel', 'react', 'cypress'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  rules: {
    'no-console': 1,
    'no-debugger': 1,
    semi: [2, 'never'],
    'comma-dangle': [2, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never',
      imports: 'always-multiline',
      exports: 'always-multiline',
    }],
  },
  settings: {
    react: reactSettings(),
  },
}
