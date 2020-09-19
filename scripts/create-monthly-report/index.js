/* eslint-disable no-console */

const fs = require('fs')
const { flatten, padStart } = require('lodash')
const { Octokit } = require('@octokit/rest')
const pMap = require('p-map')
const moment = require('moment')
const template = require('./template')
const { authorGitHubUserName: username } = require('../../config/settings')
const argv = require('minimist')(process.argv.slice(2))

const per = parseInt(argv.p || argv.per || 16, 10)
const unit = argv.u || argv.unit || 'minutes'
const authorName = argv.n || argv['author-name']
const authorUrl = argv.U || argv['author-url']

if (typeof per !== 'number' || typeof unit !== 'string') {
  throw new TypeError('`per` must be `number`, `unit` must be `string`')
}

const octokit = new Octokit()

const getEvents = page => octokit.activity.listEventsForAuthenticatedUser({
  per_page: 100,
  username,
  page,
})

pMap([1, 2, 3], page => getEvents(page).then(res => res.data))
.then(results => {
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

  fs.writeFileSync(
    `articles/${target.format('YYYY-MM-DD')}_monthly-report-${target.format('YYMM')}.md`,
    template(laterThisMonthData, { target, authorName, authorUrl })
  )
  console.log('Successfully write monthly report!')
})
.catch(error => {
  console.error(error.message)
  process.exit(1)
})
