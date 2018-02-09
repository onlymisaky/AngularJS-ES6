import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import router from './router';
import index from './pages/index/index.module';

angular
    .module('app', [uiRouter, index])
    .config(router);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
