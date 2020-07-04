import querystring from 'query-string'

export default class Base {
  static baseOptions(option = {}) {
    return {
      ...option,
      headers: {
        ...option.headers,
        Authorization: `token ${this.accessToken}`,
      },
    }
  }
  static fetchJSON(url, option = {}) {
    const opt = this.baseOptions(option)
    return fetch(url, opt).then(res => res.json())
  }
  static fetchRaw(url, option = {}) {
    const opt = this.baseOptions({
      ...option,
      headers: {
        ...option.headers,
        Accept: 'application/vnd.github.v3.raw',
      },
    })
    return fetch(url, opt).then(res => res.text())
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
  static get accessToken() {
    const { GITHUB_TOKEN_NO_SCOPE } = process.env
    return GITHUB_TOKEN_NO_SCOPE || ''
  }
}
