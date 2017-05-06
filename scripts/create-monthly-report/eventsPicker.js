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
const pickCreateEvents = data => pickEventsBy(data, 'CreateEvent')
const pickIssuesEvents = data => pickEventsBy(data, 'IssuesEvent')
const pickPullRequestEvents = data => pickEventsBy(data, 'PullRequestEvent')
const pickWatchEvents = data => pickEventsBy(data, 'WatchEvent')
const pickCreateRepoOrTagEvents = data => {
  return pickCreateEvents(data).reduce((ret, event) => {
    return ['tag', 'repository'].includes(event.payload.ref_type) ? [...ret, event] : ret
  }, [])
}

module.exports.pickForkEvents = data => pickEventsBy(data, 'ForkEvent') // unused
module.exports.pickPublicEvents = data => pickEventsBy(data, 'PublicEvent')
module.exports.pickCreateRepoEvents = data => {
  return pickCreateRepoOrTagEvents(data).reduce((ret, event) => {
    return 'repository' === event.payload.ref_type ? [...ret, event] : ret
  }, [])
}
module.exports.pickTargetIssuesEvents = data => {
  return pickIssuesEvents(data).reduce((ret, event) => {
    return ['opened', 'closed'].includes(event.payload.action) ? [...ret, event] : ret
  }, [])
}
module.exports.pickTargetPullRequestEvents = data => {
  return pickPullRequestEvents(data)
    .reduce((ret, event) => {
      return event.payload.action === 'opened' || (
        event.payload.action === 'closed' && event.payload.pull_request.merged
      ) ? [...ret, event] : ret
    }, [])
    // exclude already merged create events
    .filter((event, i, list) => {
      return !(
        event.payload.action === 'opened' && list.some(e =>
          e.payload.number === event.payload.number && e.payload.pull_request.merged === true
        )
      )
    })
}
module.exports.pickStarredEvents = data => {
  return pickWatchEvents(data).reduce((ret, event) => {
    return event.payload.action === 'started' ? [...ret, event] : ret
  }, [])
}
