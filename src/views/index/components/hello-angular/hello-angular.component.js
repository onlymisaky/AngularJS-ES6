import './hello-angular.scss';
import template from './hello-angular.html';

/** @type {angular.IComponentOptions} */
export const helloAngular = {
  template,
  controller: class {
    constructor() {
      this.value = 'AngularJS';
    }
  }
}
