/**
 * @param {String} markdown
 * @param {String} [divider]
 * @returns {String} removed yeml config markdown
 */
module.exports = function removeYAMLConfig(markdown, divider = '---') {
  const rows = markdown.split('\n');
  const linesIndexes = rows.reduce((result, row, i) => row === divider ? [...result, i] : result, []);
  return rows.slice(linesIndexes[1] + 2).join('\n');
}
