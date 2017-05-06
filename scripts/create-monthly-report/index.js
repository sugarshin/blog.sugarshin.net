const fs = require('fs')
const { padStart, isNil } = require('lodash')
const GitHub = require('github')
const moment = require('moment')
const picker = require('./eventsPicker')
const formatter = require('./eventsFormatter')
const articleTemplate = require('../helpers/articleTemplate')
const { protocol, domain } = require('../../config/settings')
const { author: username } = require('../../package.json')

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
  const now = moment().subtract(1, 'day')
  const month = `${now.month() + 1}`
  const paddedMonth = padStart(month, 2, '0')
  const thisMonth = `${now.year()}${paddedMonth}01`
  const thisMonthM = moment(thisMonth)
  const laterThisMonthData = flattedData.filter(d => moment(d.created_at).valueOf() > thisMonthM.valueOf())

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
    title: `"[Monthly report] ${now.format('YYYY-MM')} my activity this month on GitHub"`,
    date: now.format('YYYY-MM-DD HH:mm'),
    ogImageURL: `${protocol}//${domain}/assets/images/common/report/main.png`,
    body: [
      '今月の主な OSS コントリビューションや GitHub 上のアクティビティまとめ',
      '',
      '---',
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

  fs.writeFileSync(`articles/${now.format('YYYY-MM-DD')}_monthly-report.md`, article)
  console.log('Successfully write monthly report!')
})
.catch(errors => {
  throw new Error('Error `getEvents()`', JSON.stringify(errors))
})
