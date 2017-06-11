import querystring from 'query-string'
import random from 'lodash/random'

export default class Base {
  static fetchJSON(url, option) {
    return fetch(url, option).then(res => res.json())
  }
  static fetchRaw(url, option = {}) {
    const opt = {
      ...option,
      headers: {
        ...option.headers,
        Accept: 'application/vnd.github.v3.raw',
      },
    }
    return fetch(url, opt).then(res => res.text())
  }
  static get(url, params) {
    return this.fetchJSON(
      this.requestURL(url, params),
    )
  }
  static requestURL(url, params) {
    return `${this.baseURI}/${this.path}${url ? `/${url}` : ''}?${this.querystring(params)}`
  }
  static querystring(params = {}) {
    return querystring.stringify({
      ref: this.ref,
      access_token: this.accessToken,
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
  static get accessToken() {
    const { GITHUB_ACCESS_TOKENS } = process.env
    if (!GITHUB_ACCESS_TOKENS) return
    const tokens = GITHUB_ACCESS_TOKENS.split(',')
    return tokens[random(0, tokens.length - 1)]
  }
}
