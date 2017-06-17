/* eslint-disable no-console */

const fs = require('fs')
const { padStart, isNil } = require('lodash')
const GitHub = require('github')
const moment = require('moment')
const picker = require('./eventsPicker')
const formatter = require('./eventsFormatter')
const articleTemplate = require('../helpers/articleTemplate')
const { protocol, domain } = require('../../config/settings')
const { author: username } = require('../../package.json')
const argv = require('minimist')(process.argv.slice(2))

const per = parseInt(argv.p || argv.per || 16, 10)
const unit = argv.u || argv.unit || 'minutes'

if (typeof per !== 'number' || typeof unit !== 'string') {
  throw new TypeError('`per` must be `number`, `unit` must be `string`')
}

const github = new GitHub()

const getEvents = page => github.activity.getEventsForUser({
  per_page: 100,
  username,
  page,
})

let responses = []

Promise.resolve()
.then(() => getEvents(1))
.then(res => {
  responses.push(res)
  return getEvents(2)
})
.then(res => {
  responses.push(res)
  return getEvents(3)
})
.then(res => {
  responses.push(res)
  const flattedData = responses.reduce((ret, res) => [...ret, ...res.data], [])
  const target = moment().subtract(per, unit)
  const targetMonth = `${target.month() + 1}`
  const nextMonth = `${moment().month() + 1}`
  const targetPaddedMonth = padStart(targetMonth, 2, '0')
  const nextPaddedMonth = padStart(nextMonth, 2, '0')
  const targetDate = `${target.year()}${targetPaddedMonth}01`
  const nextDate = `${target.year()}${nextPaddedMonth}01`
  const targetM = moment.utc(targetDate)
  const nextM = moment.utc(nextDate)
  const laterThisMonthData = flattedData.filter(d => {
    const val = moment.utc(d.created_at).valueOf()
    return nextM.valueOf() > val && val > targetM.valueOf()
  })

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
          picker.pickCreateRepoEvents(laterThisMonthData),
        ),
      ),
      createSectionIfNeeded(
        'Make private repository public',
        formatter.formatPublicEvents(
          picker.pickPublicEvents(laterThisMonthData),
        ),
      ),
      createSectionIfNeeded(
        'Pull requests',
        formatter.formatPullRequestEvents(
          picker.pickTargetPullRequestEvents(laterThisMonthData),
        ),
      ),
      createSectionIfNeeded(
        'Releases',
        formatter.formatCreateTagEvents(
          picker.pickCreateTagEvents(laterThisMonthData),
        ),
      ),
      createSectionIfNeeded(
        'Starred repositories',
        formatter.formatStarredEvents(
          picker.pickStarredEvents(laterThisMonthData),
        ),
      ),
      createSectionIfNeeded(
        'Issues events',
        formatter.formatIssuesEvents(
          picker.pickTargetIssuesEvents(laterThisMonthData),
        ),
      ),
    ].filter(row => !isNil(row)),
  })

  fs.writeFileSync(`articles/${target.format('YYYY-MM-DD')}_monthly-report-${target.format('YYMM')}.md`, article)
  console.log('Successfully write monthly report!')
})
.catch(errors => {
  throw new Error('Error `getEvents()`', JSON.stringify(errors))
})
