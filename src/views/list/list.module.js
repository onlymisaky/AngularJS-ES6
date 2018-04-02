import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';

import List from './list.component';
import router from './list.router';

export default angular
    .module('app.views.list', [uiRouter, oclazyload])
    .component('list', List)
    .config(router)
    .name;
