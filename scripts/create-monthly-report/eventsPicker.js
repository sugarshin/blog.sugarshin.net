const { authorGitHubUserName, repositoryName } = require('../../config/settings')

const extractRepoNameFromEvent = event => event.repo.name
const extractOwnerNameFromEvent = event => extractRepoNameFromEvent(event).split('/')[0]

const filteringRepoNames = [
  `${authorGitHubUserName}/${repositoryName}`,
  `${authorGitHubUserName}/sugarshin-bolt`,
  `${authorGitHubUserName}/dotfiles`,
  `${authorGitHubUserName}/sugarshin.net`,
  `${authorGitHubUserName}/build.blog.sugarshin.net`,
]

const filterPrivateRepos = event => {
  return !filteringRepoNames.includes(extractRepoNameFromEvent(event))
}

/**
 * @param {Array} data
 * @param {string} type
 * @returns {Array}
 */
const pickEventsBy = (data, type) => {
  return data.reduce((ret, event) => event.type === type ? [...ret, event] : ret, [])
}
/**
 * @param {Array} data
 * @returns {Array}
 */
const pickCreateEvents = data => {
  return pickEventsBy(data, 'CreateEvent').filter(event => {
    return ['oneteam-dev'].includes(extractOwnerNameFromEvent(event)) === false
  })
}
const pickIssuesEvents = data => pickEventsBy(data, 'IssuesEvent')
const pickPullRequestEvents = data => pickEventsBy(data, 'PullRequestEvent')
const pickWatchEvents = data => pickEventsBy(data, 'WatchEvent')

module.exports.pickPublicEvents = data => pickEventsBy(data, 'PublicEvent')
module.exports.pickCreateRepoEvents = data => {
  return pickCreateEvents(data).reduce((ret, event) => {
    return 'repository' === event.payload.ref_type ? [...ret, event] : ret
  }, [])
}
module.exports.pickCreateTagEvents = data => {
  return pickCreateEvents(data).reduce((ret, event) => {
    return 'tag' === event.payload.ref_type ? [...ret, event] : ret
  }, [])
}
module.exports.pickTargetIssuesEvents = data => {
  return pickIssuesEvents(data)
    .filter(filterPrivateRepos)
    .reduce((ret, event) => {
      return ['opened', 'closed'].includes(event.payload.action) ? [...ret, event] : ret
    }, [])
}
module.exports.pickTargetPullRequestEvents = data => {
  return pickPullRequestEvents(data)
    // ignore repository of myself
    .filter(event => extractOwnerNameFromEvent(event) !== authorGitHubUserName)
    .reduce((ret, event) => {
      return event.payload.action === 'opened' || (
        event.payload.action === 'closed' && event.payload.pull_request.merged
      ) ? [...ret, event] : ret
    }, [])
    // exclude already merged create events
    .filter((event, i, list) => {
      return !(
        event.payload.action === 'opened' && list.some(e => (
          e.payload.number === event.payload.number && e.payload.pull_request.merged === true
        ))
      )
    })
}
module.exports.pickStarredEvents = data => {
  return pickWatchEvents(data).reduce((ret, event) => {
    return event.payload.action === 'started' ? [...ret, event] : ret
  }, [])
}
