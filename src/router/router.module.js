import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import index from '@/views/index/index.module';
import list from '@/views/list/list.module';

import config from './config';

export default angular
    .module('app.router', [uiRouter].concat(RouterList))
    .config(config)
    .name;
