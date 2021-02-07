import Base from 'apis/Base'
import { HTTPError } from './HTTPError'
import { authorGitHubUserName, repositoryName } from '../../config/settings'

export default class Articles extends Base {
  static get baseURI() {
    return super.baseURI ? 'https://raw.githubusercontent.com' : ''
  }
  static get path() {
    return `${authorGitHubUserName}/${repositoryName}/${this.ref}/articles`
  }
  static getList() {
    return this.fetchJSON('/index.json')
  }
  static get(url, options = {}) {
    return fetch(`${this.baseURI}/${this.path}/${url}`, options).then(res => {
      if (res.ok) {
        return res.text()
      }
      throw new HTTPError(res)
    })
  }
}
