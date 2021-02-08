import querystring from 'querystring'
import { HTTPError } from './HTTPError'

export default class Base {
  static baseOptions(option = {}) {
    return {
      ...option,
      headers: {
        ...option.headers,
      },
    }
  }
  static async fetchJSON(url, option = {}) {
    const opt = this.baseOptions(option)
    const res = await fetch(url, opt)
    if (res.ok) {
      return res.json()
    }
    throw new HTTPError(res)
  }
  static get(url, params) {
    return this.fetchJSON(
      this.requestURL(url, params)
    )
  }
  static requestURL(url, params) {
    return `${this.baseURI}/${this.path}${url ? `/${url}` : ''}?${this.querystring(params)}`
  }
  static querystring(params = {}) {
    return querystring.stringify({
      ref: this.ref,
      ...params,
    })
  }
  static set baseURI(uri) {
    this._baseURI = uri
  }
  static get baseURI() {
    return this._baseURI.replace(/\/$/, '')
  }
  static set ref(ref) {
    this._ref = ref
  }
  static get ref() {
    return this._ref
  }
  static get path() {
    throw new Error('path accessor is not yet implmented.')
  }
}
