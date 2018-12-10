import angular from 'angular';
import * as uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';

import { routerConfig } from './router.config.js';
import { routeChange } from './router.transitions.js';

export const routerModule = angular
  .module('app.router', [
    uiRouter.default,
    oclazyload
  ])
  .config(routerConfig)
  .run(routeChange)
  .name;


