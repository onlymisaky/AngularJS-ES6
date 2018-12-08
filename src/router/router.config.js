import * as uiRouter from '@uirouter/angularjs';

import { routes } from './routes.js';

routerConfig.$inject = [
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider'];

/**
 * @param {angular.ILocationProvider} $locationProvider 
 * @param {uiRouter.UrlRouterProvider} $urlRouterProvider 
 * @param {uiRouter.StateProvider} $stateProvider
 */
export function routerConfig($locationProvider, $urlRouterProvider, $stateProvider) {

  $locationProvider
    .hashPrefix('')   // remove !
    .html5Mode({
      // history Api
      enabled: !process.env.NODE_ENV === 'production',
      requireBase: false
    });

  $urlRouterProvider.otherwise('/index');

  routes.forEach(route => $stateProvider.state(route));
}
