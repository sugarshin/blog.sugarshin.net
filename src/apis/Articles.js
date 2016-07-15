import Base from './Base';

export default class Articles extends Base {
  static get path() {
    return 'contents/articles';
  }
  // HOTFIX:
  static get(path) {
    return fetch(`/${this.path}/${path}`);
  }
}
