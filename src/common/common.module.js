import angular from 'angular';

import components from './components';
import directives from './directives';
import services from './services';

const commonModule = angular.module('app.common', []);

components.forEach(component => commonModule.component(component));
directives.forEach(directive => commonModule.directive(directive));
services.forEach(service => commonModule.service(service));

export default commonModule.name;
