import querystring from 'query-string'
import Base from 'apis/Base'
import { authorGitHubUserName, repositoryName } from '../../config/settings'

export default class Search extends Base {
  static get path() {
    return 'search/code'
  }
  static execute(query) {
    return this.get(null, { q: this.q(query) })
  }
  static q(query) {
    return `${
      encodeURIComponent(query)
    }+in:file+in:path+extension:md+repo:${authorGitHubUserName}/${repositoryName}+path:/articles/&per_page=100`
  }
  static querystring(params = {}) {
    return `${
      querystring.stringify({ ref: this.ref, access_token: this.accessToken })
    }&${
      querystring.stringify(params, { encode: false })
    }`
  }
}
