import angular from 'angular';

import components from './components';
import directives from './directives';
import services from './services';

export const commonModule = angular
  .module('app.common', [])
  .component(components)
  .directive(directives)
  .service(services)
  .name;
