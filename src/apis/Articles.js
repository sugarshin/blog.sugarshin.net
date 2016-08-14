import Base from 'apis/Base';
import { author, name } from '../../package.json';

export default class Articles extends Base {
  static get path() {
    return 'contents/articles';
  }
  static get(url) {
    return this.requestJSON(url);
  }
  static getList() {
    return this.get('/index.json');
  }
  // HOTFIX:
  static getArticle(path) {
    return this.get(`/${this.path}/${path}`);
  }
  static search(query) {
    return this.get(this._searchApiUrl(query));
  }
  static _searchApiUrl(query) {
    return `https://api.github.com/search/code?q=${
      encodeURIComponent(query)
    }+in:file+in:path+extension:md+repo:${author}/${name}+path:/articles/&per_page=100`;
  }
}
