import angular from 'angular';
import components from './components';
import directives from './directives';
import services from './services';
import { commonConfig } from './common.config';

export const commonModule = angular
  .module('app.common', [])
  .component(components)
  .directive(directives)
  .service(services)
  .config(commonConfig)
  .name;
