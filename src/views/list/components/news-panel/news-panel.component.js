import './news-panel.scss';
import template from './news-panel.html';

/** @type {import('angular').IComponentOptions} */
export const newsPanel = {
  template,
  bindings: {
    news: '<'
  },
  controller: class {
    constructor() {
      this.url = 'http://daily.zhihu.com/story/';
    }
  }
}; 
