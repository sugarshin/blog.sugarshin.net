const HtmlPlugin = require('html-webpack-plugin')
const {
  lang,
  siteName,
  authorName,
  authorGitHubUserName,
  googleSiteVerificationKey,
} = require('../settings')

module.exports = ({ segmentWriteKey, noindex }) => {
  return new HtmlPlugin({
    template: 'src/template',
    title: siteName,
    lang,
    author: `${authorGitHubUserName} | ${authorName}`,
    siteName,
    segmentWriteKey,
    noindex,
    googleSiteVerificationKey,
  })
}
