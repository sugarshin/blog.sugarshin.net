import Base from 'apis/Base'
import { authorGitHubUserName, repositoryName } from '../../config/settings'

export default class Articles extends Base {
  static get path() {
    return `repos/${authorGitHubUserName}/${repositoryName}/contents/articles`
  }
  static getList() {
    // return this.fetchJSON('/index.json')
    return this.fetchJSON(`${process.env.ARTICLE_LIST_ENDPOINT.replace(/\/$/, '')}/index.json`)
  }
  static get(url) {
    return this.fetchRaw(
      this.requestURL(url)
    )
  }
}
