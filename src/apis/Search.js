import Base from 'apis/Base'
import { authorGitHubUserName, repositoryName } from '../../config/settings'

export default class Search extends Base {
  static get path() {
    return 'search/code'
  }
  static execute(query) {
    return this.get(null, { q: this.q(query), per_page: 100 })
  }
  static q(query) {
    return `${query} in:file extension:md repo:${authorGitHubUserName}/${repositoryName} path:/articles/`
  }
}
