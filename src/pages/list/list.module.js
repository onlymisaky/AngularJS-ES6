import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import router from './list.router';

import List from './list.component';

export default angular
    .module('app.pages.list', [uiRouter])
    .component('list', List)
    .config(router)
    .name;
