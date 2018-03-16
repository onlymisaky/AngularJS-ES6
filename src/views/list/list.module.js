import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import List from './list.component';
import router from './list.router';

export default angular
    .module('app.views.list', [uiRouter])
    .component('list', List)
    .config(router)
    .name;
