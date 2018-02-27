import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import requires from './requires';

import config from './config';

export default angular
    .module('app.router', [uiRouter].concat(requires))
    .config(config)
    .name;
