import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import router from './router';
import index from './pages/index/index.module';
import list from './pages/list/list.module';

angular
    .module('app', [uiRouter, index, list])
    .config(router);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
