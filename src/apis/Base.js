export default class Base {
  static get(path) {
    return fetch(`${this.baseURI}/${this.path}/${path}${this.ref ? `?ref=${this.ref}` : ''}`);
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
