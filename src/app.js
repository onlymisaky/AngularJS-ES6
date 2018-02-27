import angular from 'angular';

import router from './router/router.module';

angular.module('app', [router]);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
