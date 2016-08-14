import Base from './Base';

export default class Articles extends Base {
  static get path() {
    return 'contents/articles';
  }
  static getList() {
    return fetch('/index.json').then(res => res.json());
  }
  // HOTFIX:
  static get(path) {
    return fetch(`/${this.path}/${path}`).then(res => res.json());
  }
}
