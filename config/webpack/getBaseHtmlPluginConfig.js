const {
  lang,
  siteName,
  description,
  authorName,
  authorGitHubUserName,
  protocol,
  domain,
} = require('../settings')

module.exports = ({ segmentWriteKey }) => ({
  template: 'src/template',
  title: siteName,
  lang,
  author: `${authorGitHubUserName} | ${authorName}`,
  description,
  url: `${protocol}//${domain}`,
  type: 'website',
  siteName,
  segmentWriteKey,
})
