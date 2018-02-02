const { isNil } = require('lodash')
const moment = require('moment')
const picker = require('./eventsPicker')
const formatter = require('./eventsFormatter')
const articleTemplate = require('../helpers/articleTemplate')
const {
  protocol,
  domain,
  authorName: defaultAuthorName,
  authorURL: defaultAuthorURL,
} = require('../../config/settings')

const createSection = (header, content) => {
  return [
    `## ${header}`,
    '',
    content,
    '',
  ].join('\n')
}

const createSectionIfNeeded = (header, content) => {
  return content !== '' ? createSection(header, content) : null
}

/**
 * @return {String}
 */
module.exports = (
  data,
  { target = moment(), authorName = defaultAuthorName, authorUrl = defaultAuthorURL } = {}
) => articleTemplate({
  title: `"[Monthly report] ${target.format('YYYY-MM')} my activity this month on GitHub"`,
  date: target.format('YYYY-MM-DD HH:mm'),
  author: { name: authorName, url: authorUrl },
  ogImageURL: `${protocol}//${domain}/assets/images/common/report/main.png`,
  tags: ['monthly report'],
  body: [
    '今月の主な OSS コントリビューションや GitHub 上のアクティビティまとめ',
    '',
    '***',
    '',
    createSectionIfNeeded(
      'Create new repositories',
      formatter.formatCreateRepoEvents(
        picker.pickCreateRepoEvents(data)
      )
    ),
    createSectionIfNeeded(
      'Make private repository public',
      formatter.formatPublicEvents(
        picker.pickPublicEvents(data)
      )
    ),
    createSectionIfNeeded(
      'Pull requests',
      formatter.formatPullRequestEvents(
        picker.pickTargetPullRequestEvents(data)
      )
    ),
    createSectionIfNeeded(
      'Releases',
      formatter.formatCreateTagEvents(
        picker.pickCreateTagEvents(data)
      )
    ),
    createSectionIfNeeded(
      'Starred repositories',
      formatter.formatStarredEvents(
        picker.pickStarredEvents(data)
      )
    ),
    createSectionIfNeeded(
      'Issues events',
      formatter.formatIssuesEvents(
        picker.pickTargetIssuesEvents(data)
      )
    ),
  ].filter(row => !isNil(row)),
})
