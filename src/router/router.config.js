import { routes } from './routes.js';

routerConfig.$inject = [
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider'];

/**
 * @param {import('angular').ILocationProvider} $locationProvider 
 * @param {import('@uirouter/angularjs').UrlRouterProvider} $urlRouterProvider 
 * @param {import('@uirouter/angularjs').StateProvider} $stateProvider
 */
export function routerConfig($locationProvider, $urlRouterProvider, $stateProvider) {

  $locationProvider
    .hashPrefix('')   // remove !
    .html5Mode({
      // history Api
      enabled: !(process.env.NODE_ENV === 'production'),
      requireBase: false
    });

  $urlRouterProvider.otherwise('/index');

  routes.forEach(route => $stateProvider.state(route));
}
