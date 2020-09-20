const truncate = require('lodash/truncate')
const stripMarkdown = require('./stripMarkdown')

module.exports = function toOneLine(markdown, length = 140) {
  const stripped = truncate(stripMarkdown(markdown), { length })
  return stripped.replace(/\n|\r/g, ' ')
}
