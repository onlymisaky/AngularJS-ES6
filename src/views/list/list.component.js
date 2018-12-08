import './list.scss';
import template from './list.html';

import { ListService } from './list.service';

/** @type {angular.IComponentOptions} */
export const list = {
  template,
  controller: class {

    static $inject = ['$scope', '$injector', 'ListService'];

    /**
     * @param {angular.IScope} $scope 
     * @param {angular.auto.IInjectorService} $injector 
     * @param {ListService} ListService
     */
    constructor($scope, $injector, ListService) {
      this.$scope = $scope;
      this.ListService = ListService;
      this.newsList = [];
    }

    async $onInit() {
      this.ListService
        .getNewsList()
        .then(list => this.newsList = list);
    }

  }
}
