const HtmlPlugin = require('html-webpack-plugin')
const {
  lang,
  siteName,
  description,
  authorName,
  authorGitHubUserName,
  protocol,
  domain,
  googleSiteVerificationKey,
} = require('../settings')

module.exports = ({ segmentWriteKey, noindex }) => {
  return new HtmlPlugin({
    title: siteName,
    lang,
    author: `${authorGitHubUserName} | ${authorName}`,
    description,
    url: `${protocol}//${domain}`,
    type: 'website',
    siteName,
    segmentWriteKey,
    noindex,
    ogImageURL: `${protocol}//${domain}/assets/images/common/open-graph.jpg`,
    googleSiteVerificationKey,
  })
}
