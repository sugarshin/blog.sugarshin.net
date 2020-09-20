/**
 * @param {String} markdown
 * @param {String} [divider]
 * @returns {String} yaml
 */
module.exports = function extractYamlConfig(markdown, divider = '---') {
  const rows = markdown.split('\n')
  const [firstLineIndex, secondLinesIndex] =
    rows.reduce((result, row, i) => row === divider ? [...result, i] : result, [])
  return rows.slice(firstLineIndex, secondLinesIndex).join('\n')
}
