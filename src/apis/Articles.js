import Base from 'apis/Base'
import { author, name } from '../../package.json'

export default class Articles extends Base {
  static get path() {
    return `repos/${author}/${name}/contents/articles`
  }
  static getList() {
    return this.fetchJSON('/index.json')
  }
  static get(url) {
    return this.fetchRaw(
      this.requestURL(url),
    )
  }
}
