import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';

import Index from './index.component';
import router from './index.router';

export default angular
    .module('app.views.index', [uiRouter, oclazyload])
    .component('index', Index)
    .config(router)
    .name;
