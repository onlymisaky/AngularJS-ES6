import './index.scss';
import template from './index.html';

/** @type {import('angular').IComponentOptions} */
export const index = {
  template,
  controller: class {
    constructor() {
      this.listState = 'list';
    }
  },
};
