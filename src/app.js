import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import router from './router/router.module';

angular.module('app', [uiRouter, router]);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
