import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import HelloWrold from './../../components/hello-world/hello-world.module';

import router from './index.router';

import Index from './index.component';

export default angular
    .module('app.pages.index', [uiRouter, HelloWrold])
    .component('index', Index)
    .config(router)
    .name;
