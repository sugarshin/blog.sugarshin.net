const { truncate } = require('lodash')
const removeMarkdown = require('remove-markdown')

const baseURL = 'https://github.com'
const toPlain = text => `${truncate(removeMarkdown(text).replace(/\n|\r/g, ' '), { length: 140 })}...`

const formatCreateRepoEvent = event => {
  return [
    `- [${event.repo.name}](${baseURL}/${event.repo.name})`,
    `  - description: ${event.payload.description}`,
    `  - created_at: ${event.created_at}`,
  ].join('\n')
}

const formatCreateTagEvent = event => {
  const tag = event.payload.ref
  const name = event.repo.name
  return [
    `- [Release ${tag} · ${name}](${baseURL}/${name}/releases/tag/${tag})`,
    `  - description: ${event.payload.description}`,
    `  - created_at: ${event.created_at}`,
  ].join('\n')
}

const formatIssuesEvent = ({ payload, created_at }) => {
  return [
    `- **${payload.action}** [${payload.issue.title}](${payload.issue.html_url})`,
    `  - > ${toPlain(payload.issue.body)}`,
    `  - created_at: ${created_at}`,
  ].join('\n')
}

const formatPullRequestEvent = ({
  payload: { action, pull_request: { title, number, html_url, created_at, merged_at } },
  repo,
}) => {
  return [
    `- ${action === 'closed' ? `**merged** ` : ''}[${title} · Pull Request #${number} · ${repo.name}](${html_url})`,
    `  - ${merged_at ? `merged_at: ${merged_at}` : `created_at: ${created_at}`}`,
  ].join('\n')
}

const formatStarredEvent = ({ repo: { name } }) => {
  return [
    `- [${name}](${baseURL}/${name})`,
  ].join('\n')
}

module.exports.formatCreateRepoEvents = events => events.map(e => formatCreateRepoEvent(e)).join('\n')
module.exports.formatCreateTagEvents = events => events.map(e => formatCreateTagEvent(e)).join('\n') // unused
module.exports.formatPublicEvents = events => events.map(e => formatCreateRepoEvent(e)).join('\n')
module.exports.formatIssuesEvents = events => events.map(e => formatIssuesEvent(e)).join('\n')
module.exports.formatPullRequestEvents = events => events.map(e => formatPullRequestEvent(e)).join('\n')
module.exports.formatStarredEvents = events => events.map(e => formatStarredEvent(e)).join('\n')
