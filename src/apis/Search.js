import querystring from 'query-string'
import Base from 'apis/Base'
import { author, name } from '../../package.json'

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
    }+in:file+in:path+extension:md+repo:${author}/${name}+path:/articles/&per_page=100`
  }
  static querystring(params = {}) {
    return `${
      querystring.stringify({ ref: this.ref, access_token: this.accessToken })
    }&${
      querystring.stringify(params, { encode: false })
    }`
  }
}
