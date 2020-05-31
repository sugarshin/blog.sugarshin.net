const globals = require('globals')
const base = require('./.eslintrc')

module.exports = {
  ...base,
  globals: {
    ...globals.mocha,
    cy: true,
  },
}
