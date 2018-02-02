/* eslint-disable no-console */

const fs = require('fs')
const { flatten, padStart, isNil } = require('lodash')
const GitHub = require('github')
const pMap = require('p-map')
const moment = require('moment')
const picker = require('./eventsPicker')
const formatter = require('./eventsFormatter')
const articleTemplate = require('../helpers/articleTemplate')
const {
  protocol,
  domain,
  authorGitHubUserName: username,
  authorName: defaultAuthorName,
  authorURL: defaultAuthorURL,
} = require('../../config/settings')
const argv = require('minimist')(process.argv.slice(2))

const per = parseInt(argv.p || argv.per || 16, 10)
const unit = argv.u || argv.unit || 'minutes'
const authorName = argv.n || argv['author-name'] || defaultAuthorName
const authorUrl = argv.U || argv['author-url'] || defaultAuthorURL

if (typeof per !== 'number' || [unit, authorName, authorUrl].some(t => typeof t !== 'string')) {
  throw new TypeError('`per` must be `number`, `unit` must be `string`')
}

const github = new GitHub()

const getEvents = page => github.activity.getEventsForUser({
  per_page: 100,
  username,
  page,
})

pMap([1, 2, 3], page => getEvents(page).then(res => res.data))
.then(results => {
  console.log('DEBUG - results:\n\n', results)

  const target = moment().subtract(per, unit)
  const targetMonth = `${target.month() + 1}`
  const nextMonth = `${moment().month() + 1}`
  const targetPaddedMonth = padStart(targetMonth, 2, '0')
  const nextPaddedMonth = padStart(nextMonth, 2, '0')
  const targetDate = `${target.year()}${targetPaddedMonth}01`
  const nextDate = `${moment().year()}${nextPaddedMonth}01`
  const targetM = moment(targetDate)
  const nextM = moment(nextDate)
  const laterThisMonthData = flatten(results).filter(d => {
    const val = moment(d.created_at).valueOf()
    return nextM.valueOf() > val && val > targetM.valueOf()
  })

  console.log('DEBUG - laterThisMonthData:\n\n', laterThisMonthData)

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

  const article = articleTemplate({
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
          picker.pickCreateRepoEvents(laterThisMonthData)
        )
      ),
      createSectionIfNeeded(
        'Make private repository public',
        formatter.formatPublicEvents(
          picker.pickPublicEvents(laterThisMonthData)
        )
      ),
      createSectionIfNeeded(
        'Pull requests',
        formatter.formatPullRequestEvents(
          picker.pickTargetPullRequestEvents(laterThisMonthData)
        )
      ),
      createSectionIfNeeded(
        'Releases',
        formatter.formatCreateTagEvents(
          picker.pickCreateTagEvents(laterThisMonthData)
        )
      ),
      createSectionIfNeeded(
        'Starred repositories',
        formatter.formatStarredEvents(
          picker.pickStarredEvents(laterThisMonthData)
        )
      ),
      createSectionIfNeeded(
        'Issues events',
        formatter.formatIssuesEvents(
          picker.pickTargetIssuesEvents(laterThisMonthData)
        )
      ),
    ].filter(row => !isNil(row)),
  })

  fs.writeFileSync(`articles/${target.format('YYYY-MM-DD')}_monthly-report-${target.format('YYMM')}.md`, article)
  console.log('Successfully write monthly report!')
})
.catch(error => {
  console.log('Error `getEvents()`:\n', error)
  throw error
})
