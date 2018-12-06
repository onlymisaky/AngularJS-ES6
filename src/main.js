import angular from 'angular';

import '@/assets/styles/main.scss';

import router from './router/router.module';

angular.module('app', [router]);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
