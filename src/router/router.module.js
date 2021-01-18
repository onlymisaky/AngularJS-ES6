import angular from 'angular';
import * as uiRouter from '@uirouter/angularjs';
import oclazyload from 'oclazyload';
import { routerConfig } from './router.config';
import { routeChange } from './router.transitions';

export const routerModule = angular
  .module('app.router', [
    uiRouter.default,
    oclazyload,
  ])
  .config(routerConfig)
  .run(routeChange)
  .name;
