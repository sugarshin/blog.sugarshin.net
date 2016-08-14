export default class Base {
  static requestJSON(url, option) {
    return fetch(url, option).then(res => res.json());
  }
  static get(url) {
    return this.requestJSON(`${this.baseURI}/${this.path}/${url}${this.ref ? `?ref=${this.ref}` : ''}`);
  }
  static set baseURI(uri) {
    this._baseURI = uri;
  }
  static get baseURI() {
    return this._baseURI;
  }
  static set ref(ref) {
    this._ref = ref;
  }
  static get ref() {
    return this._ref;
  }
  static get path() {
    throw new Error('path accessor is not yet implmented.');
  }
}
