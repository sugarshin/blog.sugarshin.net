const truncate = require('lodash/truncate')
const stripMarkdown = require('./stripMarkdown')

module.exports = function toOneLine(markdown, length = 140) {
  const mdStripped = stripMarkdown(markdown)
  const lineBreakStrippedAndTrimmed = mdStripped.replace(/\n|\r/g, ' ').trim()
  return truncate(lineBreakStrippedAndTrimmed, { length })
}
